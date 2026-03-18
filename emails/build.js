#!/usr/bin/env node

/**
 * MJML Email Template Build Script
 *
 * Compiles bilingual master MJML templates into LTR, RTL, and Bilingual HTML variants.
 * Themes are auto-extracted from styles/globals.css — no static JSON files.
 *
 * Usage:
 *   node emails/build.js                         # Build all themes (default)
 *   node emails/build.js --theme cozy            # Build single theme
 *   node emails/build.js --theme-file brand.json # Build with custom theme
 */

const fs = require('fs')
const path = require('path')
const mjml = require('mjml')

// ─── Paths ────────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..')
const STYLES_PATH = path.join(ROOT, 'styles', 'globals.css')
const TEMPLATES_DIR = path.join(__dirname, 'templates')
const PARTIALS_DIR = path.join(__dirname, 'partials')
const OUTPUT_DIR = path.join(ROOT, 'public', 'emails', 'preview')

const VARIANTS = ['ltr', 'rtl', 'bilingual']

// ─── HSL → Hex Conversion ────────────────────────────────────────────────────

function hslToHex(h, s, l) {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

/**
 * Parse an HSL string into hex.
 * Handles: "25 85% 55%", "hsl(25 85% 55%)", "hsl(25, 85%, 55%)"
 */
function parseHslToHex(value) {
  const cleaned = value.replace(/hsl\(|\)/g, '').replace(/,/g, ' ').trim()
  const parts = cleaned.split(/\s+/)
  if (parts.length < 3) return null
  const h = parseFloat(parts[0])
  const s = parseFloat(parts[1])
  const l = parseFloat(parts[2])
  if (isNaN(h) || isNaN(s) || isNaN(l)) return null
  return hslToHex(h, s, l)
}

// ─── CSS Theme Parser ─────────────────────────────────────────────────────────

/**
 * Token name mapping from CSS variable names to template placeholder names.
 * Handles both :root format (--primary) and theme format (--color-primary).
 */
const TOKEN_MAP = {
  'primary': 'primary',
  'primary-foreground': 'primaryForeground',
  'background': 'background',
  'foreground': 'foreground',
  'card': 'card',
  'card-foreground': 'cardForeground',
  'secondary': 'secondary',
  'secondary-foreground': 'secondaryForeground',
  'muted': 'muted',
  'muted-foreground': 'mutedForeground',
  'border': 'border',
  'input': 'input',
  'ring': 'ring',
  'destructive': 'destructive',
  'destructive-foreground': 'destructiveForeground',
  'success': 'success',
  'success-foreground': 'successForeground',
  'warning': 'warning',
  'warning-foreground': 'warningForeground',
  'info': 'info',
  'info-foreground': 'infoForeground',
  'accent': 'accent',
  'accent-foreground': 'accentForeground',
  'popover': 'popover',
  'popover-foreground': 'popoverForeground',
}

/**
 * Extract CSS variable declarations from a CSS block string.
 * Returns a map of { tokenName: hexValue }.
 */
function parseCssBlock(blockContent, isRoot = false) {
  const tokens = {}

  // Match --color-X: hsl(...) or --X: H S% L%
  const varRegex = /--(color-)?([\w-]+):\s*([^;]+)/g
  let match
  while ((match = varRegex.exec(blockContent)) !== null) {
    const hasColorPrefix = !!match[1]
    const cssName = match[2]
    const value = match[3].trim()

    // Map CSS name to token name
    const tokenName = TOKEN_MAP[cssName]
    if (!tokenName) continue

    let hex
    if (hasColorPrefix) {
      // Theme format: --color-primary: hsl(25 85% 55%)
      hex = parseHslToHex(value)
    } else if (isRoot) {
      // Root format: --primary: 239 84% 67% (no hsl wrapper)
      hex = parseHslToHex(value)
    }

    if (hex) {
      tokens[tokenName] = hex
    }
  }

  // Extract radius
  const radiusMatch = blockContent.match(/--radius:\s*([^;]+)/)
  if (radiusMatch) {
    tokens.radius = radiusMatch[1].trim()
  }

  return tokens
}

/**
 * Parse styles/globals.css and extract all themes (light + dark).
 * Returns Map<themeName, Map<tokenName, hexValue>>.
 * Named themes include both "{theme}" (light) and "{theme}-dark" entries.
 */
function parseThemesFromCss(cssPath) {
  const css = fs.readFileSync(cssPath, 'utf8')
  const themes = new Map()

  // 1. Parse :root block as base tokens (not a standalone theme)
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\n\}/)
  const baseLight = rootMatch ? parseCssBlock(rootMatch[1], true) : {}

  // 2. Parse .dark block as base dark overrides
  const darkMatch = css.match(/\.dark\s*\{([\s\S]*?)\n\}/)
  const baseDark = darkMatch ? parseCssBlock(darkMatch[1], true) : {}

  // 3. Auto-discover .theme-X and .theme-X.dark blocks
  const lightThemes = new Map()  // themeName → overrides
  const darkThemes = new Map()   // themeName → dark overrides

  const themeRegex = /\.theme-([\w-]+)(\.dark)?\s*\{([\s\S]*?)\n\}/g
  let themeMatch
  while ((themeMatch = themeRegex.exec(css)) !== null) {
    const themeName = themeMatch[1]
    const isDark = !!themeMatch[2]
    const blockContent = themeMatch[3]

    const tokens = parseCssBlock(blockContent, false)
    if (isDark) {
      darkThemes.set(themeName, tokens)
    } else {
      lightThemes.set(themeName, tokens)
    }
  }

  // 4. Build final theme maps: light and dark for each named theme
  for (const [name, overrides] of lightThemes) {
    // Light: base + theme overrides
    themes.set(name, { ...baseLight, ...overrides })

    // Dark: base + base dark + theme light overrides + theme dark overrides
    // Theme overrides come LAST so they take precedence over base dark
    // (e.g., cozy's orange primary is preserved even though base dark has indigo)
    const darkOverrides = darkThemes.get(name) || {}
    themes.set(`${name}-dark`, { ...baseLight, ...baseDark, ...overrides, ...darkOverrides })
  }

  return themes
}

// ─── Template Processing ──────────────────────────────────────────────────────

/**
 * Parse the @brand comment from a template.
 * Format: <!-- @brand: English Name | Arabic Name -->
 */
function parseBrand(mjmlSource) {
  const match = mjmlSource.match(/<!--\s*@brand:\s*(.+?)\s*\|\s*(.+?)\s*-->/)
  if (!match) return { brandName: 'Your Company', brandNameAr: 'شركتك' }
  return { brandName: match[1].trim(), brandNameAr: match[2].trim() }
}

/**
 * Strip language blocks for a given variant.
 * LTR: remove @ar blocks, keep @en
 * RTL: remove @en blocks, keep @ar
 * Bilingual: keep both, add divider between them
 */
function extractVariant(mjmlSource, variant) {
  let result = mjmlSource

  if (variant === 'ltr') {
    // Remove Arabic blocks
    result = result.replace(/<!--\s*@ar\s*-->([\s\S]*?)<!--\s*\/@ar\s*-->/g, '')
    // Remove @en markers but keep content
    result = result.replace(/<!--\s*@en\s*-->/g, '')
    result = result.replace(/<!--\s*\/@en\s*-->/g, '')
  } else if (variant === 'rtl') {
    // Remove English blocks
    result = result.replace(/<!--\s*@en\s*-->([\s\S]*?)<!--\s*\/@en\s*-->/g, '')
    // Remove @ar markers but keep content
    result = result.replace(/<!--\s*@ar\s*-->/g, '')
    result = result.replace(/<!--\s*\/@ar\s*-->/g, '')
  } else {
    // Bilingual: keep both, remove markers
    result = result.replace(/<!--\s*@(ar|en)\s*-->/g, '')
    result = result.replace(/<!--\s*\/@(ar|en)\s*-->/g, '')
  }

  return result
}

/**
 * Replace mj-include paths for the given variant.
 * header.mjml → header-{variant}.mjml, footer.mjml → footer-{variant}.mjml
 */
function swapPartialPaths(mjmlSource, variant) {
  return mjmlSource
    .replace(/header\.mjml/g, `header-${variant}.mjml`)
    .replace(/footer\.mjml/g, `footer-${variant}.mjml`)
}

/**
 * Inline partials by replacing mj-include tags with file contents.
 */
function inlinePartials(mjmlSource) {
  return mjmlSource.replace(
    /<mj-include\s+path="([^"]+)"\s*\/>/g,
    (match, relativePath) => {
      // Resolve path relative to template location (but partials are always in emails/partials/)
      const partialName = path.basename(relativePath)
      const partialPath = path.join(PARTIALS_DIR, partialName)
      if (!fs.existsSync(partialPath)) {
        console.error(`  WARNING: Partial not found: ${partialPath}`)
        return `<!-- Missing partial: ${partialName} -->`
      }
      return fs.readFileSync(partialPath, 'utf8')
    }
  )
}

/**
 * Replace {{token}} placeholders with theme values.
 */
function applyTheme(mjmlSource, themeTokens, brand) {
  let result = mjmlSource

  // Replace theme tokens
  for (const [token, value] of Object.entries(themeTokens)) {
    result = result.replace(new RegExp(`\\{\\{${token}\\}\\}`, 'g'), value)
  }

  // Replace brand tokens
  result = result.replace(/\{\{brandName\}\}/g, brand.brandName)
  result = result.replace(/\{\{brandNameAr\}\}/g, brand.brandNameAr)

  return result
}

/**
 * Remove the @brand comment from the output.
 */
function removeBrandComment(mjmlSource) {
  return mjmlSource.replace(/<!--\s*@brand:.*?-->\s*/g, '')
}

// ─── Glob Templates ───────────────────────────────────────────────────────────

function findTemplates(dir) {
  const templates = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      templates.push(...findTemplates(fullPath))
    } else if (entry.name.endsWith('.mjml')) {
      templates.push(fullPath)
    }
  }
  return templates
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2)
  let singleTheme = null
  let customThemePath = null

  // Parse CLI args
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--theme' && args[i + 1]) {
      singleTheme = args[++i]
    } else if (args[i] === '--theme-file' && args[i + 1]) {
      customThemePath = args[++i]
    }
  }

  // Load themes
  let themes
  if (customThemePath) {
    const customTheme = JSON.parse(fs.readFileSync(path.resolve(customThemePath), 'utf8'))
    const themeName = customTheme.name || 'custom'
    themes = new Map([[themeName, customTheme]])
    console.log(`Using custom theme: ${themeName} from ${customThemePath}`)
  } else {
    console.log(`Parsing themes from: ${STYLES_PATH}`)
    themes = parseThemesFromCss(STYLES_PATH)
    console.log(`Found ${themes.size} themes: ${[...themes.keys()].join(', ')}`)

    if (singleTheme) {
      if (!themes.has(singleTheme)) {
        console.error(`Theme "${singleTheme}" not found. Available: ${[...themes.keys()].join(', ')}`)
        process.exit(1)
      }
      themes = new Map([[singleTheme, themes.get(singleTheme)]])
    }
  }

  // Find templates
  const templatePaths = findTemplates(TEMPLATES_DIR)
  if (templatePaths.length === 0) {
    console.log('No templates found in', TEMPLATES_DIR)
    return
  }
  console.log(`Found ${templatePaths.length} templates\n`)

  let successCount = 0
  let errorCount = 0

  for (const [themeName, themeTokens] of themes) {
    const themeOutputDir = path.join(OUTPUT_DIR, themeName)
    fs.mkdirSync(themeOutputDir, { recursive: true })

    console.log(`Theme: ${themeName}`)

    for (const templatePath of templatePaths) {
      const templateName = path.basename(templatePath, '.mjml')
      const rawSource = fs.readFileSync(templatePath, 'utf8')
      const brand = parseBrand(rawSource)

      for (const variant of VARIANTS) {
        try {
          let processed = rawSource

          // 1. Extract variant (strip unwanted language blocks)
          processed = extractVariant(processed, variant)

          // 2. Swap partial paths for variant
          processed = swapPartialPaths(processed, variant)

          // 3. Inline partials
          processed = inlinePartials(processed)

          // 4. Apply theme colors + brand
          processed = applyTheme(processed, themeTokens, brand)

          // 5. Clean up brand comment
          processed = removeBrandComment(processed)

          // 6. Compile MJML → HTML
          const { html, errors } = mjml(processed, {
            validationLevel: 'soft',
            minify: false,
          })

          if (errors.length > 0) {
            errors.forEach(err => console.error(`    WARN: ${err.formattedMessage || err.message}`))
          }

          // 7. Post-process: set dir/lang for RTL and bilingual variants
          let finalHtml = html
          if (variant === 'rtl') {
            finalHtml = finalHtml.replace(/dir="auto"/g, 'dir="rtl"')
            finalHtml = finalHtml.replace(/lang="und"/g, 'lang="ar"')
          } else if (variant === 'bilingual') {
            finalHtml = finalHtml.replace(/dir="auto"/g, 'dir="rtl"')
            finalHtml = finalHtml.replace(/lang="und"/g, 'lang="ar"')
          } else {
            finalHtml = finalHtml.replace(/dir="auto"/g, 'dir="ltr"')
            finalHtml = finalHtml.replace(/lang="und"/g, 'lang="en"')
          }

          // 8. Write output
          const outputFile = path.join(themeOutputDir, `${templateName}-${variant}.html`)
          fs.writeFileSync(outputFile, finalHtml, 'utf8')
          successCount++
          process.stdout.write(`  ✓ ${templateName}-${variant}\n`)
        } catch (err) {
          errorCount++
          console.error(`  ✗ ${templateName}-${variant}: ${err.message}`)
        }
      }
    }
    console.log()
  }

  console.log(`Done: ${successCount} compiled, ${errorCount} errors`)
  console.log(`Output: ${OUTPUT_DIR}`)
}

main()

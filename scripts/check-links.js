#!/usr/bin/env node

/**
 * Link Validation Script
 *
 * Checks all internal links in the codebase to ensure they point to existing pages.
 * Can be run as part of the build process to catch broken links early.
 *
 * Usage:
 *   node scripts/check-links.js
 *   npm run check:links
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

console.log(`${colors.cyan}${colors.bright}🔗 Checking all internal links...${colors.reset}\n`)

// Get project root
const projectRoot = path.resolve(__dirname, '..')

/**
 * Get all page.tsx files in the app directory
 * @returns {Set<string>} Set of valid page paths
 */
function getValidPages() {
  const validPages = new Set()

  try {
    // Find all page.tsx files
    const output = execSync(
      'find app -name "page.tsx" -o -name "layout.tsx"',
      { cwd: projectRoot, encoding: 'utf-8' }
    )

    const files = output.trim().split('\n').filter(Boolean)

    files.forEach(file => {
      // Convert file path to URL path
      // app/(docs)/components/button/page.tsx -> /components/button
      // app/page.tsx -> /
      // app/examples/dashboard/page.tsx -> /examples/dashboard

      let urlPath = file
        .replace(/^app/, '')
        .replace(/\/page\.tsx$/, '')
        .replace(/\/layout\.tsx$/, '')
        .replace(/\/\(docs\)/, '') // Remove route groups
        .replace(/\/\([^)]+\)/, '') // Remove any route groups

      if (urlPath === '') urlPath = '/'

      validPages.add(urlPath)

      // Also add the path without trailing slash
      if (urlPath !== '/' && urlPath.endsWith('/')) {
        validPages.add(urlPath.slice(0, -1))
      }
      if (urlPath !== '/' && !urlPath.endsWith('/')) {
        validPages.add(urlPath + '/')
      }
    })

    // Add special Next.js routes
    validPages.add('/404')
    validPages.add('/500')

  } catch (error) {
    console.error(`${colors.red}Error finding pages:${colors.reset}`, error.message)
    process.exit(1)
  }

  return validPages
}

/**
 * Extract all internal links from TSX/JSX files
 * @returns {Map<string, string[]>} Map of link -> files that contain it
 */
function extractLinks() {
  const links = new Map()

  try {
    // Find all TSX/JSX files
    const output = execSync(
      'find app components -type f \\( -name "*.tsx" -o -name "*.jsx" \\)',
      { cwd: projectRoot, encoding: 'utf-8' }
    )

    const files = output.trim().split('\n').filter(Boolean)

    files.forEach(file => {
      const filePath = path.join(projectRoot, file)
      const content = fs.readFileSync(filePath, 'utf-8')

      // Match href="/..." patterns
      // Matches: href="/path", href='/path', href={"/path"}
      const hrefMatches = content.matchAll(/href=["'{]?["']([^"'\s}]+)["'][\s}]?/g)

      for (const match of hrefMatches) {
        const link = match[1]

        // Only process internal links (starting with /)
        if (link.startsWith('/') && !link.startsWith('//')) {
          // Remove query params and hash
          const cleanLink = link.split('?')[0].split('#')[0]

          // Skip certain patterns
          if (cleanLink.includes('[') || cleanLink.includes(']')) {
            // Skip dynamic routes in the link text itself (these are templates)
            continue
          }

          if (!links.has(cleanLink)) {
            links.set(cleanLink, [])
          }
          links.get(cleanLink).push(file)
        }
      }

      // Also match <Link to="/..." patterns (for some routing libraries)
      const toMatches = content.matchAll(/to=["'{]?["']([^"'\s}]+)["'][\s}]?/g)

      for (const match of toMatches) {
        const link = match[1]

        if (link.startsWith('/') && !link.startsWith('//')) {
          const cleanLink = link.split('?')[0].split('#')[0]

          if (cleanLink.includes('[') || cleanLink.includes(']')) {
            continue
          }

          if (!links.has(cleanLink)) {
            links.set(cleanLink, [])
          }
          links.get(cleanLink).push(file)
        }
      }
    })

  } catch (error) {
    console.error(`${colors.red}Error extracting links:${colors.reset}`, error.message)
    process.exit(1)
  }

  return links
}

/**
 * Check if a link is valid
 * @param {string} link - The link to check
 * @param {Set<string>} validPages - Set of valid page paths
 * @returns {boolean}
 */
function isValidLink(link, validPages) {
  // Check exact match
  if (validPages.has(link)) return true

  // Check with/without trailing slash
  if (validPages.has(link + '/')) return true
  if (link.endsWith('/') && validPages.has(link.slice(0, -1))) return true

  // Check if it's a dynamic route by checking if parent path exists
  // e.g., /examples/marketplace/123 -> check if /examples/marketplace/[id] exists
  const segments = link.split('/').filter(Boolean)

  for (let i = segments.length; i > 0; i--) {
    const parentPath = '/' + segments.slice(0, i).join('/')

    // Check for dynamic route patterns
    const withDynamicId = '/' + segments.slice(0, i - 1).join('/') + '/[id]'
    const withDynamicSlug = '/' + segments.slice(0, i - 1).join('/') + '/[slug]'
    const withDynamicAny = '/' + segments.slice(0, i - 1).join('/') + '/[...slug]'

    if (validPages.has(withDynamicId) ||
        validPages.has(withDynamicSlug) ||
        validPages.has(withDynamicAny)) {
      return true
    }
  }

  return false
}

// Main execution
const validPages = getValidPages()
const links = extractLinks()

console.log(`${colors.blue}📄 Found ${validPages.size} valid pages${colors.reset}`)
console.log(`${colors.blue}🔗 Found ${links.size} unique internal links${colors.reset}\n`)

// Check each link
const brokenLinks = new Map()
const validLinksCount = links.size

for (const [link, files] of links) {
  if (!isValidLink(link, validPages)) {
    brokenLinks.set(link, files)
  }
}

// Report results
if (brokenLinks.size === 0) {
  console.log(`${colors.green}${colors.bright}✅ All links are valid!${colors.reset}\n`)
  console.log(`${colors.cyan}📊 Summary:${colors.reset}`)
  console.log(`   Total links: ${validLinksCount}`)
  console.log(`   ${colors.green}Valid: ${validLinksCount} (100%)${colors.reset}`)
  console.log(`   ${colors.red}Broken: 0 (0%)${colors.reset}\n`)
  process.exit(0)
} else {
  console.log(`${colors.red}${colors.bright}❌ Found ${brokenLinks.size} broken link(s):${colors.reset}\n`)

  const sortedBrokenLinks = Array.from(brokenLinks.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  )

  sortedBrokenLinks.forEach(([link, files]) => {
    console.log(`${colors.red}${colors.bright}  ✗ ${link}${colors.reset}`)

    // Show first 5 files that contain this broken link
    const displayFiles = files.slice(0, 5)
    displayFiles.forEach(file => {
      console.log(`${colors.yellow}    → ${file}${colors.reset}`)
    })

    if (files.length > 5) {
      console.log(`${colors.yellow}    ... and ${files.length - 5} more file(s)${colors.reset}`)
    }
    console.log()
  })

  console.log(`${colors.cyan}📊 Summary:${colors.reset}`)
  console.log(`   Total links: ${validLinksCount}`)
  console.log(`   ${colors.green}Valid: ${validLinksCount - brokenLinks.size} (${Math.round((validLinksCount - brokenLinks.size) / validLinksCount * 100)}%)${colors.reset}`)
  console.log(`   ${colors.red}Broken: ${brokenLinks.size} (${Math.round(brokenLinks.size / validLinksCount * 100)}%)${colors.reset}\n`)

  console.log(`${colors.cyan}💡 Tip:${colors.reset} Fix these broken links or remove them from the codebase.\n`)

  process.exit(1)
}

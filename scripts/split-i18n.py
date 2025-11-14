#!/usr/bin/env python3
import re
import os

# Read the original file
with open('lib/i18n.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract header
header = '''/**
 * Internationalization content
 * Real, meaningful Arabic content for the GCC market
 */

export type Locale = 'en' | 'ar'
'''

# Function to extract a top-level section
def extract_section(content, key, locale='en'):
    """Extract a top-level section like 'nav', 'home', etc."""
    # Pattern to match: key: { ... }
    # Need to handle nested braces
    pattern = rf'\s*{key}: \{{'
    match = re.search(pattern, content)
    if not match:
        return None

    start = match.start()
    # Find matching closing brace
    brace_count = 0
    i = match.end() - 1  # Start from the opening brace
    while i < len(content):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                # Include the comma if present
                end = i + 1
                if i + 1 < len(content) and content[i + 1] == ',':
                    end = i + 2
                return content[start:end].strip()
        i += 1
    return None

# Split into en and ar sections
en_match = re.search(r'en: \{', content)
ar_match = re.search(r'ar: \{', content)

en_start = en_match.end() - 1
ar_start = ar_match.start()

en_section = content[en_start:ar_start]
ar_section = content[ar_start:]

# Find the end of ar section
brace_count = 0
ar_end = 0
for i, char in enumerate(ar_section):
    if char == '{':
        brace_count += 1
    elif char == '}':
        brace_count -= 1
        if brace_count == 0:
            ar_end = i + 1
            break

ar_section = ar_section[:ar_end]

print(f"EN section: {len(en_section)} chars")
print(f"AR section: {len(ar_section)} chars")

# Define section groups
sections = {
    'common': ['nav', 'ui', 'docs', 'common'],
    'home': ['home'],
    'themes': ['themes', 'themesPage'],
    'documentation': ['documentationPages'],
    'gcc': ['gcc', 'gccDashboard'],
    'examples': ['examples'],
}

# Component sections (these are component docs)
component_keys = [
    'components', 'componentDocs', 'buttonComponent', 'gettingStarted',
    'cardComponent', 'inputComponent', 'selectComponent', 'tableComponent',
    'formComponent', 'separatorComponent', 'labelComponent', 'avatarComponent',
    'alertComponent', 'breadcrumbComponent', 'tabsComponent', 'paginationComponent',
    'accordionComponent', 'collapsibleComponent', 'dialogComponent', 'popoverComponent',
    'dropdownMenuComponent', 'contextMenuComponent', 'sheetComponent', 'badgeComponent',
    'checkboxComponent', 'switchComponent', 'sliderComponent', 'textareaComponent',
    'calendarComponent', 'datePickerComponent', 'timePickerComponent', 'fileUploadComponent',
    'numberInputComponent', 'richTextEditorComponent', 'toastComponent', 'tooltipComponent',
    'progressComponent', 'skeletonComponent', 'radioGroupComponent'
]

# Create output directory
os.makedirs('lib/i18n/components', exist_ok=True)

# Helper to create file content
def create_file_content(keys_to_include, en_sect, ar_sect):
    """Create a TypeScript file with extracted sections"""
    en_parts = []
    ar_parts = []

    for key in keys_to_include:
        en_part = extract_section(en_sect, key)
        ar_part = extract_section(ar_sect, key)

        if en_part:
            en_parts.append(en_part)
        if ar_part:
            ar_parts.append(ar_part)

    if not en_parts:
        return None

    file_content = header + '\n\nexport const translations = {\n  en: {\n'
    file_content += ',\n\n'.join(f'    {part}' for part in en_parts)
    file_content += '\n  },\n\n  ar: {\n'
    file_content += ',\n\n'.join(f'    {part}' for part in ar_parts)
    file_content += '\n  },\n}\n'

    return file_content

# Create section files
for section_name, keys in sections.items():
    print(f"\nProcessing {section_name}...")
    file_content = create_file_content(keys, en_section, ar_section)

    if file_content:
        filepath = f'lib/i18n/{section_name}.ts'
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(file_content)
        print(f"  ✓ Created {filepath}")

# Create components file
print("\nProcessing components...")
file_content = create_file_content(component_keys, en_section, ar_section)

if file_content:
    filepath = 'lib/i18n/components/index.ts'
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(file_content)
    print(f"  ✓ Created {filepath}")

print("\n✅ Split complete!")
print("\nNext steps:")
print("1. Create lib/i18n/index.ts with dynamic loader")
print("2. Update imports in app files")
print("3. Test the new system")

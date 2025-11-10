# Visual Testing Scripts

This directory contains scripts for automated visual testing of the Noor UI components.

## Screenshot Script

The `screenshot.js` script captures screenshots of component showcase pages in both LTR (Left-to-Right) and RTL (Right-to-Left) modes.

### Prerequisites

Before running the screenshot script, ensure you have:

1. **Installed dependencies**:
   ```bash
   npm install
   ```

2. **Installed Playwright browsers** (first time only):
   ```bash
   npx playwright install chromium --with-deps
   ```

3. **Started the dev server** (in a separate terminal):
   ```bash
   npm run dev
   ```

### Usage

#### Screenshot All Components

To capture screenshots of all components:

```bash
npm run screenshot
```

This will:
- Screenshot all components listed in `scripts/screenshot.js`
- Capture both LTR and RTL versions
- Save to `public/screenshots/components/[component-name]/`

#### Screenshot Specific Component

To capture screenshots of a single component:

```bash
npm run screenshot:component button
npm run screenshot:component select
npm run screenshot:component slider
```

### Output

Screenshots are saved to:
```
public/screenshots/components/
├── button/
│   ├── button-ltr.png
│   └── button-rtl.png
├── select/
│   ├── select-ltr.png
│   └── select-rtl.png
└── ...
```

These screenshots:
- ✅ Are stored in version control
- ✅ Can be used in documentation
- ✅ Serve as visual regression tests
- ✅ Demonstrate RTL/LTR behavior for your portfolio

### Configuration

You can modify the following settings in `scripts/screenshot.js`:

- **Viewport size**: Default is 1280x800 (desktop)
- **Base URL**: Default is http://localhost:3000
- **Components list**: Add new components to the `ALL_COMPONENTS` array

### Workflow

When building new components:

1. Build the component and documentation page
2. Start the dev server: `npm run dev`
3. Run screenshots: `npm run screenshot:component [name]`
4. Review the generated images in `public/screenshots/components/[name]/`
5. If issues found, fix and re-run
6. Commit the screenshots along with your component code

### Troubleshooting

**Error: "Page crashed"**
- Make sure Playwright browsers are installed: `npx playwright install chromium --with-deps`
- On Linux, you may need additional system dependencies

**Error: "Failed to connect"**
- Ensure the dev server is running on port 3000
- Check that the component page exists at `/components/[name]`

**Screenshots are blank**
- The page might need more time to render
- Try increasing the wait timeout in the script

### Available Components

Current components that can be screenshot:
- button
- card
- input
- label
- badge
- separator
- checkbox
- radio-group
- textarea
- select
- switch
- slider

Add new components to the `ALL_COMPONENTS` array in `screenshot.js`.

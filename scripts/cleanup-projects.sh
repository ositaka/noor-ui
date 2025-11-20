#!/bin/bash

# Cleanup Script: Remove projects folder from main repository
# This script removes the /projects/ folder and updates .gitignore

set -e  # Exit on error

echo "🧹 Cleaning up main noor-ui repository..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the right directory?"
    exit 1
fi

# Check if projects folder exists
if [ ! -d "projects" ]; then
    echo "ℹ️  projects/ folder doesn't exist. Nothing to clean up."
    exit 0
fi

echo "📂 Current projects folder contents:"
ls -la projects/
echo ""

# Confirm with user
read -p "⚠️  This will REMOVE the projects/ folder. Have you backed it up? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "❌ Cleanup cancelled. Please backup your projects folder first."
    echo ""
    echo "💡 Follow MIGRATION_GUIDE.md to move the luxury platform to a new repo."
    exit 1
fi

echo ""
echo "🗑️  Removing projects folder from git..."
git rm -r projects/

echo "📝 Updating .gitignore..."
if ! grep -q "^projects/" .gitignore 2>/dev/null; then
    echo "projects/" >> .gitignore
    git add .gitignore
    echo "✅ Added projects/ to .gitignore"
else
    echo "ℹ️  projects/ already in .gitignore"
fi

echo ""
echo "💾 Creating commit..."
git commit -m "chore: remove projects folder - moved to separate repository

The luxury reseller platform has been moved to its own repository
and now uses the published noorui-rtl package.

See: https://github.com/ositaka/noorui-luxury-platform
"

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📌 Next steps:"
echo "  1. Push to GitHub: git push origin main"
echo "  2. Follow MIGRATION_GUIDE.md to setup the luxury platform in a new repo"
echo "  3. Install noorui-rtl in the new project: npm install noorui-rtl"
echo ""
echo "🎉 Your main repo is now clean and focused on the component library!"

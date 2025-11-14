# Gmail Filters for Noor UI Management

**Quick setup guide for organizing Noor UI emails**

---

## 🎯 Basic Filter: All Noor UI Emails

This creates a "Noor UI" label for everything related to the project.

### Steps:

1. Go to Gmail → Click the search box
2. Click the "Show search options" icon (three lines)
3. In "To" field, enter: `ositaka+noorui@gmail.com`
4. Click "Create filter"
5. Check these boxes:
   - ✅ Skip the Inbox (Archive it) - *Optional, if you want it out of main inbox*
   - ✅ Apply the label: Create new label "Noor UI"
   - ✅ Also apply filter to matching conversations
6. Click "Create filter"

**Result:** All emails to any `ositaka+noorui*@gmail.com` address get labeled "Noor UI"

---

## 🎨 Advanced Filters: Per-Platform Labels

Create sub-labels for each platform for even better organization.

### Filter 1: Twitter/X
- **To:** `ositaka+noorui-twitter@gmail.com`
- **Label:** `Noor UI/Twitter`
- **Also:** Star important notifications

### Filter 2: npm
- **To:** `ositaka+noorui-npm@gmail.com`
- **Label:** `Noor UI/npm`
- **Note:** Package publish notifications, security alerts

### Filter 3: Discord
- **To:** `ositaka+noorui-discord@gmail.com`
- **Label:** `Noor UI/Discord`
- **Optional:** Skip inbox if too many notifications

### Filter 4: YouTube
- **To:** `ositaka+noorui-youtube@gmail.com`
- **Label:** `Noor UI/YouTube`
- **Note:** Comment notifications, subscriber updates

### Filter 5: GitHub
- **To:** `ositaka+noorui-github@gmail.com`
- **Label:** `Noor UI/GitHub`
- **Note:** Issues, PRs, security alerts

---

## 📋 Label Structure

Create this label hierarchy in Gmail:

```
📁 Noor UI (parent label)
   ├── 🐦 Twitter
   ├── 📦 npm
   ├── 💬 Discord
   ├── 📹 YouTube
   ├── 🔧 GitHub
   ├── ⚠️ Important (manual)
   └── 📢 Announcements (manual)
```

---

## 🔍 Useful Gmail Searches

Save these as bookmarks or in a note:

### All Noor UI emails
```
to:ositaka+noorui@gmail.com
```

### Unread Noor UI emails
```
to:ositaka+noorui@gmail.com is:unread
```

### Important Noor UI emails
```
to:ositaka+noorui@gmail.com is:starred
```

### Twitter notifications
```
to:ositaka+noorui-twitter@gmail.com
```

### This week's Noor UI activity
```
to:ositaka+noorui@gmail.com newer_than:7d
```

---

## ⚡ Quick Actions

### Mark Platform Emails as Read
Good for noisy platforms like Discord:
1. Search: `to:ositaka+noorui-discord@gmail.com is:unread`
2. Select all
3. Mark as read

### Auto-archive Discord/Twitter
If too many notifications:
1. Create filter: `to:ositaka+noorui-discord@gmail.com`
2. Check: "Skip the Inbox (Archive it)"
3. Still searchable via label, but won't clutter inbox

---

## 🔐 Security Tip

**Keep your base Gmail secure:**
- ✅ Enable 2FA on your main Gmail
- ✅ Use strong unique password
- ✅ Review connected apps regularly
- ✅ Enable login alerts
- ✅ Save backup codes securely

If your Gmail is compromised, ALL Noor UI accounts are at risk!

---

## 🎯 Migration Plan (When Ready)

When you're ready to move to branded email (info@noorui.com):

### Phase 1: Set up branded email
1. Choose email provider (Google Workspace, Fastmail, etc.)
2. Set up `info@noorui.com`
3. Forward to `ositaka+noorui@gmail.com` initially

### Phase 2: Update platforms (one by one)
Most platforms allow email changes in settings:
- Twitter → Settings → Account → Email
- npm → Settings → Email
- Discord → User Settings → Email
- YouTube → Google Account → Personal Info
- GitHub → Settings → Emails

### Phase 3: Keep Gmail as recovery
Even after migration, keep Gmail as backup recovery email!

---

## 📊 Email Variants Cheat Sheet

**For Registration (Keep Private):**
```
ositaka+noorui@gmail.com           # Main signup email
ositaka+noorui-twitter@gmail.com   # Twitter/X
ositaka+noorui-npm@gmail.com       # npm
ositaka+noorui-discord@gmail.com   # Discord
ositaka+noorui-youtube@gmail.com   # YouTube
ositaka+noorui-github@gmail.com    # GitHub
ositaka+noorui-linkedin@gmail.com  # LinkedIn
ositaka+noorui-devto@gmail.com     # Dev.to
ositaka+noorui-figma@gmail.com     # Figma
ositaka+noorui-codepen@gmail.com   # CodePen
```

**For Public Contact (Show on Website):**
```
info@ositaka.com                   # Your personal (for now)
# Later migrate to:
hello@noorui.com                   # General inquiries
support@noorui.com                 # User support
security@noorui.com                # Security issues
```

---

## 🚨 Platforms That Don't Accept "+" in Emails

**Very rare**, but some platforms block + in emails. If this happens:

### Workaround 1: Use dots (Gmail ignores them)
```
o.sitaka@gmail.com       = ositaka@gmail.com
os.itaka@gmail.com       = ositaka@gmail.com
osit.aka@gmail.com       = ositaka@gmail.com
```

### Workaround 2: Use your personal domain
```
noorui@ositaka.com
```

### Workaround 3: Just use base Gmail
```
ositaka@gmail.com
```
Then filter by "From" address instead.

---

## ✅ Quick Start (Do This Now)

**5-minute setup:**

1. Create main filter:
   - To: `ositaka+noorui@gmail.com`
   - Label: `Noor UI`
   - ✅ Create filter

2. Start using variants:
   - Twitter signup: `ositaka+noorui-twitter@gmail.com`
   - npm signup: `ositaka+noorui-npm@gmail.com`
   - etc.

3. Check your Noor UI label occasionally:
   - Click "Noor UI" label in Gmail sidebar
   - All project emails in one place!

**Done!** You now have organized Noor UI email management with zero overhead. 🎉

---

## 💡 Pro Tip

**Create a Google Sheet** to track where you used which email variant:

| Platform | Email Used | Password Manager Entry | Date Registered | 2FA Enabled |
|----------|-----------|------------------------|-----------------|-------------|
| Twitter  | ositaka+noorui-twitter@gmail.com | Yes | 2025-01-14 | ✅ |
| npm      | ositaka+noorui-npm@gmail.com | Yes | 2025-01-14 | ✅ |
| Discord  | ositaka+noorui-discord@gmail.com | Yes | 2025-01-14 | ✅ |

This helps you keep track and makes migration easier later!

---

**You're all set!** Now go register those accounts with confidence. 🚀

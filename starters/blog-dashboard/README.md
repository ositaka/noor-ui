# Blog Dashboard - Complete Bilingual Blogging Platform

A production-ready, full-featured blog dashboard built with Next.js 14, Supabase, and Noor UI components. Features complete bilingual support (English/Arabic) with RTL layout, authentication, and real-time database operations.

## Features

### Authentication
- Email-based user authentication via Supabase Auth
- Protected dashboard routes
- Automatic profile creation on signup
- User menu with profile and logout options

### Blog Post Management
- **Create** posts with rich text editor
- **Read** posts with search and filtering
- **Update** existing posts
- **Delete** posts with confirmation
- Draft and publish workflow
- Featured image uploads to Supabase Storage

### Bilingual Content
- Full English and Arabic support
- RTL layout for Arabic content
- Separate content fields for each language
- Language-aware date formatting
- Automatic text direction handling

### Component Showcase
This dashboard demonstrates all Noor UI components in action:
- ✅ **DashboardShell** - Layout with sidebar and header
- ✅ **RichTextEditor** - Blog content creation
- ✅ **FileUpload** - Featured image uploads
- ✅ **UserMenu** - User profile dropdown
- ✅ **NotificationCenter** - Updates and alerts
- ✅ **Forms** - Input, Label, Select components
- ✅ **Cards** - Content containers
- ✅ **Buttons** - Various button styles
- ✅ **Toast** - Success/error notifications

## Getting Started

You can use this starter in two ways:

### Option 1: Copy as Standalone Project (Recommended)

Copy the entire starter folder to create your own project:

```bash
# Copy the starter to your projects directory
cp -r starters/blog-dashboard ~/my-projects/my-blog

# Navigate to your new project
cd ~/my-projects/my-blog

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local
```

### Option 2: Run from Monorepo (For Testing/Development)

If you're working within the Noor UI repository:

```bash
# From the root of the Noor UI repo
npm install

# Navigate to the starter
cd starters/blog-dashboard

# Copy environment template
cp .env.local.example .env.local
```

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great)
- Git for version control

### Next Steps: Set Up Supabase

1. **Create a Supabase Project**
   - Go to [https://supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in project details and wait ~2 minutes

2. **Run Database Schema**
   - In Supabase dashboard, go to **SQL Editor**
   - Copy contents of `lib/supabase/schema.sql`
   - Paste and click **Run**
   - This creates tables, policies, and triggers

3. **Get API Credentials**
   - Go to **Settings** → **API**
   - Copy your **Project URL**
   - Copy your **anon/public key**

4. **Update Environment Variables**
   - Edit `.env.local`
   - Add your Supabase URL and key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

5. **Create Storage Bucket** (for images)
   - Go to **Storage** in Supabase
   - Click "New bucket"
   - Name it `post-images`
   - Make it **Public**
   - Click "Create bucket"

### Finally: Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000`

## Usage Guide

### Creating Your First Post

1. **Sign Up**
   - Visit `/auth/signup`
   - Enter your name, email, and password
   - Check email for confirmation (if enabled)

2. **Access Dashboard**
   - You'll be redirected to `/dashboard`
   - See statistics and recent posts

3. **Create a New Post**
   - Click "New Post" button
   - Fill in English content:
     - Title
     - Excerpt (optional)
     - Rich text content
   - Switch to Arabic tab
   - Fill in Arabic content
   - Upload a featured image (optional)
   - Choose status (Draft or Published)
   - Click "Publish" or "Save as Draft"

4. **Manage Posts**
   - View all posts at `/dashboard/posts`
   - Search and filter by status
   - Click a post to edit
   - Delete unwanted posts

### Post Content Tips

**English Content:**
- Write naturally left-to-right
- Use the rich text editor toolbar for formatting
- Bold, italic, headings, lists, etc.

**Arabic Content:**
- Text automatically flows right-to-left
- Rich text editor supports Arabic seamlessly
- Maintains proper text direction

## Architecture

### File Structure

This starter lives in `/starters/blog-dashboard/` and uses shared components from `/components/`:

```
starters/blog-dashboard/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx       # Login page
│   │   ├── signup/page.tsx      # Signup page
│   │   └── layout.tsx           # Auth layout
│   ├── dashboard/
│   │   ├── posts/
│   │   │   ├── [id]/page.tsx    # Edit post
│   │   │   ├── new/page.tsx     # Create post
│   │   │   └── page.tsx         # Posts list
│   │   ├── layout.tsx           # Dashboard layout
│   │   └── page.tsx             # Dashboard home
│   ├── layout.tsx               # Root layout with AuthProvider
│   └── page.tsx                 # Redirects to dashboard
├── hooks/
│   └── use-auth.ts              # Auth context and hooks
├── lib/
│   └── supabase/
│       ├── client.ts            # Supabase client
│       ├── database.types.ts    # TypeScript types
│       ├── schema.sql           # Database schema
│       └── README.md            # Setup guide
├── .env.local.example           # Environment template
└── README.md                    # This file

# Shared components from main library
/components/ui/
├── dashboard-shell.tsx          # Layout component
├── rich-text-editor.tsx         # Content editor
├── file-upload.tsx              # Image uploads
├── user-menu.tsx                # User dropdown
├── notification-center.tsx      # Notifications
└── ...                          # Other UI components
```

### Database Schema

**Tables:**
- `profiles` - User profiles (extends auth.users)
- `posts` - Blog posts with bilingual fields

**Security:**
- Row Level Security (RLS) enabled
- Users can only modify their own posts
- Published posts are publicly viewable
- Draft posts are private to author

### Authentication Flow

1. User signs up via `/auth/signup`
2. Supabase creates user in `auth.users`
3. Trigger creates profile in `public.profiles`
4. User redirected to dashboard
5. Protected routes check auth state
6. Logout clears session

## Component Integration

### DashboardShell

```tsx
<DashboardShell
  navItems={[...]}
  user={user}
  notifications={notifications}
  onLogout={signOut}
>
  {children}
</DashboardShell>
```

### RichTextEditor

```tsx
<RichTextEditor
  value={content}
  onChange={setContent}
/>
```

### FileUpload

```tsx
<FileUpload
  accept="image/*"
  maxFiles={1}
  onUpload={handleImageUpload}
/>
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Other Platforms

Works with any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## Troubleshooting

### "Missing Supabase environment variables"
- Ensure `.env.local` exists
- Check variable names match exactly
- Restart dev server after changes

### "Policy violation" error
- Make sure you're signed in
- Check RLS policies in Supabase
- Verify user owns the post being modified

### Images not uploading
- Create `post-images` bucket in Supabase Storage
- Make bucket public
- Check file size limits

### Authentication redirect loop
- Clear browser cookies
- Check Supabase Auth configuration
- Verify redirect URLs in Supabase

## Customization

### Adding More Fields

Edit `lib/supabase/database.types.ts` and add fields to Post type:

```typescript
export interface Post {
  // ... existing fields
  tags?: string[]
  category?: string
}
```

Run migration in Supabase SQL Editor:

```sql
ALTER TABLE posts ADD COLUMN tags text[];
ALTER TABLE posts ADD COLUMN category text;
```

### Changing Theme Colors

Edit `tailwind.config.ts` to customize colors:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        // ...
      }
    }
  }
}
```

### Adding New Pages

Create new page in `app/dashboard/`:

```tsx
// app/dashboard/analytics/page.tsx
export default function AnalyticsPage() {
  return <div>Analytics content</div>
}
```

Add to navigation in `app/dashboard/layout.tsx`.

## Security Best Practices

✅ **DO:**
- Keep `.env.local` private
- Use Row Level Security policies
- Validate data on server-side
- Sanitize user inputs
- Enable email confirmation (production)

❌ **DON'T:**
- Commit `.env.local` to Git
- Use service role key client-side
- Trust client-side validation alone
- Store sensitive data in posts
- Disable RLS policies

## Performance Tips

1. **Images**: Optimize before uploading (use WebP format)
2. **Database**: Add indexes for frequently queried fields
3. **Caching**: Enable Next.js caching for static content
4. **Storage**: Use Supabase CDN for image delivery
5. **Queries**: Select only needed fields

## Future Enhancements

Potential features to add:

- [ ] Categories and tags
- [ ] Comments system
- [ ] Post scheduling
- [ ] Media library
- [ ] Analytics dashboard
- [ ] Multi-author support
- [ ] Email notifications
- [ ] Post revisions
- [ ] SEO metadata
- [ ] Social sharing

## Support

For issues or questions:

1. Check `lib/supabase/README.md` for Supabase setup
2. Review component documentation at `/components`
3. Check browser console for errors
4. Review Supabase logs

## License

This project is part of Noor UI component library.

---

**Built with:**
- Next.js 14
- Supabase
- Noor UI Components
- TipTap Editor
- Tailwind CSS

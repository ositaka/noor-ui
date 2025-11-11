# Supabase Setup

This directory contains the Supabase configuration and database schema for the Noor UI Blog Dashboard.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new account or sign in
3. Click "New Project"
4. Fill in the project details:
   - **Name**: Noor UI Blog
   - **Database Password**: (choose a strong password)
   - **Region**: (choose closest to your location)
5. Wait for the project to be created (takes ~2 minutes)

### 2. Set Up the Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Create a new query
3. Copy the entire contents of `schema.sql` and paste it
4. Click **Run** to execute the schema

This will create:
- `profiles` table (user profiles)
- `posts` table (blog posts with bilingual content)
- Row Level Security (RLS) policies
- Automatic triggers for timestamps
- Indexes for better performance

### 3. Configure Environment Variables

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

3. Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Enable Email Authentication (Optional)

By default, Supabase has email authentication enabled. You can customize it:

1. Go to **Authentication** → **Providers**
2. Configure **Email** settings:
   - Enable email confirmation (recommended for production)
   - Customize email templates
   - Set redirect URLs

For development, you can disable email confirmation:
- Go to **Authentication** → **Settings**
- Disable "Enable email confirmations"

### 5. Test the Connection

Start your development server:

```bash
npm run dev
```

Try to sign up at: `http://localhost:3000/auth/signup`

## Database Schema

### Tables

#### `profiles`
- Extends Supabase auth.users
- Stores user profile information
- Automatically created when a user signs up

#### `posts`
- Bilingual blog posts (English + Arabic)
- Supports draft, published, and archived status
- Includes featured images
- Linked to author via `author_id`

### Row Level Security (RLS)

The schema includes secure RLS policies:

- **Profiles**: Everyone can view, users can update their own
- **Posts**:
  - Everyone can view published posts
  - Authors can view their own drafts
  - Authors can create, update, and delete their own posts

## File Structure

```
lib/supabase/
├── client.ts          # Supabase client instance
├── database.types.ts  # TypeScript types for database
├── schema.sql         # Database schema
└── README.md          # This file
```

## Usage in Components

```tsx
import { supabase } from '@/lib/supabase/client'

// Fetch posts
const { data: posts, error } = await supabase
  .from('posts')
  .select('*')
  .eq('status', 'published')
  .order('published_at', { ascending: false })

// Create post
const { data, error } = await supabase
  .from('posts')
  .insert({
    title: 'My Post',
    title_ar: 'مقالتي',
    content: '<p>Content...</p>',
    content_ar: '<p>المحتوى...</p>',
    excerpt: 'Short description',
    excerpt_ar: 'وصف قصير',
    slug: 'my-post',
    author_id: user.id,
  })
```

## Security Notes

- ⚠️ Never commit `.env.local` to version control
- ⚠️ The anon key is safe to use in the browser (RLS protects your data)
- ⚠️ Service role key should only be used server-side
- ✅ All database operations are protected by RLS policies
- ✅ User authentication is handled securely by Supabase

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists in the project root
- Restart your dev server after adding environment variables

### "Policy violation" errors
- Check that you're signed in
- Verify the RLS policies are set up correctly
- Ensure you're operating on your own data

### TypeScript errors
- Run `npm run type-check` to see detailed errors
- Make sure `database.types.ts` matches your schema
- Regenerate types if you modify the schema

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

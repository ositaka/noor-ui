-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create posts table
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  title_ar text not null,
  content text not null,
  content_ar text not null,
  excerpt text not null,
  excerpt_ar text not null,
  slug text unique not null,
  featured_image text,
  author_id uuid references public.profiles(id) on delete cascade not null,
  status text check (status in ('draft', 'published', 'archived')) default 'draft',
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better query performance
create index posts_author_id_idx on public.posts(author_id);
create index posts_status_idx on public.posts(status);
create index posts_published_at_idx on public.posts(published_at);
create index posts_slug_idx on public.posts(slug);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.posts enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Posts policies
create policy "Published posts are viewable by everyone"
  on public.posts for select
  using (status = 'published' or author_id = auth.uid());

create policy "Users can create own posts"
  on public.posts for insert
  with check (auth.uid() = author_id);

create policy "Users can update own posts"
  on public.posts for update
  using (auth.uid() = author_id);

create policy "Users can delete own posts"
  on public.posts for delete
  using (auth.uid() = author_id);

-- Function to automatically update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers to update updated_at
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger handle_posts_updated_at
  before update on public.posts
  for each row
  execute function public.handle_updated_at();

-- Function to handle new user signup (creates profile automatically)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

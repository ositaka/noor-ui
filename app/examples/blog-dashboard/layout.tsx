import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Dashboard Starter - Noor UI',
  description: 'Full-featured bilingual blog platform with Supabase authentication, rich text editing, and complete CRUD operations',
}

export default function BlogDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

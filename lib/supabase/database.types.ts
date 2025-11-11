export type Json =
  | string
  | number
  | boolean
  | null
  | { [key]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          title_ar: string
          content: string
          content_ar: string
          excerpt: string
          excerpt_ar: string
          slug: string
          featured_image: string | null
          author_id: string
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          title_ar: string
          content: string
          content_ar: string
          excerpt: string
          excerpt_ar: string
          slug: string
          featured_image?: string | null
          author_id: string
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          title_ar?: string
          content?: string
          content_ar?: string
          excerpt?: string
          excerpt_ar?: string
          slug?: string
          featured_image?: string | null
          author_id?: string
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            episodes: {
                Row: {
                    id: string
                    company_name: string
                    sector: string | null
                    location: string | null
                    website: string | null
                    title: string | null
                    description: string | null
                    story_excerpt: string | null
                    thumbnail_url: string | null
                    hero_image_url: string | null
                    video_riccardo_url: string | null
                    video_theitalians_url: string | null
                    instagram_post_url: string | null
                    tiktok_post_url: string | null
                    episode_number: number | null
                    filming_date: string | null
                    publish_date: string | null
                    status: 'draft' | 'scheduled' | 'published'
                    featured: boolean
                    views_count: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    company_name: string
                    sector?: string | null
                    location?: string | null
                    website?: string | null
                    title?: string | null
                    description?: string | null
                    story_excerpt?: string | null
                    thumbnail_url?: string | null
                    hero_image_url?: string | null
                    video_riccardo_url?: string | null
                    video_theitalians_url?: string | null
                    instagram_post_url?: string | null
                    tiktok_post_url?: string | null
                    episode_number?: number | null
                    filming_date?: string | null
                    publish_date?: string | null
                    status?: 'draft' | 'scheduled' | 'published'
                    featured?: boolean
                    views_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    company_name?: string
                    sector?: string | null
                    location?: string | null
                    website?: string | null
                    title?: string | null
                    description?: string | null
                    story_excerpt?: string | null
                    thumbnail_url?: string | null
                    hero_image_url?: string | null
                    video_riccardo_url?: string | null
                    video_theitalians_url?: string | null
                    instagram_post_url?: string | null
                    tiktok_post_url?: string | null
                    episode_number?: number | null
                    filming_date?: string | null
                    publish_date?: string | null
                    status?: 'draft' | 'scheduled' | 'published'
                    featured?: boolean
                    views_count?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            applications: {
                Row: {
                    id: string
                    company_name: string
                    sector: string | null
                    location: string | null
                    website: string | null
                    contact_name: string | null
                    contact_email: string
                    contact_phone: string | null
                    story: string | null
                    why_unique: string | null
                    employee_count: string | null
                    year_founded: number | null
                    status: string
                    notes: string | null
                    submitted_at: string
                    reviewed_at: string | null
                    contacted_at: string | null
                    updated_at: string
                }
                Insert: {
                    id?: string
                    company_name: string
                    sector?: string | null
                    location?: string | null
                    website?: string | null
                    contact_name?: string | null
                    contact_email: string
                    contact_phone?: string | null
                    story?: string | null
                    why_unique?: string | null
                    employee_count?: string | null
                    year_founded?: number | null
                    status?: string
                    notes?: string | null
                    submitted_at?: string
                    reviewed_at?: string | null
                    contacted_at?: string | null
                    updated_at?: string
                }
            }
            team_members: {
                Row: {
                    id: string
                    name: string
                    role: string | null
                    bio: string | null
                    avatar_url: string | null
                    instagram: string | null
                    tiktok: string | null
                    website: string | null
                    display_order: number
                    is_active: boolean
                    created_at: string
                }
            }
        }
    }
}

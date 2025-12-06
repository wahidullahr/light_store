/**
 * TypeScript types for Supabase database schema
 * These types match the database schema defined in supabase/schema.sql
 */

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          product_id: string;
          name_nb: string;
          name_en: string;
          wood_type_nb: string | null;
          wood_type_en: string | null;
          color_temp_k: number | null;
          size: string | null;
          price_min: number | null;
          price_max: number | null;
          description_nb: string | null;
          description_en: string | null;
          detail_description_nb: string | null;
          detail_description_en: string | null;
          category_nb: string | null;
          category_en: string | null;
          features_nb: string[] | null;
          features_en: string[] | null;
          images: ImageData[];
          detail_images: ImageData[];
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at'>>;
      };
      site_content: {
        Row: {
          id: string;
          content_key: string;
          locale: 'nb' | 'en';
          content_type: 'text' | 'json' | 'html';
          content_value: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['site_content']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['site_content']['Row'], 'id' | 'created_at'>>;
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          role: 'admin' | 'editor';
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['admin_users']['Row'], 'id' | 'created_at'>>;
      };
    };
  };
}

export interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export type Product = Database['public']['Tables']['products']['Row'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];

export type SiteContent = Database['public']['Tables']['site_content']['Row'];
export type SiteContentInsert = Database['public']['Tables']['site_content']['Insert'];
export type SiteContentUpdate = Database['public']['Tables']['site_content']['Update'];

export type AdminUser = Database['public']['Tables']['admin_users']['Row'];


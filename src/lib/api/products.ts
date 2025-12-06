/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - Supabase type inference issues with custom Database types
import { supabaseAdmin } from '@/lib/supabase/server';
import { IProduct } from '@/lib/types';

export async function getProducts(locale: string): Promise<IProduct[]> {
  try {
    const supabase = supabaseAdmin;

    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return products.map(p => {
      // Format price
      const priceVal = p.price;
      let priceString = '';

      if (priceVal) {
        priceString =
          locale === 'nb'
            ? `${priceVal.toLocaleString('nb-NO')} kr`
            : `${priceVal.toLocaleString('en-US')} NOK`;
      } else {
        priceString = locale === 'nb' ? 'Kontakt for pris' : 'Contact for price';
      }

      // Get images safely
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const images = (p.images as any[]) || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const detailImages = (p.detail_images as any[]) || [];

      // Fallback image if none
      const mainImage = images.length > 0 ? images[0].src : '/placeholder.jpg';

      return {
        id: p.product_id || p.id,
        name: locale === 'nb' ? p.name_nb : p.name_en,
        wood: (locale === 'nb' ? p.wood_type_nb : p.wood_type_en) || '',
        priceRange: priceString, // kept for compatibility
        price: priceString,
        image: mainImage,
        images: images.map(
          (img: { src: string; alt: string; width?: number; height?: number }) => ({
            src: img.src,
            alt: img.alt || (locale === 'nb' ? p.name_nb : p.name_en),
            width: img.width || 800,
            height: img.height || 600,
          })
        ),
        description: (locale === 'nb' ? p.description_nb : p.description_en) || '',
        features: (locale === 'nb' ? p.features_nb : p.features_en) || [],
        detailImages: detailImages.map((img: { src: string }) => img.src),
        category: (locale === 'nb' ? p.category_nb : p.category_en) || '',
      };
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function getFeaturedProducts(locale: string, limit = 3): Promise<IProduct[]> {
  const products = await getProducts(locale);
  return products.slice(0, limit);
}

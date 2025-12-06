
-- Migration to remove unused columns: color_temp_k, size, detail_description

-- Remove the columns
ALTER TABLE public.products DROP COLUMN IF EXISTS color_temp_k;
ALTER TABLE public.products DROP COLUMN IF EXISTS size;
ALTER TABLE public.products DROP COLUMN IF EXISTS detail_description_nb;
ALTER TABLE public.products DROP COLUMN IF EXISTS detail_description_en;


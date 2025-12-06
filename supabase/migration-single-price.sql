
-- Migration to change price_min/price_max to a single price column

-- Add the new column
ALTER TABLE public.products ADD COLUMN price NUMERIC;

-- Migrate existing data (taking price_min as the single price, or price_max if min is null)
UPDATE public.products 
SET price = COALESCE(price_min, price_max);

-- Remove the old columns
ALTER TABLE public.products DROP COLUMN price_min;
ALTER TABLE public.products DROP COLUMN price_max;


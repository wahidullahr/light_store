import { getProducts } from '@/lib/api/products';
import ProductsContent from '@/components/products/products-content';

interface IProductsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProductsPage({ params }: IProductsPageProps) {
  const { locale } = await params;
  const allProducts = await getProducts(locale);

  return <ProductsContent locale={locale} allProducts={allProducts} />;
}

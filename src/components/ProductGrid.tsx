import { Product } from '@/types';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}

const ProductGrid = ({ products, isLoading, onLoadMore, hasMore }: ProductGridProps) => {
  return (
    <div className="flex-1">
      {products.length === 0 && !isLoading ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Tidak ada produk ditemukan</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMore && !isLoading && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={onLoadMore}
                variant="outline"
                size="lg"
                className="min-w-[200px]"
              >
                Muat Lebih Banyak
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center mt-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;

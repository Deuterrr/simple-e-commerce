import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToCart = () => {
    toast.success(`${product.title} ditambahkan ke keranjang`);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
      <div className="relative overflow-hidden aspect-square bg-muted">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
        />
        {product.discountPercentage > 0 && (
          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
            -{product.discountPercentage.toFixed(0)}%
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 space-y-2">
        <Badge variant="secondary" className="text-xs">
          {product.category}
        </Badge>
        
        <h3 className="font-semibold text-lg line-clamp-2 min-h-[3.5rem]">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-warning text-warning" />
          <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground ml-1">
            ({product.stock} stok)
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Tambah ke Keranjang
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

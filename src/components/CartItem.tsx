import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  thumbnail: string;
}

interface CartItemProps {
  product: CartProduct;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ product, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-24 h-24 object-cover rounded-lg"
          />
          
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{product.title}</h3>
                {product.discountPercentage > 0 && (
                  <Badge variant="secondary" className="mt-1">
                    Diskon {product.discountPercentage.toFixed(0)}%
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(product.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onUpdateQuantity(product.id, Math.max(1, product.quantity - 1))}
                  className="h-8 w-8"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-medium">{product.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
                  className="h-8 w-8"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-primary">
                  ${product.total.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  ${product.price.toFixed(2)} each
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

const Cart = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/carts/user/${user?.id}`);
      const data = await response.json();
      if (data.carts && data.carts.length > 0) {
        setCart(data.carts[0]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Gagal memuat keranjang');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (!cart) return;

    const updatedProducts = cart.products.map((p) =>
      p.id === productId ? { ...p, quantity: newQuantity } : p
    );

    setCart({ ...cart, products: updatedProducts });
    toast.success('Kuantitas diperbarui');
  };

  const removeItem = (productId: number) => {
    if (!cart) return;

    const updatedProducts = cart.products.filter((p) => p.id !== productId);
    setCart({ ...cart, products: updatedProducts });
    toast.success('Produk dihapus dari keranjang');
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>
        
        {!cart || cart.products.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <ShoppingCart className="w-16 h-16 text-muted-foreground" />
              </div>
              <p className="text-xl text-muted-foreground">
                Keranjang Anda kosong
              </p>
              <Button onClick={() => window.location.href = '/products'}>
                Mulai Belanja
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cart.products.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Ringkasan Belanja</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Produk</span>
                    <span className="font-semibold">{cart.totalProducts}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Item</span>
                    <span className="font-semibold">{cart.totalQuantity}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cart.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-success mb-2">
                      <span>Diskon</span>
                      <span>-${(cart.total - cart.discountedTotal).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold mt-4">
                      <span>Total</span>
                      <span className="text-primary">${cart.discountedTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="w-full h-12 text-base font-semibold">
                    Lanjut ke Pembayaran
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

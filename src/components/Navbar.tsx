import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ShoppingCart, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/products" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary rounded-lg group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MiniShop</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/products">
              <Button
                variant={location.pathname === '/products' ? 'default' : 'ghost'}
                className="font-medium"
              >
                Produk
              </Button>
            </Link>
            
            <Link to="/cart" className="relative">
              <Button
                variant={location.pathname === '/cart' ? 'default' : 'ghost'}
                size="icon"
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>
            </Link>

            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium hidden md:inline">
                  {user?.firstName}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

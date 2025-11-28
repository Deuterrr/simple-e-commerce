import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import FilterSidebar from '@/components/FilterSidebar';
import SearchBar from '@/components/SearchBar';
import { Product } from '@/types';
import { Loader2 } from 'lucide-react';

const Products = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 5000,
    categories: [] as string[],
    minRating: 0,
  });
  const [skip, setSkip] = useState(0);
  const limit = 12;

  useEffect(() => {
    fetchProducts();
  }, [skip, searchQuery]);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const url = searchQuery
        ? `https://dummyjson.com/products/search?q=${searchQuery}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (searchQuery || skip === 0) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.minPrice > 0 || filters.maxPrice < 5000) {
      filtered = filtered.filter(
        (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
      );
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= filters.minRating);
    }

    setFilteredProducts(filtered);
  };

  const handleLoadMore = () => {
    setSkip((prev) => prev + limit);
  };

  if (authLoading) {
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
      <div className="container mx-auto px-4 py-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <FilterSidebar filters={filters} setFilters={setFilters} />
          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading}
            onLoadMore={handleLoadMore}
            hasMore={!searchQuery && skip + limit < 100}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;

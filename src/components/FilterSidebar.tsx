import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Filters } from '@/types';
import { Star } from 'lucide-react';

interface FilterSidebarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const FilterSidebar = ({ filters, setFilters }: FilterSidebarProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const data = await response.json();
      // API returns objects with {slug, name, url}, extract slug
      const categoryNames = data.map((cat: any) => cat.slug || cat.name || cat).slice(0, 10);
      setCategories(categoryNames);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    setFilters({ ...filters, categories: newCategories });
  };

  const ratings = [4, 3, 2, 1];

  return (
    <aside className="w-full lg:w-64 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-semibold">Harga</Label>
            <div className="space-y-4">
              <Slider
                min={0}
                max={5000}
                step={50}
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={([min, max]) =>
                  setFilters({ ...filters, minPrice: min, maxPrice: max })
                }
              />
              <div className="flex items-center justify-between text-sm">
                <Badge variant="secondary">${filters.minPrice}</Badge>
                <span className="text-muted-foreground">-</span>
                <Badge variant="secondary">${filters.maxPrice}</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Kategori</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <label
                    htmlFor={category}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer capitalize"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Rating Minimum</Label>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div
                  key={rating}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setFilters({ ...filters, minRating: rating })}
                >
                  <Checkbox
                    checked={filters.minRating === rating}
                    onCheckedChange={() => setFilters({ ...filters, minRating: rating })}
                  />
                  <div className="flex items-center gap-1">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                    <span className="text-sm ml-1">& up</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default FilterSidebar;

import { useState } from "react";
import { ArrowUpDown, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import CarCard from "./CarCard";

// Sample data - in a real app this would come from an API
const sampleCars = [
  {
    id: "1",
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 135000,
    mileage: 15000,
    fuel: "Flex",
    transmission: "Automático",
    location: "São Paulo, SP",
    images: ["https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800"],
    fipePrice: 142000,
    promoted: true
  },
  {
    id: "2",
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    price: 128000,
    mileage: 28000,
    fuel: "Flex",
    transmission: "Automático",
    location: "Rio de Janeiro, RJ",
    images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800"],
    fipePrice: 125000
  },
  {
    id: "3",
    brand: "Volkswagen",
    model: "Jetta",
    year: 2021,
    price: 115000,
    mileage: 35000,
    fuel: "Flex",
    transmission: "Automático",
    location: "Belo Horizonte, MG",
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800"],
    fipePrice: 118000
  },
  {
    id: "4",
    brand: "Hyundai",
    model: "Elantra",
    year: 2023,
    price: 142000,
    mileage: 8000,
    fuel: "Flex",
    transmission: "Automático",
    location: "Curitiba, PR",
    images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800"],
    fipePrice: 145000
  },
  {
    id: "5",
    brand: "Nissan",
    model: "Sentra",
    year: 2022,
    price: 98000,
    mileage: 42000,
    fuel: "Flex",
    transmission: "Manual",
    location: "Porto Alegre, RS",
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800"],
    fipePrice: 95000
  },
  {
    id: "6",
    brand: "Ford",
    model: "Focus",
    year: 2020,
    price: 85000,
    mileage: 55000,
    fuel: "Flex",
    transmission: "Automático",
    location: "Brasília, DF",
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800"],
    fipePrice: 82000,
    promoted: true
  }
];

const CarCatalog = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('price-asc');

  const getSortedCars = () => {
    const cars = [...sampleCars];
    switch (sortBy) {
      case 'price-asc':
        return cars.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return cars.sort((a, b) => b.price - a.price);
      case 'year-desc':
        return cars.sort((a, b) => b.year - a.year);
      case 'mileage-asc':
        return cars.sort((a, b) => a.mileage - b.mileage);
      default:
        return cars;
    }
  };

  const sortedCars = getSortedCars();

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Veículos Disponíveis
            </h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {sortedCars.length} resultados
              </Badge>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                Página 1 de 1
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Menor preço</SelectItem>
                  <SelectItem value="price-desc">Maior preço</SelectItem>
                  <SelectItem value="year-desc">Mais novo</SelectItem>
                  <SelectItem value="mileage-asc">Menor km</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="border-0 rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="border-0 rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {sortedCars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="px-8"
          >
            Carregar Mais Veículos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CarCatalog;
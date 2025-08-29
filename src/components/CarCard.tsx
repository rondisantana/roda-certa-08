import { Heart, MapPin, Calendar, Fuel, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface CarCardProps {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  location: string;
  images: string[];
  fipePrice?: number;
  promoted?: boolean;
}

const CarCard = ({ 
  brand, 
  model, 
  year, 
  price, 
  mileage, 
  fuel, 
  transmission, 
  location, 
  images, 
  fipePrice,
  promoted = false 
}: CarCardProps) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatMileage = (km: number) => {
    return new Intl.NumberFormat('pt-BR').format(km) + ' km';
  };

  const getFipeComparison = () => {
    if (!fipePrice) return null;
    const diff = ((price - fipePrice) / fipePrice) * 100;
    if (diff < -5) return { type: 'below', text: 'Abaixo FIPE', color: 'success' };
    if (diff > 5) return { type: 'above', text: 'Acima FIPE', color: 'warning' };
    return { type: 'equal', text: 'Preço FIPE', color: 'primary' };
  };

  const fipeComparison = getFipeComparison();

  return (
    <Card className="group overflow-hidden hover:shadow-hover transition-all duration-300 bg-gradient-card border-0">
      <div className="relative">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={images[0]} 
            alt={`${brand} ${model} ${year}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {promoted && (
            <Badge className="bg-warning text-warning-foreground">
              Destaque
            </Badge>
          )}
          {fipeComparison && (
            <Badge 
              variant={fipeComparison.color === 'success' ? 'default' : 'secondary'}
              className={`${
                fipeComparison.color === 'success' 
                  ? 'bg-success text-success-foreground' 
                  : fipeComparison.color === 'warning'
                  ? 'bg-warning text-warning-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {fipeComparison.text}
            </Badge>
          )}
        </div>

        {/* Favorite */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white group-hover:scale-110 transition-all"
        >
          <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500" />
        </Button>
      </div>

      <CardContent className="p-6">
        {/* Title */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {brand} {model}
          </h3>
          <p className="text-muted-foreground">{year} • {transmission}</p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-foreground mb-1">
            {formatPrice(price)}
          </div>
          {fipePrice && (
            <div className="text-sm text-muted-foreground">
              FIPE: {formatPrice(fipePrice)}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Gauge className="h-4 w-4 mr-2" />
            {formatMileage(mileage)}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Fuel className="h-4 w-4 mr-2" />
            {fuel}
          </div>
          <div className="flex items-center text-muted-foreground col-span-2">
            <MapPin className="h-4 w-4 mr-2" />
            {location}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Ver Detalhes
          </Button>
          <Button className="flex-1 bg-gradient-primary hover:bg-primary-hover">
            Entrar em Contato
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
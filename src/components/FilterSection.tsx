import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const FilterSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    yearFrom: '',
    yearTo: '',
    priceFrom: '',
    priceTo: '',
    fuel: '',
    transmission: '',
    mileageMax: ''
  });

  const brands = [
    'Audi', 'BMW', 'Chevrolet', 'Fiat', 'Ford', 'Honda', 'Hyundai', 
    'Nissan', 'Peugeot', 'Renault', 'Toyota', 'Volkswagen', 'Volvo'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const clearFilters = () => {
    setFilters({
      brand: '',
      model: '',
      yearFrom: '',
      yearTo: '',
      priceFrom: '',
      priceTo: '',
      fuel: '',
      transmission: '',
      mileageMax: ''
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Marca e Modelo */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Marca e Modelo</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Marca</Label>
            <Select value={filters.brand} onValueChange={(value) => setFilters({...filters, brand: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Todas as marcas" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand.toLowerCase()}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Modelo</Label>
            <Input 
              placeholder="Digite o modelo"
              value={filters.model}
              onChange={(e) => setFilters({...filters, model: e.target.value})}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Ano */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Ano</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>De</Label>
            <Select value={filters.yearFrom} onValueChange={(value) => setFilters({...filters, yearFrom: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Ano mín." />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Até</Label>
            <Select value={filters.yearTo} onValueChange={(value) => setFilters({...filters, yearTo: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Ano máx." />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Preço */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Preço</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Preço mínimo</Label>
            <Input 
              placeholder="R$ 0"
              value={filters.priceFrom}
              onChange={(e) => setFilters({...filters, priceFrom: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Preço máximo</Label>
            <Input 
              placeholder="R$ 500.000"
              value={filters.priceTo}
              onChange={(e) => setFilters({...filters, priceTo: e.target.value})}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Combustível e Câmbio */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Características</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Combustível</Label>
            <Select value={filters.fuel} onValueChange={(value) => setFilters({...filters, fuel: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gasoline">Gasolina</SelectItem>
                <SelectItem value="ethanol">Etanol</SelectItem>
                <SelectItem value="flex">Flex</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="electric">Elétrico</SelectItem>
                <SelectItem value="hybrid">Híbrido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Transmissão</Label>
            <Select value={filters.transmission} onValueChange={(value) => setFilters({...filters, transmission: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="automatic">Automático</SelectItem>
                <SelectItem value="cvt">CVT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Quilometragem */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Quilometragem</h3>
        <div className="space-y-2">
          <Label>Quilometragem máxima</Label>
          <Select value={filters.mileageMax} onValueChange={(value) => setFilters({...filters, mileageMax: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Qualquer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10000">Até 10.000 km</SelectItem>
              <SelectItem value="20000">Até 20.000 km</SelectItem>
              <SelectItem value="50000">Até 50.000 km</SelectItem>
              <SelectItem value="100000">Até 100.000 km</SelectItem>
              <SelectItem value="150000">Até 150.000 km</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button 
          variant="outline" 
          onClick={clearFilters}
          className="flex-1"
        >
          <X className="h-4 w-4 mr-2" />
          Limpar
        </Button>
        <Button 
          onClick={() => setIsOpen(false)}
          className="flex-1 bg-gradient-primary hover:bg-primary-hover"
        >
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros de Busca</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="bg-card rounded-lg border p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filtros</h2>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Limpar
            </Button>
          </div>
          <FilterContent />
        </div>
      </div>
    </>
  );
};

export default FilterSection;
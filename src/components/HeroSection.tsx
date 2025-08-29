import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/hero-cars.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Encontre o 
            <span className="block bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Carro Perfeito
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Milhares de veículos verificados, preços justos e experiência completa de compra.
          </p>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-hero max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  O que você procura?
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder="Ex: Honda Civic, Toyota Corolla..." 
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Localização
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder="Cidade ou CEP" 
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preço até
                </label>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30000">R$ 30.000</SelectItem>
                    <SelectItem value="50000">R$ 50.000</SelectItem>
                    <SelectItem value="80000">R$ 80.000</SelectItem>
                    <SelectItem value="100000">R$ 100.000</SelectItem>
                    <SelectItem value="150000">R$ 150.000</SelectItem>
                    <SelectItem value="200000">R$ 200.000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-primary hover:bg-primary-hover text-lg px-8 py-3 h-auto"
              >
                <Search className="mr-2 h-5 w-5" />
                Buscar Veículos
              </Button>
              
              <div className="flex items-center text-muted-foreground text-sm">
                <Calendar className="mr-2 h-4 w-4" />
                Mais de 50.000 veículos disponíveis
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
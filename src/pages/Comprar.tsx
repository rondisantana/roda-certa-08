import Header from "@/components/Header";
import FilterSection from "@/components/FilterSection";
import CarCatalog from "@/components/CarCatalog";

const Comprar = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Encontre seu Carro Ideal
          </h1>
          <p className="text-muted-foreground">
            Explore nossa seleção de veículos seminovos com preços justos e qualidade garantida.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterSection />
          </div>
          <div className="lg:col-span-3">
            <CarCatalog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comprar;
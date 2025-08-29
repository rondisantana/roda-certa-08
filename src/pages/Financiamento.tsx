import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator, Car, CreditCard, TrendingUp } from "lucide-react";

const Financiamento = () => {
  const [valorVeiculo, setValorVeiculo] = useState([50000]);
  const [entrada, setEntrada] = useState([10000]);
  const [parcelas, setParcelas] = useState("36");
  const [renda, setRenda] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const calcularParcela = () => {
    const valorFinanciado = valorVeiculo[0] - entrada[0];
    const taxa = 0.015; // 1.5% ao mês
    const numParcelas = parseInt(parcelas);
    
    const parcela = (valorFinanciado * taxa * Math.pow(1 + taxa, numParcelas)) / 
                   (Math.pow(1 + taxa, numParcelas) - 1);
    
    return parcela;
  };

  const handleSimular = () => {
    // Aqui você integraria com API de financiamento
    console.log("Simulação enviada:", {
      valorVeiculo: valorVeiculo[0],
      entrada: entrada[0],
      parcelas,
      renda,
      nome,
      email,
      telefone
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Simulação de Financiamento
            </h1>
            <p className="text-xl text-muted-foreground">
              Calcule suas parcelas e encontre a melhor condição para seu carro
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulário de Simulação */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Dados da Simulação
                </CardTitle>
                <CardDescription>
                  Preencha os dados para calcular seu financiamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Valor do Veículo: R$ {valorVeiculo[0].toLocaleString()}</Label>
                  <Slider
                    value={valorVeiculo}
                    onValueChange={setValorVeiculo}
                    max={200000}
                    min={10000}
                    step={1000}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Entrada: R$ {entrada[0].toLocaleString()}</Label>
                  <Slider
                    value={entrada}
                    onValueChange={setEntrada}
                    max={valorVeiculo[0] * 0.8}
                    min={valorVeiculo[0] * 0.1}
                    step={1000}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parcelas">Número de Parcelas</Label>
                  <Select value={parcelas} onValueChange={setParcelas}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12x</SelectItem>
                      <SelectItem value="24">24x</SelectItem>
                      <SelectItem value="36">36x</SelectItem>
                      <SelectItem value="48">48x</SelectItem>
                      <SelectItem value="60">60x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="renda">Renda Mensal</Label>
                  <Input
                    id="renda"
                    placeholder="R$ 5.000,00"
                    value={renda}
                    onChange={(e) => setRenda(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Resultado da Simulação */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Resultado da Simulação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/5 p-6 rounded-lg border-2 border-primary/20">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Valor da Parcela</p>
                    <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      R$ {calcularParcela().toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">em {parcelas} vezes</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Valor Financiado</p>
                    <p className="text-lg font-semibold">
                      R$ {(valorVeiculo[0] - entrada[0]).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total a Pagar</p>
                    <p className="text-lg font-semibold">
                      R$ {(calcularParcela() * parseInt(parcelas) + entrada[0]).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dados Pessoais */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Seus Dados para Pré-Aprovação
              </CardTitle>
              <CardDescription>
                Preencha seus dados para receber uma proposta personalizada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone/WhatsApp</Label>
                  <Input
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSimular}
                className="w-full mt-6 bg-gradient-primary hover:bg-primary-hover"
                size="lg"
              >
                <Car className="h-4 w-4 mr-2" />
                Solicitar Pré-Aprovação
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Financiamento;
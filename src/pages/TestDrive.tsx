import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Car,
  Clock,
  MapPin,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TestDrive = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnh, setCnh] = useState("");
  const [marcaModelo, setMarcaModelo] = useState("");
  const [data, setData] = useState<Date>();
  const [horario, setHorario] = useState("");
  const [unidade, setUnidade] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const buscarAgendamentos = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/test-drives");
        const dados = await resposta.json();
        setAgendamentos(dados);
      } catch (erro) {
        console.error("Erro ao buscar agendamentos:", erro);
      }
    };

    buscarAgendamentos();
  }, []);

  const handleAgendar = async () => {
    if (
      !nome ||
      !email ||
      !telefone ||
      !cnh ||
      !marcaModelo ||
      !data ||
      !horario ||
      !unidade
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3000/test-drives", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          cnh,
          marcaModelo,
          data,
          horario,
          unidade,
          observacoes,
        }),
      });

      if (resposta.ok) {
        const novo = await resposta.json(); // pega o agendamento recém-criado
        setAgendamentos((prev) => [...prev, novo]); // adiciona à lista
        alert("Agendamento realizado com sucesso!");
        // Limpar o formulário
        setNome("");
        setEmail("");
        setTelefone("");
        setCnh("");
        setMarcaModelo("");
        setData(undefined);
        setHorario("");
        setUnidade("");
        setObservacoes("");
      } else {
        alert("Erro ao agendar. Tente novamente.");
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      alert("Erro de conexão com o servidor.");
    }
  };

  const handleExcluir = async (id: number) => {
    console.log("Excluindo ID:", id);

    const confirmar = confirm(
      "Tem certeza que deseja excluir este agendamento?"
    );
    if (!confirmar) return;

    try {
      const resposta = await fetch(`http://localhost:3000/test-drives/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        // Remove o agendamento da lista atualizada
        setAgendamentos((prev) => prev.filter((item) => item.id !== id));
        alert("Agendamento excluído com sucesso!");
      } else {
        alert("Erro ao excluir agendamento.");
      }
    } catch (erro) {
      console.error("Erro ao excluir:", erro);
      alert("Erro de conexão com o servidor.");
    }
  };

  const handleEditar = async (agendamento: any) => {
    const novaObs = prompt(
      "Digite novas observações:",
      agendamento.observacoes || ""
    );
    if (novaObs === null) return;

    try {
      const resposta = await fetch(
        `http://localhost:3000/test-drives/${agendamento.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ observacoes: novaObs }),
        }
      );

      if (resposta.ok) {
        const atualizado = await resposta.json();
        setAgendamentos((prev) =>
          prev.map((item) => (item.id === atualizado.id ? atualizado : item))
        );
        alert("Agendamento atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar agendamento.");
      }
    } catch (erro) {
      console.error("Erro ao editar:", erro);
      alert("Erro de conexão com o servidor.");
    }
  };

  const horariosDisponiveis = [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const unidadesDisponiveis = [
    "São Paulo - Vila Olímpia",
    "São Paulo - Morumbi",
    "Rio de Janeiro - Barra da Tijuca",
    "Belo Horizonte - Savassi",
    "Brasília - Asa Sul",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Agendar Test Drive
            </h1>
            <p className="text-xl text-muted-foreground">
              Experimente o veículo dos seus sonhos antes de decidir
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dados Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Dados Pessoais
                </CardTitle>
                <CardDescription>
                  Informações necessárias para o agendamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                  <Input
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnh">CNH (últimos 4 dígitos) *</Label>
                  <Input
                    id="cnh"
                    placeholder="1234"
                    maxLength={4}
                    value={cnh}
                    onChange={(e) => setCnh(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Detalhes do Test Drive */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Detalhes do Test Drive
                </CardTitle>
                <CardDescription>
                  Escolha o veículo, data e horário
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="marca-modelo">
                    Marca/Modelo de Interesse
                  </Label>
                  <Select value={marcaModelo} onValueChange={setMarcaModelo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o veículo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="honda-civic">
                        Honda Civic 2023
                      </SelectItem>
                      <SelectItem value="toyota-corolla">
                        Toyota Corolla 2022
                      </SelectItem>
                      <SelectItem value="hyundai-hb20">
                        Hyundai HB20 2023
                      </SelectItem>
                      <SelectItem value="volkswagen-jetta">
                        Volkswagen Jetta 2022
                      </SelectItem>
                      <SelectItem value="chevrolet-onix">
                        Chevrolet Onix Plus 2023
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Data Preferida</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !data && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {data
                          ? format(data, "PPP", { locale: ptBR })
                          : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={data}
                        onSelect={setData}
                        disabled={(date) => date < new Date()}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horario">Horário Preferido</Label>
                  <Select value={horario} onValueChange={setHorario}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {horariosDisponiveis.map((hora) => (
                        <SelectItem key={hora} value={hora}>
                          {hora}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unidade">Unidade para Test Drive</Label>
                  <Select value={unidade} onValueChange={setUnidade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {unidadesDisponiveis.map((local) => (
                        <SelectItem key={local} value={local}>
                          {local}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Observações e Confirmação */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Informações Adicionais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações (opcional)</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Alguma observação especial ou dúvida sobre o veículo..."
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Importante:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Leve um documento com foto e CNH válida</li>
                  <li>• O test drive tem duração aproximada de 30 minutos</li>
                  <li>• Confirmaremos o agendamento por e-mail e WhatsApp</li>
                  <li>• Em caso de chuva, reagendaremos para sua segurança</li>
                </ul>
              </div>

              <Button
                onClick={handleAgendar}
                className="w-full bg-gradient-primary hover:bg-primary-hover"
                size="lg"
              >
                <Car className="h-4 w-4 mr-2" />
                Confirmar Agendamento
              </Button>
            </CardContent>
          </Card>
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Agendamentos Criados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agendamentos.map((agendamento) => (
                <Card key={agendamento.id}>
                  <CardHeader>
                    <CardTitle>{agendamento.nome}</CardTitle>
                    <CardDescription>
                      {agendamento.email} • {agendamento.telefone}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>
                      <strong>CNH:</strong> ****{agendamento.cnh}
                    </p>
                    <p>
                      <strong>Data:</strong> {agendamento.data}
                    </p>
                    <p>
                      <strong>Horário:</strong> {agendamento.horario}
                    </p>
                    <p>
                      <strong>Unidade:</strong> {agendamento.unidade}
                    </p>
                    <p>
                      <strong>Veículo:</strong> {agendamento.marcaModelo}
                    </p>
                    {agendamento.observacoes && (
                      <p>
                        <strong>Observações:</strong> {agendamento.observacoes}
                      </p>
                    )}
                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => handleEditar(agendamento)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleExcluir(Number(agendamento.id))}
                      >
                        Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDrive;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LookupField } from "@/components/ui/lookup-field";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from "lucide-react";

interface FilterModalProps {
  children: React.ReactNode;
}

export function FilterModal({ children }: FilterModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [amountRange, setAmountRange] = useState({ min: "", max: "" });

  const categories = [
    { id: "alimentacao", name: "Alimentação" },
    { id: "transporte", name: "Transporte" },
    { id: "lazer", name: "Lazer" },
    { id: "saude", name: "Saúde" },
    { id: "trabalho", name: "Trabalho" },
    { id: "utilidades", name: "Utilidades" },
    { id: "investimentos", name: "Investimentos" },
    { id: "vendas", name: "Vendas" },
  ];

  const accounts = [
    { id: "conta-corrente", name: "Conta Corrente" },
    { id: "poupanca", name: "Poupança" },
    { id: "cartao-credito", name: "Cartão de Crédito" },
    { id: "dinheiro", name: "Dinheiro" },
  ];

  const statuses = [
    { id: "completed", name: "Concluído" },
    { id: "pending", name: "Pendente" },
    { id: "cancelled", name: "Cancelado" },
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedAccounts([]);
    setSelectedStatuses([]);
    setAmountRange({ min: "", max: "" });
  };

  const applyFilters = () => {
    console.log("Aplicando filtros:", {
      searchTerm,
      selectedCategories,
      selectedAccounts,
      selectedStatuses,
      amountRange
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros Avançados
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Search Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Buscar Transações</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Digite a descrição ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Categorias</label>
            <LookupField
              options={categories}
              selected={selectedCategories}
              onSelectionChange={setSelectedCategories}
              placeholder="Selecione as categorias"
              emptyText="Nenhuma categoria encontrada"
            />
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map(categoryId => {
                  const category = categories.find(c => c.id === categoryId);
                  return (
                    <Badge key={categoryId} variant="secondary" className="gap-1">
                      {category?.name}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => setSelectedCategories(prev => prev.filter(id => id !== categoryId))}
                      />
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Accounts */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Contas</label>
            <LookupField
              options={accounts}
              selected={selectedAccounts}
              onSelectionChange={setSelectedAccounts}
              placeholder="Selecione as contas"
              emptyText="Nenhuma conta encontrada"
            />
            {selectedAccounts.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedAccounts.map(accountId => {
                  const account = accounts.find(a => a.id === accountId);
                  return (
                    <Badge key={accountId} variant="secondary" className="gap-1">
                      {account?.name}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => setSelectedAccounts(prev => prev.filter(id => id !== accountId))}
                      />
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Status</label>
            <LookupField
              options={statuses}
              selected={selectedStatuses}
              onSelectionChange={setSelectedStatuses}
              placeholder="Selecione os status"
              emptyText="Nenhum status encontrado"
            />
            {selectedStatuses.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedStatuses.map(statusId => {
                  const status = statuses.find(s => s.id === statusId);
                  return (
                    <Badge key={statusId} variant="secondary" className="gap-1">
                      {status?.name}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => setSelectedStatuses(prev => prev.filter(id => id !== statusId))}
                      />
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Amount Range */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Faixa de Valor</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  type="number"
                  placeholder="Valor mínimo"
                  value={amountRange.min}
                  onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Valor máximo"
                  value={amountRange.max}
                  onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={clearFilters}>
            Limpar Filtros
          </Button>
          <Button onClick={applyFilters}>
            Aplicar Filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

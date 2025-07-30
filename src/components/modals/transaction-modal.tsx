
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TransactionModalProps {
  children: React.ReactNode
  mode?: "create" | "edit"
  transaction?: any
}

export function TransactionModal({ children, mode = "create", transaction }: TransactionModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    description: transaction?.description || "",
    amount: transaction?.amount || "",
    type: transaction?.type || "expense",
    category: transaction?.category || "",
    date: transaction?.date ? new Date(transaction.date) : new Date(),
    notes: transaction?.notes || ""
  })

  const categories = [
    "Alimentação",
    "Transporte", 
    "Lazer",
    "Utilidades",
    "Saúde",
    "Trabalho",
    "Investimentos",
    "Vendas",
    "Outros"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Salvando transação:", formData)
    setOpen(false)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d,]/g, '')
    setFormData(prev => ({ ...prev, amount: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {formData.type === "income" ? (
              <TrendingUp className="h-5 w-5 text-success" />
            ) : (
              <TrendingDown className="h-5 w-5 text-expense" />
            )}
            {mode === "create" ? "Nova Transação" : "Editar Transação"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de Transação */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={formData.type === "income" ? "default" : "outline"}
              className={cn(
                "h-12 gap-2",
                formData.type === "income" && "bg-success text-success-foreground hover:bg-success/90"
              )}
              onClick={() => setFormData(prev => ({ ...prev, type: "income" }))}
            >
              <TrendingUp className="h-4 w-4" />
              Receita
            </Button>
            <Button
              type="button"
              variant={formData.type === "expense" ? "default" : "outline"}
              className={cn(
                "h-12 gap-2",
                formData.type === "expense" && "bg-expense text-expense-foreground hover:bg-expense/90"
              )}
              onClick={() => setFormData(prev => ({ ...prev, type: "expense" }))}
            >
              <TrendingDown className="h-4 w-4" />
              Despesa
            </Button>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex: Supermercado, Salário, Freelance..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          {/* Valor */}
          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                placeholder="0,00"
                value={formData.amount}
                onChange={handleAmountChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Categoria e Data */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "dd/MM/yyyy") : "Selecione"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => setFormData(prev => ({ ...prev, date: date || new Date() }))}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Adicione detalhes sobre esta transação..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="min-h-[80px]"
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {mode === "create" ? "Criar Transação" : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

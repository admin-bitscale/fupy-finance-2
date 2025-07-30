
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, FilterX, Download, ArrowUpRight, ArrowDownLeft, CalendarDays, MoreHorizontal, Edit, Trash2, Settings, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { TransactionModal } from "@/components/modals/transaction-modal"
import { FilterModal } from "@/components/dashboard/filter-modal"
import { SortDropdown } from "@/components/ui/sort-dropdown"

interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
  status: "completed" | "pending" | "cancelled"
}

const allTransactions: Transaction[] = [
  { id: "1", description: "Salário", amount: 5000, type: "income", category: "Trabalho", date: "2024-07-20", status: "completed" },
  { id: "2", description: "Supermercado", amount: 350, type: "expense", category: "Alimentação", date: "2024-07-19", status: "completed" },
  { id: "3", description: "Freelance", amount: 800, type: "income", category: "Trabalho", date: "2024-07-18", status: "completed" },
  { id: "4", description: "Gasolina", amount: 120, type: "expense", category: "Transporte", date: "2024-07-17", status: "pending" },
  { id: "5", description: "Cinema", amount: 60, type: "expense", category: "Lazer", date: "2024-07-16", status: "completed" },
  { id: "6", description: "Conta de Luz", amount: 180, type: "expense", category: "Utilidades", date: "2024-07-15", status: "completed" },
  { id: "7", description: "Venda Online", amount: 250, type: "income", category: "Vendas", date: "2024-07-14", status: "completed" },
  { id: "8", description: "Farmácia", amount: 45, type: "expense", category: "Saúde", date: "2024-07-13", status: "completed" },
  { id: "9", description: "Dividendos", amount: 150, type: "income", category: "Investimentos", date: "2024-07-12", status: "completed" },
  { id: "10", description: "Restaurante", amount: 85, type: "expense", category: "Alimentação", date: "2024-07-11", status: "completed" },
  { id: "11", description: "Uber", amount: 25, type: "expense", category: "Transporte", date: "2024-07-10", status: "completed" },
  { id: "12", description: "Consultoria", amount: 1200, type: "income", category: "Trabalho", date: "2024-07-09", status: "completed" },
  { id: "13", description: "Netflix", amount: 30, type: "expense", category: "Lazer", date: "2024-07-08", status: "completed" },
  { id: "14", description: "Farmácia", amount: 80, type: "expense", category: "Saúde", date: "2024-07-07", status: "completed" },
  { id: "15", description: "Investimento", amount: 500, type: "expense", category: "Investimentos", date: "2024-07-06", status: "completed" },
]

const sortOptions = [
  { value: "date", label: "Data" },
  { value: "amount", label: "Valor" },
  { value: "description", label: "Descrição" },
  { value: "category", label: "Categoria" }
];

export default function Transactions() {
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filtrar transações
  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter
    
    return matchesType && matchesCategory
  })

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Transaction]
    let bValue: any = b[sortBy as keyof Transaction]
    
    if (sortBy === "date") {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    } else if (sortBy === "amount") {
      aValue = Number(aValue)
      bValue = Number(bValue)
    }
    
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = sortedTransactions.slice(startIndex, startIndex + itemsPerPage)

  const categories = [...new Set(allTransactions.map(t => t.category))]
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-success text-success-foreground">Concluído</Badge>
      case "pending":
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Pendente</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const handleSortChange = (field: string, order: "asc" | "desc") => {
    setSortBy(field)
    setSortOrder(order)
  }

  const clearFilters = () => {
    setTypeFilter("all")
    setCategoryFilter("all")
    setSortBy("date")
    setSortOrder("desc")
    setCurrentPage(1)
  }

  const handleEditTransaction = (transaction: Transaction) => {
    console.log("Editando transação:", transaction.id);
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    console.log("Deletando transação:", transaction.id);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Transações
          </h1>
          <p className="text-muted-foreground text-sm sm:text-lg">
            Gerencie todas as suas transações financeiras
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <TransactionModal>
            <Button size="sm" className="gap-2 text-xs sm:text-sm">
              <Plus className="h-4 w-4" />
              Nova Transação
            </Button>
          </TransactionModal>
          <Button size="sm" variant="outline" onClick={clearFilters}>
            <FilterX className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="gap-2 text-xs sm:text-sm">
            <Download className="h-4 w-4" />
            Exportar ({filteredTransactions.length})
          </Button>
          <FilterModal>
            <Button size="sm" variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
          </FilterModal>
        </div>
      </div>

      {/* Simplified Quick Filters */}
      <Card className="glass-effect shadow-lg border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg">Filtros Rápidos</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tipo de Transação</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-background/60 border-border/50 focus:bg-background/80 transition-all">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="income">Receitas</SelectItem>
                  <SelectItem value="expense">Despesas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Categoria</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-background/60 border-border/50 focus:bg-background/80 transition-all">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-muted-foreground">
        <span>
          Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTransactions.length)} de {filteredTransactions.length} transações
        </span>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>Página {currentPage} de {totalPages}</span>
        </div>
      </div>

      {/* Transactions List */}
      <Card className="glass-effect shadow-lg border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl">
              Histórico de Transações
            </CardTitle>
            <SortDropdown
              options={sortOptions}
              currentSort={sortBy}
              currentOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          </div>
        </CardHeader>
        <CardContent>
          {paginatedTransactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FilterX className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma transação encontrada com os filtros aplicados.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {paginatedTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 sm:p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all hover:shadow-md">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className={cn(
                      "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full flex-shrink-0",
                      transaction.type === "income" 
                        ? "bg-success/10 text-success" 
                        : "bg-expense/10 text-expense"
                    )}>
                      {transaction.type === "income" ? (
                        <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">{transaction.description}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm text-muted-foreground">
                        <span className="truncate">{transaction.category}</span>
                        <span className="hidden xs:inline">•</span>
                        <span className="whitespace-nowrap">
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    <div className="text-right">
                      <p className={cn(
                        "font-medium text-sm sm:text-lg",
                        transaction.type === "income" ? "text-success" : "text-expense"
                      )}>
                        {transaction.type === "income" ? "+" : "-"}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <div className="flex justify-end mt-1">
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/50">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <TransactionModal mode="edit" transaction={transaction}>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                        </TransactionModal>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteTransaction(transaction)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={page === currentPage}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                }
                return null
              })}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

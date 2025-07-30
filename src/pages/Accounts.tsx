
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, CreditCard, Building, Wallet, Eye, EyeOff, MoreVertical, Receipt, Edit, Settings, Trash2, TrendingUp, TrendingDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Account {
  id: string
  name: string
  type: "checking" | "savings" | "credit" | "investment"
  balance: number
  bank: string
  accountNumber: string
  isActive: boolean
  color: string
}

const accounts: Account[] = [
  {
    id: "1",
    name: "Conta Corrente Principal",
    type: "checking",
    balance: 8450.30,
    bank: "Banco do Brasil",
    accountNumber: "****1234",
    isActive: true,
    color: "bg-blue-500"
  },
  {
    id: "2",
    name: "Poupança",
    type: "savings",
    balance: 15720.80,
    bank: "Caixa Econômica",
    accountNumber: "****5678",
    isActive: true,
    color: "bg-green-500"
  },
  {
    id: "3",
    name: "Cartão de Crédito",
    type: "credit",
    balance: -2340.50,
    bank: "Nubank",
    accountNumber: "****9012",
    isActive: true,
    color: "bg-purple-500"
  },
  {
    id: "4",
    name: "Investimentos",
    type: "investment",
    balance: 45280.90,
    bank: "XP Investimentos",
    accountNumber: "****3456",
    isActive: true,
    color: "bg-orange-500"
  },
  {
    id: "5",
    name: "Conta Salário",
    type: "checking",
    balance: 3200.00,
    bank: "Itaú",
    accountNumber: "****7890",
    isActive: false,
    color: "bg-gray-500"
  }
]

export default function Accounts() {
  const [showBalances, setShowBalances] = useState(true)
  const [selectedType, setSelectedType] = useState("all")

  const filteredAccounts = accounts.filter(account => {
    if (selectedType === "all") return true
    return account.type === selectedType
  })

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <Building className="h-4 w-4 sm:h-5 sm:w-5" />
      case "savings":
        return <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
      case "credit":
        return <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
      case "investment":
        return <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
      default:
        return <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
    }
  }

  const getAccountTypeName = (type: string) => {
    switch (type) {
      case "checking":
        return "Conta Corrente"
      case "savings":
        return "Poupança"
      case "credit":
        return "Cartão de Crédito"
      case "investment":
        return "Investimentos"
      default:
        return "Conta"
    }
  }

  const getTotalBalance = () => {
    return accounts
      .filter(account => account.isActive && account.type !== "credit")
      .reduce((sum, account) => sum + account.balance, 0)
  }

  const getCreditTotal = () => {
    return Math.abs(accounts
      .filter(account => account.isActive && account.type === "credit")
      .reduce((sum, account) => sum + account.balance, 0))
  }

  const handleNewAccount = () => {
    console.log("Nova conta")
  }

  const handleAccountAction = (accountId: string, action: string) => {
    console.log(`Ação ${action} na conta ${accountId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl blur-3xl" />
          <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  Suas Contas
                </h1>
                <p className="text-muted-foreground text-lg sm:text-xl font-medium">
                  Controle financeiro centralizado
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowBalances(!showBalances)}
                  className="gap-2 bg-background/50 backdrop-blur-sm border-border/60 hover:bg-accent/80 transition-all duration-300 hover:scale-105"
                >
                  {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showBalances ? "Ocultar" : "Mostrar"}
                </Button>
                <Button 
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                  onClick={handleNewAccount}
                >
                  <Plus className="h-4 w-4" />
                  Nova Conta
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/30 border-emerald-200 dark:border-emerald-800 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 group-hover:from-emerald-500/10 group-hover:to-emerald-600/20 transition-all duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-emerald-500/20 rounded-2xl shadow-inner">
                  <Wallet className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 mb-1">Saldo Total</p>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-800 dark:text-emerald-200 truncate">
                    {showBalances ? `R$ ${getTotalBalance().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "••••••"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/30 border-red-200 dark:border-red-800 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/10 group-hover:from-red-500/10 group-hover:to-red-600/20 transition-all duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-red-500/20 rounded-2xl shadow-inner">
                  <CreditCard className="h-7 w-7 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-red-700 dark:text-red-300 mb-1">Dívidas</p>
                  <p className="text-2xl sm:text-3xl font-bold text-red-800 dark:text-red-200 truncate">
                    {showBalances ? `R$ ${getCreditTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "••••••"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 group-hover:from-blue-500/10 group-hover:to-blue-600/20 transition-all duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-500/20 rounded-2xl shadow-inner">
                  <Building className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-1">Contas Ativas</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-200">
                    {accounts.filter(acc => acc.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { key: "all", label: "Todas", count: accounts.length },
                  { key: "checking", label: "Corrente", count: accounts.filter(a => a.type === "checking").length },
                  { key: "savings", label: "Poupança", count: accounts.filter(a => a.type === "savings").length },
                  { key: "credit", label: "Cartão", count: accounts.filter(a => a.type === "credit").length },
                  { key: "investment", label: "Investimentos", count: accounts.filter(a => a.type === "investment").length }
                ].map(filter => (
                  <Button
                    key={filter.key}
                    variant={selectedType === filter.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(filter.key)}
                    className={cn(
                      "gap-2 transition-all duration-300 hover:scale-105",
                      selectedType === filter.key 
                        ? "bg-gradient-to-r from-primary to-primary/90 shadow-lg hover:shadow-xl" 
                        : "hover:bg-accent/80 bg-background/50"
                    )}
                  >
                    {filter.label}
                    <Badge variant="secondary" className="bg-background/30 text-xs font-bold px-2">
                      {filter.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Accounts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative space-y-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredAccounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className={cn(
                  "relative overflow-hidden bg-card/80 backdrop-blur-xl border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer",
                  !account.isActive && "opacity-60 grayscale hover:grayscale-0"
                )}>
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 p-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="h-full w-full rounded-2xl bg-card" />
                  </div>

                  <CardHeader className="relative pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className={cn(
                          "p-3 sm:p-4 rounded-2xl text-white shadow-lg group-hover:shadow-xl transition-all duration-300",
                          account.color
                        )}>
                          {getAccountIcon(account.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg sm:text-xl font-bold text-foreground truncate">
                            {account.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <p className="text-sm font-medium text-muted-foreground truncate">
                              {account.bank}
                            </p>
                            {account.isActive ? (
                              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700 font-semibold text-xs">
                                Ativa
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs font-semibold">
                                Inativa
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 hover:bg-accent/50 rounded-xl transition-all duration-300 hover:scale-110"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          align="end" 
                          className="w-56 bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl"
                        >
                          <DropdownMenuItem onClick={() => handleAccountAction(account.id, "statement")} className="gap-3 py-3 hover:bg-accent/50 transition-colors">
                            <Receipt className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Ver Extrato</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAccountAction(account.id, "edit")} className="gap-3 py-3 hover:bg-accent/50 transition-colors">
                            <Edit className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Editar Conta</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAccountAction(account.id, "settings")} className="gap-3 py-3 hover:bg-accent/50 transition-colors">
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Configurações</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/50" />
                          <DropdownMenuItem 
                            onClick={() => handleAccountAction(account.id, "delete")} 
                            className="gap-3 py-3 text-red-600 focus:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="font-medium">Excluir Conta</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-6">
                    {/* Account Type Badge */}
                    <div className="bg-muted/40 backdrop-blur-sm p-4 rounded-xl border border-border/30">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-muted-foreground">
                          {getAccountTypeName(account.type)}
                        </span>
                        <Badge variant="outline" className="text-xs font-mono bg-background/50">
                          {account.bank}
                        </Badge>
                      </div>
                    </div>

                    {/* Balance Display */}
                    <div className="text-center bg-gradient-to-br from-muted/30 via-muted/20 to-muted/10 p-6 rounded-2xl border border-border/30 group-hover:border-border/50 transition-all duration-300">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <p className="text-sm font-bold text-muted-foreground">Saldo Atual</p>
                        {account.balance >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <p className={cn(
                        "text-3xl sm:text-4xl font-bold transition-all duration-300",
                        account.balance >= 0 
                          ? "text-emerald-600 dark:text-emerald-400" 
                          : "text-red-600 dark:text-red-400"
                      )}>
                        {showBalances ? (
                          <>
                            {account.balance >= 0 ? "" : "-"}R$ {Math.abs(account.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </>
                        ) : (
                          "••••••"
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

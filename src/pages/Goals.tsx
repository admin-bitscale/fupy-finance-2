
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, TrendingUp, Calendar, DollarSign, Edit, Trash2, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { GoalModal } from "@/components/modals/goal-modal"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Goal {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  priority: "low" | "medium" | "high"
  status: "active" | "completed" | "paused"
}

const goals: Goal[] = [
  {
    id: "1",
    title: "Emergência",
    description: "Reserva de emergência para 6 meses",
    targetAmount: 30000,
    currentAmount: 18500,
    deadline: "2024-12-31",
    category: "Reserva",
    priority: "high",
    status: "active"
  },
  {
    id: "2", 
    title: "Viagem Europa",
    description: "Economizar para viagem de 15 dias",
    targetAmount: 15000,
    currentAmount: 8200,
    deadline: "2024-08-15",
    category: "Lazer",
    priority: "medium",
    status: "active"
  },
  {
    id: "3",
    title: "Carro Novo",
    description: "Entrada para financiamento do carro",
    targetAmount: 25000,
    currentAmount: 12000,
    deadline: "2024-10-01",
    category: "Transporte",
    priority: "medium",
    status: "active"
  },
  {
    id: "4",
    title: "Curso de Inglês",
    description: "Investimento em educação",
    targetAmount: 3000,
    currentAmount: 3000,
    deadline: "2024-06-01",
    category: "Educação",
    priority: "low",
    status: "completed"
  }
]

export default function Goals() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30 border-red-200 dark:border-red-800/50"
      case "medium": return "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800/50"
      case "low": return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/30 border-green-200 dark:border-green-800/50"
      default: return "text-muted-foreground bg-muted border-border"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50"
      case "completed": return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/30 border-green-200 dark:border-green-800/50"
      case "paused": return "text-muted-foreground bg-muted border-border"
      default: return "text-muted-foreground bg-muted border-border"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Ativo"
      case "completed": return "Concluído"
      case "paused": return "Pausado"
      default: return "Desconhecido"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "Alta"
      case "medium": return "Média"
      case "low": return "Baixa"
      default: return "Indefinida"
    }
  }

  const handleGoalAction = (goalId: string, action: string) => {
    console.log(`Ação ${action} na meta ${goalId}`)
  }

  return (
    <motion.div 
      className="space-y-4 sm:space-y-6 min-h-screen pb-4 sm:pb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-xl rounded-2xl border border-border/40 shadow-xl" />
          <div className="relative p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
                  Metas Financeiras
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg">
                  Defina e acompanhe seus objetivos de economia com estratégia
                </p>
              </div>
              <GoalModal>
                <Button className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all">
                  <Plus className="h-4 w-4" />
                  Nova Meta
                </Button>
              </GoalModal>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-success/5 to-success/10 border-success/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-success/10" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Metas Ativas</CardTitle>
            <div className="p-2 bg-success/20 rounded-lg">
              <Target className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-success">3</div>
            <p className="text-xs text-muted-foreground mt-1">Em andamento</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Progresso Médio</CardTitle>
            <div className="p-2 bg-primary/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-primary">66%</div>
            <p className="text-xs text-muted-foreground mt-1">Média geral</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Economizado</CardTitle>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-blue-600">R$ 41.700</div>
            <p className="text-xs text-muted-foreground mt-1">De R$ 73.000 total</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Goals List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
      >
        {goals.map((goal, index) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100
          const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
          
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-xl border-border/40 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-lg font-semibold">{goal.title}</CardTitle>
                      <p className="text-sm text-muted-foreground leading-relaxed">{goal.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/50">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleGoalAction(goal.id, "edit")} className="gap-2">
                          <Edit className="h-4 w-4" />
                          Editar Meta
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleGoalAction(goal.id, "add-value")} className="gap-2">
                          <DollarSign className="h-4 w-4" />
                          Adicionar Valor
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleGoalAction(goal.id, "delete")} 
                          className="gap-2 text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          Excluir Meta
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-3 flex-wrap">
                    <Badge className={cn("text-xs font-medium border", getPriorityColor(goal.priority))}>
                      {getPriorityText(goal.priority)}
                    </Badge>
                    <Badge className={cn("text-xs font-medium border", getStatusColor(goal.status))}>
                      {getStatusText(goal.status)}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-medium border-border/60">
                      {goal.category}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="relative space-y-5">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-semibold">{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between items-center text-sm bg-muted/30 p-3 rounded-lg">
                    <div>
                      <span className="text-muted-foreground">Atual: </span>
                      <span className="font-semibold">
                        R$ {goal.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Meta: </span>
                      <span className="font-semibold">
                        R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>
                      {goal.status === "completed" 
                        ? `Concluído em ${new Date(goal.deadline).toLocaleDateString('pt-BR')}`
                        : daysLeft > 0 
                          ? `${daysLeft} dias restantes`
                          : "Prazo vencido"
                      }
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

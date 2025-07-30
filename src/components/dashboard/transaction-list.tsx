
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Wallet, ShoppingBag, Car, Home, Utensils, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "@/hooks/useTransactions";


export function TransactionList() {
  const navigate = useNavigate();
  const { transactions, loading } = useTransactions();
  
  // Get only the 5 most recent transactions for the dashboard
  const recentTransactions = transactions.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "pending":
        return "Pendente";
      case "cancelled":
        return "Cancelado";
      default:
        return "Desconhecido";
    }
  };

  const getCategoryIcon = (categoryName: string, type: "income" | "expense") => {
    if (type === "income") {
      switch (categoryName) {
        case "Salário":
        case "Trabalho":
          return TrendingUp;
        case "Freelance":
          return Wallet;
        default:
          return ArrowUpRight;
      }
    } else {
      switch (categoryName) {
        case "Alimentação":
          return Utensils;
        case "Moradia":
        case "Casa":
          return Home;
        case "Transporte":
          return Car;
        case "Saúde":
          return Heart;
        case "Compras":
          return ShoppingBag;
        default:
          return ArrowDownRight;
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg border-border/50 bg-card/95 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">
              Transações Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-xl" />
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-muted rounded" />
                    <div className="w-24 h-3 bg-muted rounded" />
                  </div>
                </div>
                <div className="w-20 h-4 bg-muted rounded" />
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg border-border/50 bg-card/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Transações Recentes
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/transactions')}
              className="text-xs"
            >
              Ver todas as transações
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">Nenhuma transação encontrada</p>
              <p className="text-xs mt-1">Adicione sua primeira transação para começar</p>
            </div>
          ) : (
            recentTransactions.map((transaction, index) => {
              const categoryName = transaction.category?.name || 'Outros';
              const IconComponent = getCategoryIcon(categoryName, transaction.type);
            
              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/30 transition-colors border border-border/30"
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className={`p-2.5 rounded-xl backdrop-blur-sm border ${
                        transaction.type === "income" 
                          ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-600 shadow-green-500/25" 
                          : "bg-gradient-to-br from-red-500/20 to-rose-500/20 border-red-500/30 text-red-600 shadow-red-500/25"
                      } shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-4 h-4" />
                    </motion.div>
                  
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm truncate">
                          {transaction.description}
                        </p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(transaction.status)}`}
                        >
                          {getStatusText(transaction.status)}
                        </Badge>
                      </div>
                    
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{categoryName}</span>
                        <span>•</span>
                        <span>{formatDate(transaction.date)}</span>
                      </div>
                    </div>
                  </div>
                
                  <div className="text-right">
                    <p className={`font-semibold text-sm ${
                      transaction.type === "income" 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}>
                      {transaction.type === "income" ? "+" : "-"}
                      R$ {Number(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </motion.div>
              );
            })
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Wallet, ShoppingBag, Car, Home, Utensils, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Transaction {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  category: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "income",
    description: "Salário",
    amount: 5000,
    category: "Trabalho",
    date: "2024-07-28",
    status: "completed"
  },
  {
    id: "2",
    type: "expense",
    description: "Supermercado",
    amount: 350,
    category: "Alimentação",
    date: "2024-07-27",
    status: "completed"
  },
  {
    id: "3",
    type: "expense",
    description: "Conta de luz",
    amount: 150,
    category: "Moradia",
    date: "2024-07-26",
    status: "pending"
  },
  {
    id: "4",
    type: "income",
    description: "Freelance",
    amount: 800,
    category: "Trabalho",
    date: "2024-07-25",
    status: "completed"
  },
  {
    id: "5",
    type: "expense",
    description: "Gasolina",
    amount: 200,
    category: "Transporte",
    date: "2024-07-24",
    status: "completed"
  }
];

export function TransactionList() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
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
      case "failed":
        return "Falhou";
      default:
        return "Desconhecido";
    }
  };

  const getCategoryIcon = (category: string, type: "income" | "expense") => {
    if (type === "income") {
      switch (category) {
        case "Trabalho":
          return TrendingUp;
        case "Freelance":
          return Wallet;
        default:
          return ArrowUpRight;
      }
    } else {
      switch (category) {
        case "Alimentação":
          return Utensils;
        case "Moradia":
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
          {mockTransactions.map((transaction, index) => {
            const IconComponent = getCategoryIcon(transaction.category, transaction.type);
            
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
                      <span>{transaction.category}</span>
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
                    R$ {transaction.amount.toLocaleString('pt-BR')}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}

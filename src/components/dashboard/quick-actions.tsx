
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, PiggyBank } from "lucide-react";
import { TransactionModal } from "@/components/modals/transaction-modal";
import { GoalModal } from "@/components/modals/goal-modal";

const quickActions = [
  {
    title: "Nova Receita",
    description: "Adicionar receita",
    icon: Plus,
    color: "text-success",
    bgColor: "bg-success/10",
    action: "income",
  },
  {
    title: "Nova Despesa", 
    description: "Registrar gasto",
    icon: Minus,
    color: "text-expense",
    bgColor: "bg-expense/10",
    action: "expense",
  },
  {
    title: "Criar Meta",
    description: "Definir objetivo",
    icon: PiggyBank,
    color: "text-primary",
    bgColor: "bg-primary/10",
    action: "goal",
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {action.action === "goal" ? (
                  <GoalModal>
                    <Button
                      variant="ghost"
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-accent/50 transition-all duration-200 w-full"
                    >
                      <div className={`p-2 rounded-lg ${action.bgColor}`}>
                        <action.icon className={`h-4 w-4 ${action.color}`} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">
                          {action.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </Button>
                  </GoalModal>
                ) : (
                  <TransactionModal>
                    <Button
                      variant="ghost"
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-accent/50 transition-all duration-200 w-full"
                    >
                      <div className={`p-2 rounded-lg ${action.bgColor}`}>
                        <action.icon className={`h-4 w-4 ${action.color}`} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">
                          {action.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </Button>
                  </TransactionModal>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

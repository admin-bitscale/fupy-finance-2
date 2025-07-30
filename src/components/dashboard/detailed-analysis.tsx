
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpensesPieChart } from "./charts/expenses-pie-chart";
import { CategoriesBarChart } from "./charts/categories-bar-chart";
import { MonthlyLineChart } from "./charts/monthly-line-chart";
import { motion } from "framer-motion";

export function DetailedAnalysis() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Análises Detalhadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="despesas" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="despesas">Despesas</TabsTrigger>
              <TabsTrigger value="receitas">Receitas</TabsTrigger>
              <TabsTrigger value="categorias">Categorias</TabsTrigger>
              <TabsTrigger value="mensal">Mensal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="despesas" className="mt-6">
              <ExpensesPieChart />
            </TabsContent>
            
            <TabsContent value="receitas" className="mt-6">
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Receitas por Fonte</h3>
                  <p className="text-sm">Gráfico de receitas em desenvolvimento</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="categorias" className="mt-6">
              <CategoriesBarChart />
            </TabsContent>
            
            <TabsContent value="mensal" className="mt-6">
              <MonthlyLineChart />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}

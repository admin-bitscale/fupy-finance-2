
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ExpensesPieChart } from "./charts/expenses-pie-chart";
import { RevenuePieChart } from "./charts/revenue-pie-chart";
import { CategoriesBarChart } from "./charts/categories-bar-chart";
import { MonthlyLineChart } from "./charts/monthly-line-chart";

export function ChartsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="glass-effect shadow-lg">
        <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Análises Detalhadas
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <Tabs defaultValue="despesas" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-muted/30 h-auto p-1">
              <TabsTrigger 
                value="despesas" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-2 sm:px-3"
              >
                Despesas
              </TabsTrigger>
              <TabsTrigger 
                value="receitas" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-2 sm:px-3"
              >
                Receitas
              </TabsTrigger>
              <TabsTrigger 
                value="categorias" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-2 sm:px-3"
              >
                Categorias
              </TabsTrigger>
              <TabsTrigger 
                value="mensal" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-2 sm:px-3"
              >
                Mensal
              </TabsTrigger>
            </TabsList>
          
            <TabsContent value="despesas" className="space-y-4 mt-4 sm:mt-6">
              <ExpensesPieChart />
            </TabsContent>
            
            <TabsContent value="receitas" className="space-y-4 mt-4 sm:mt-6">
              <RevenuePieChart />
            </TabsContent>
            
            <TabsContent value="categorias" className="space-y-4 mt-4 sm:mt-6">
              <CategoriesBarChart />
            </TabsContent>
            
            <TabsContent value="mensal" className="space-y-4 mt-4 sm:mt-6">
              <MonthlyLineChart />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}

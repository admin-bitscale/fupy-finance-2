import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedAreaChart } from "@/components/aceternity/animated-chart";

const chartData = [
  { month: "Jan", receitas: 4000, despesas: 2400, saldo: 1600 },
  { month: "Fev", receitas: 3000, despesas: 1398, saldo: 1602 },
  { month: "Mar", receitas: 2000, despesas: 9800, saldo: -7800 },
  { month: "Abr", receitas: 2780, despesas: 3908, saldo: -1128 },
  { month: "Mai", receitas: 1890, despesas: 4800, saldo: -2910 },
  { month: "Jun", receitas: 2390, despesas: 3800, saldo: -1410 },
  { month: "Jul", receitas: 3490, despesas: 4300, saldo: -810 },
];

interface FinancialOverviewProps {
  selectedPeriod?: string;
}

export function FinancialOverview({ selectedPeriod = "Este mês" }: FinancialOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="glass-effect shadow-lg">
        <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl font-semibold text-foreground">
            Receitas vs Despesas
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Comparativo financeiro - {selectedPeriod}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="h-[250px] sm:h-[350px] w-full">
            <AnimatedAreaChart data={chartData} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

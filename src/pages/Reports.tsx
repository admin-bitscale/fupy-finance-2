
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilterModal } from "@/components/dashboard/filter-modal";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ModernChartCard } from "@/components/dashboard/charts/modern-chart-card";
import { CategoriesBarChart } from "@/components/dashboard/charts/categories-bar-chart";
import { RevenuePieChart } from "@/components/dashboard/charts/revenue-pie-chart";
import { ExpensesPieChart } from "@/components/dashboard/charts/expenses-pie-chart";
import { FinancialOverview } from "@/components/dashboard/financial-overview";
import { Filter, Download, TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useState } from "react";

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("Este mês");

  const handleExportReport = () => {
    console.log("Exportando relatório...");
  };

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
        className="space-y-3 sm:space-y-4"
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-xl rounded-2xl border border-border/40 shadow-xl" />
          <div className="relative p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
                  Relatórios Financeiros
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg">
                  Análise detalhada e insights estratégicos das suas finanças
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <FilterModal>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-background/50 backdrop-blur-sm border-border/60 hover:bg-accent/50"
                  >
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filtros</span>
                  </Button>
                </FilterModal>
                
                <Button
                  size="sm"
                  onClick={handleExportReport}
                  className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Exportar</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <StatsCard
          title="Receitas"
          value={12350}
          change={12.5}
          icon={TrendingUp}
          type="income"
          index={0}
        />
        <StatsCard
          title="Despesas"
          value={8240}
          change={-4.3}
          icon={TrendingDown}
          type="expense"
          index={1}
        />
        <StatsCard
          title="Saldo"
          value={4110}
          change={8.2}
          icon={DollarSign}
          type="balance"
          index={2}
        />
        <StatsCard
          title="Economia"
          value={33.3}
          change={2.1}
          icon={Target}
          type="percentage"
          index={3}
        />
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Receitas vs Despesas - Full width (2 columns) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <FinancialOverview selectedPeriod={selectedPeriod} />
        </motion.div>

        {/* Tendência de Economia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ModernChartCard 
            title="Tendência de Economia"
            description="Evolução mensal da sua capacidade de poupança"
          >
            <SavingsTrendChart />
          </ModernChartCard>
        </motion.div>

        {/* Progresso das Metas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ModernChartCard 
            title="Progresso das Metas"
            description="Acompanhamento dos seus objetivos financeiros"
          >
            <GoalsProgressChart />
          </ModernChartCard>
        </motion.div>

        {/* Despesas por Categoria (Bar Chart) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ModernChartCard 
            title="Despesas por Categoria"
            description="Distribuição detalhada dos seus gastos"
          >
            <CategoriesBarChart />
          </ModernChartCard>
        </motion.div>

        {/* Despesas por Categoria (Pie Chart) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <ModernChartCard 
            title="Despesas por Categoria"
            description="Visualização em pizza dos gastos"
          >
            <ExpensesPieChart />
          </ModernChartCard>
        </motion.div>

        {/* Receitas por Categoria (Pie Chart) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <ModernChartCard 
            title="Receitas por Categoria"
            description="Distribuição das suas fontes de renda"
          >
            <RevenuePieChart />
          </ModernChartCard>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Componente para Tendência de Economia
function SavingsTrendChart() {
  const savingsData = [
    { mes: "Jan", economia: 1600, meta: 2000 },
    { mes: "Fev", economia: 1602, meta: 2000 },
    { mes: "Mar", economia: -7800, meta: 2000 },
    { mes: "Abr", economia: -1128, meta: 2000 },
    { mes: "Mai", economia: -2910, meta: 2000 },
    { mes: "Jun", economia: -1410, meta: 2000 },
    { mes: "Jul", economia: -810, meta: 2000 },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Capacidade de Poupança</h3>
        <p className="text-sm text-muted-foreground">Evolução mensal</p>
      </div>
      <motion.div 
        className="h-[200px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={savingsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              strokeOpacity={0.3}
            />
            <XAxis 
              dataKey="mes" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$ ${value}`}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg">
                      <p className="text-sm font-medium mb-2">{label}</p>
                      {payload.map((entry, index) => (
                        <p key={index} className="text-xs" style={{ color: entry.color }}>
                          {entry.name}: R$ {entry.value?.toLocaleString()}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="economia"
              stroke="hsl(221.2 83.2% 53.3%)"
              strokeWidth={3}
              dot={{ fill: "hsl(221.2 83.2% 53.3%)", strokeWidth: 2, r: 4 }}
              name="Economia"
              activeDot={{ r: 6, stroke: "hsl(221.2 83.2% 53.3%)", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="meta"
              stroke="hsl(142.1 76.2% 36.3%)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Meta"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

// Componente para Progresso das Metas
function GoalsProgressChart() {
  const goalsData = [
    { meta: "Casa Própria", progresso: 45, valor: 45000, total: 100000 },
    { meta: "Viagem", progresso: 80, valor: 8000, total: 10000 },
    { meta: "Emergência", progresso: 25, valor: 2500, total: 10000 },
    { meta: "Aposentadoria", progresso: 15, valor: 30000, total: 200000 },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Metas Financeiras</h3>
        <p className="text-sm text-muted-foreground">Progresso atual</p>
      </div>
      <motion.div 
        className="h-[200px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={goalsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              strokeOpacity={0.3}
            />
            <XAxis 
              dataKey="meta" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg">
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">
                        R$ {data.valor.toLocaleString()} / R$ {data.total.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{data.progresso}% concluído</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="progresso" 
              fill="hsl(221.2 83.2% 53.3%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

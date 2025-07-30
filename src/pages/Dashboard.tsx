
import { motion } from "framer-motion";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { FinancialOverview } from "@/components/dashboard/financial-overview";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { DashboardFilter } from "@/components/dashboard/dashboard-filter";
import { ChartsSection } from "@/components/dashboard/charts-section";
import { useState } from "react";

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Este mês");

  return (
    <motion.div 
      className="space-y-4 sm:space-y-6 lg:space-y-8 min-h-screen pb-4 sm:pb-6 lg:pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with Filter */}
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
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
                Dashboard Financeiro
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg">
                Tenha uma visão completa e estratégica das suas finanças
              </p>
            </div>
          </div>
        </div>
        
        <DashboardFilter 
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SummaryCards selectedPeriod={selectedPeriod} />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FinancialOverview selectedPeriod={selectedPeriod} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <TransactionList />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <QuickActions />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <ChartsSection />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

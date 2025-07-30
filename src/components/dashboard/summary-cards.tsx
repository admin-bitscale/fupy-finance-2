
import { StatsCard } from "./stats-card";
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import { useAccounts } from "@/hooks/useAccounts";

interface SummaryCardsProps {
  selectedPeriod: string;
}

export function SummaryCards({ selectedPeriod }: SummaryCardsProps) {
  const { getTransactionSummary } = useTransactions();
  const { getAccountsSummary } = useAccounts();
  
  const transactionSummary = getTransactionSummary(selectedPeriod);
  const accountsSummary = getAccountsSummary();
  
  // Calculate previous period for comparison
  const getPreviousPeriod = (period: string) => {
    switch (period) {
      case 'Hoje':
        return 'Ontem';
      case '7 dias atrás':
        return 'Semana anterior';
      case 'Este mês':
        return 'Mês anterior';
      case 'Este ano':
        return 'Ano anterior';
      default:
        return 'Período anterior';
    }
  };

  const getPeriodLabel = (period: string) => {
    const labels = {
      "Hoje": "Ontem",
      "7 dias atrás": "Semana Anterior", 
      "Este mês": "Mês Anterior",
      "Este ano": "Ano Anterior"
    };
    return labels[period as keyof typeof labels] || "Período Anterior";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatsCard
        title={`Saldo ${getPeriodLabel(selectedPeriod)}`}
        value={accountsSummary.totalBalance - transactionSummary.balance}
        change={12.5}
        icon={Wallet}
        type="balance"
        index={0}
      />
      
      <StatsCard
        title="Saldo Atual"
        value={accountsSummary.totalBalance}
        change={8.2}
        icon={DollarSign}
        type="balance"
        index={1}
      />
      
      <StatsCard
        title={selectedPeriod === "Hoje" ? "Receitas do Dia" : 
               selectedPeriod === "7 dias atrás" ? "Receitas da Semana" :
               selectedPeriod === "Este mês" ? "Receitas do Mês" : "Receitas do Ano"}
        value={transactionSummary.income}
        change={15.3}
        icon={TrendingUp}
        type="income"
        index={2}
      />
      
      <StatsCard
        title={selectedPeriod === "Hoje" ? "Despesas do Dia" : 
               selectedPeriod === "7 dias atrás" ? "Despesas da Semana" :
               selectedPeriod === "Este mês" ? "Despesas do Mês" : "Despesas do Ano"}
        value={transactionSummary.expenses}
        change={-3.8}
        icon={TrendingDown}
        type="expense"
        index={3}
      />
    </div>
  );
}

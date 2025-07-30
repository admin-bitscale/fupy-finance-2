
import { StatsCard } from "./stats-card";
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";

interface SummaryCardsProps {
  selectedPeriod: string;
}

export function SummaryCards({ selectedPeriod }: SummaryCardsProps) {
  // Mock data que deveria vir baseado no período selecionado
  const getDataForPeriod = (period: string) => {
    const baseData = {
      "Hoje": {
        previousBalance: 12500,
        currentBalance: 12850,
        income: 350,
        expenses: 0
      },
      "7 dias atrás": {
        previousBalance: 11800,
        currentBalance: 12850,
        income: 1450,
        expenses: 400
      },
      "Este mês": {
        previousBalance: 10200,
        currentBalance: 12850,
        income: 6750,
        expenses: 4100
      },
      "Este ano": {
        previousBalance: 8500,
        currentBalance: 12850,
        income: 45200,
        expenses: 40850
      }
    };

    return baseData[period as keyof typeof baseData] || baseData["Este mês"];
  };

  const data = getDataForPeriod(selectedPeriod);

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
        value={data.previousBalance}
        change={12.5}
        icon={Wallet}
        type="balance"
        index={0}
      />
      
      <StatsCard
        title="Saldo Atual"
        value={data.currentBalance}
        change={8.2}
        icon={DollarSign}
        type="balance"
        index={1}
      />
      
      <StatsCard
        title={selectedPeriod === "Hoje" ? "Receitas do Dia" : 
               selectedPeriod === "7 dias atrás" ? "Receitas da Semana" :
               selectedPeriod === "Este mês" ? "Receitas do Mês" : "Receitas do Ano"}
        value={data.income}
        change={15.3}
        icon={TrendingUp}
        type="income"
        index={2}
      />
      
      <StatsCard
        title={selectedPeriod === "Hoje" ? "Despesas do Dia" : 
               selectedPeriod === "7 dias atrás" ? "Despesas da Semana" :
               selectedPeriod === "Este mês" ? "Despesas do Mês" : "Despesas do Ano"}
        value={data.expenses}
        change={-3.8}
        icon={TrendingDown}
        type="expense"
        index={3}
      />
    </div>
  );
}

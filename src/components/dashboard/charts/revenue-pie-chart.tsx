
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const revenueData = [
  { name: "Salário", value: 5000, color: "#22c55e" },
  { name: "Freelance", value: 800, color: "#3b82f6" },
  { name: "Dividendos", value: 150, color: "#8b5cf6" },
  { name: "Vendas", value: 250, color: "#f59e0b" },
];

const categoryData = [
  { categoria: "Salário", valor: 5000, percentage: 80.6 },
  { categoria: "Freelance", valor: 800, percentage: 12.9 },
  { categoria: "Vendas", valor: 250, percentage: 4.0 },
  { categoria: "Dividendos", valor: 150, percentage: 2.4 },
];

export function RevenuePieChart() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Receitas por Fonte</h3>
        <p className="text-sm text-muted-foreground">1 De Julho - 31 De Julho</p>
      </div>
      
      <motion.div 
        className="h-[200px] flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={revenueData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {revenueData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0];
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg">
                      <p className="text-sm font-medium">{data.name}</p>
                      <p className="text-sm text-muted-foreground">R$ {typeof data.value === 'number' ? data.value.toFixed(2) : data.value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold fill-foreground">
              R$ 6.200,00
            </text>
            <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-muted-foreground">
              Total Receita
            </text>
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
      
      <div className="space-y-2">
        {categoryData.map((item, index) => (
          <motion.div 
            key={index} 
            className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: revenueData[index]?.color }}
              />
              <span className="text-sm font-medium">{item.categoria}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">R$ {item.valor.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">({item.percentage}%)</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

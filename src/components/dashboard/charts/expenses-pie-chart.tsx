
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const expenseData = [
  { name: "Alimentação", value: 504, color: "#f97316" },
  { name: "Outros", value: 224.90, color: "#374151" },
  { name: "Saúde", value: 20, color: "#eab308" },
  { name: "Lazer", value: 18, color: "#ef4444" },
];

const categoryData = [
  { categoria: "Alimentação", valor: 504, percentage: 65.72 },
  { categoria: "Outros", valor: 224.90, percentage: 29.33 },
  { categoria: "Saúde", valor: 20, percentage: 2.61 },
  { categoria: "Lazer", valor: 18, percentage: 2.35 },
];

export function ExpensesPieChart() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Todas as Despesas</h3>
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
              data={expenseData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {expenseData.map((entry, index) => (
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
              R$ 766,90
            </text>
            <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-muted-foreground">
              Total Gasto
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
                style={{ backgroundColor: expenseData[index]?.color }}
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

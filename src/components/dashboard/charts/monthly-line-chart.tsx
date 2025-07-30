
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const monthlyData = [
  { mes: "Jan", receitas: 4000, despesas: 2400 },
  { mes: "Fev", receitas: 3000, despesas: 1398 },
  { mes: "Mar", receitas: 2000, despesas: 9800 },
  { mes: "Abr", receitas: 2780, despesas: 3908 },
  { mes: "Mai", receitas: 1890, despesas: 4800 },
  { mes: "Jun", receitas: 2390, despesas: 3800 },
  { mes: "Jul", receitas: 3490, despesas: 4300 },
];

export function MonthlyLineChart() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Comparativo Mensal</h3>
        <p className="text-sm text-muted-foreground">Receitas vs Despesas</p>
      </div>
      <motion.div 
        className="h-[200px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              dataKey="receitas"
              stroke="hsl(142.1 76.2% 36.3%)"
              strokeWidth={3}
              dot={{ fill: "hsl(142.1 76.2% 36.3%)", strokeWidth: 2, r: 4 }}
              name="Receitas"
              activeDot={{ r: 6, stroke: "hsl(142.1 76.2% 36.3%)", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="despesas"
              stroke="hsl(0 84.2% 60.2%)"
              strokeWidth={3}
              dot={{ fill: "hsl(0 84.2% 60.2%)", strokeWidth: 2, r: 4 }}
              name="Despesas"
              activeDot={{ r: 6, stroke: "hsl(0 84.2% 60.2%)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

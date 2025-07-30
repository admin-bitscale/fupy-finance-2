
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const categoryData = [
  { categoria: "Alimentação", valor: 504 },
  { categoria: "Outros", valor: 224.90 },
  { categoria: "Saúde", valor: 20 },
  { categoria: "Lazer", valor: 18 },
];

export function CategoriesBarChart() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Gastos por Categoria</h3>
        <p className="text-sm text-muted-foreground">Comparação mensal</p>
      </div>
      <motion.div 
        className="h-[200px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              strokeOpacity={0.3}
            />
            <XAxis 
              dataKey="categoria" 
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
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-sm text-muted-foreground">R$ {payload[0]?.value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="valor" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

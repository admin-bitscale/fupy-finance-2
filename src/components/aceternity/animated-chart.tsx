
import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartData {
  month: string;
  receitas: number;
  despesas: number;
  saldo: number;
}

interface AnimatedAreaChartProps {
  data: ChartData[];
}

export function AnimatedAreaChart({ data }: AnimatedAreaChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          {/* Grid mais sutil */}
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))" 
            strokeOpacity={0.3}
          />
          
          {/* Eixos com cores mais suaves */}
          <XAxis 
            dataKey="month" 
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
          
          {/* Tooltip customizado */}
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium text-foreground mb-2">{label}</p>
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
          
          {/* Áreas com opacidade reduzida */}
          <Area
            type="monotone"
            dataKey="receitas"
            stroke="hsl(142.1 76.2% 36.3%)"
            fill="hsl(142.1 76.2% 36.3%)"
            fillOpacity={0.1}
            strokeWidth={2}
            name="Receitas"
          />
          <Area
            type="monotone"
            dataKey="despesas"
            stroke="hsl(0 84.2% 60.2%)"
            fill="hsl(0 84.2% 60.2%)"
            fillOpacity={0.1}
            strokeWidth={2}
            name="Despesas"
          />
          <Area
            type="monotone"
            dataKey="saldo"
            stroke="hsl(221.2 83.2% 53.3%)"
            fill="hsl(221.2 83.2% 53.3%)"
            fillOpacity={0.1}
            strokeWidth={2}
            name="Saldo"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

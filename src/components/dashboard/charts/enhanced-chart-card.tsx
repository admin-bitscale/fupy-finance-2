
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface EnhancedChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function EnhancedChartCard({ 
  title, 
  children, 
  className = "", 
  description,
  trend 
}: EnhancedChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card/95 via-card/90 to-card/85 backdrop-blur-md shadow-2xl hover:shadow-3xl transition-all duration-500 group">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="h-full w-full rounded-lg bg-card" />
        </div>

        <CardHeader className="relative pb-2 space-y-1">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {title}
              </CardTitle>
              {description && (
                <p className="text-sm text-muted-foreground/80">{description}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {trend && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  trend.isPositive 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  <span>{trend.isPositive ? '↗' : '↘'}</span>
                  <span>{trend.value}</span>
                </div>
              )}
              
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-ping opacity-75" />
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative pt-2">
          <div className="relative z-10">
            {children}
          </div>
          
          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />
        </CardContent>
      </Card>
    </motion.div>
  );
}

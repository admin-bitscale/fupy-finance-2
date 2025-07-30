
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ModernChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  description?: string;
}

export function ModernChartCard({ title, children, className = "", description }: ModernChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <CardHeader className="relative pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {title}
              </CardTitle>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              )}
            </div>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="relative">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}

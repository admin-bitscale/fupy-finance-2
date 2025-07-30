
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  change: number;
  icon: LucideIcon;
  type: "income" | "expense" | "balance" | "percentage";
  index?: number;
}

export function StatsCard({ title, value, change, icon: Icon, type, index = 0 }: StatsCardProps) {
  const formatValue = (value: number) => {
    if (type === "percentage") {
      return `${value}%`;
    }
    return `R$ ${Math.abs(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  const getCardStyles = () => {
    switch (type) {
      case "income":
        return "border-success/20 bg-success/5";
      case "expense":
        return "border-expense/20 bg-expense/5";
      case "balance":
        return value >= 0 ? "border-success/20 bg-success/5" : "border-expense/20 bg-expense/5";
      case "percentage":
        return "border-primary/20 bg-primary/5";
      default:
        return "border-border/50 bg-card/50";
    }
  };

  const getValueColor = () => {
    if (type === "percentage") {
      return "text-primary";
    }
    switch (type) {
      case "income":
        return "text-success";
      case "expense":
        return "text-expense";
      case "balance":
        return value >= 0 ? "text-success" : "text-expense";
      default:
        return "text-foreground";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "income":
        return "text-success bg-success/10";
      case "expense":
        return "text-expense bg-expense/10";
      case "balance":
        return value >= 0 ? "text-success bg-success/10" : "text-expense bg-expense/10";
      case "percentage":
        return "text-primary bg-primary/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={cn(
        "hover:shadow-lg transition-all duration-200 backdrop-blur-sm",
        getCardStyles()
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center",
            getIconColor()
          )}>
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className={cn(
                "text-2xl font-bold",
                getValueColor()
              )}>
                {type === "balance" && value < 0 ? "-" : ""}{formatValue(value)}
              </div>
              <div className="flex items-center gap-1">
                <Badge 
                  variant={change >= 0 ? "default" : "destructive"}
                  className={cn(
                    "text-xs",
                    change >= 0 ? "bg-success/10 text-success hover:bg-success/20" : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                  )}
                >
                  {change >= 0 ? "+" : ""}{change.toFixed(1)}%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

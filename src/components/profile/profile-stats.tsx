
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Calendar, Award } from "lucide-react";

export function ProfileStats() {
  const stats = [
    {
      title: "Dias Ativos",
      value: "245",
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      change: "+12%"
    },
    {
      title: "Metas Atingidas",
      value: "18",
      icon: Target,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      change: "+25%"
    },
    {
      title: "Economia Total",
      value: "R$ 12.450",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      change: "+18%"
    },
    {
      title: "Conquistas",
      value: "7",
      icon: Award,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      change: "+3"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Estatísticas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="p-4 rounded-lg border bg-gradient-to-br from-card to-card/50 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

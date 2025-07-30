
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock data para demonstração
const financialEvents = {
  "2024-07-15": [
    { type: "income", amount: 5000, description: "Salário" },
  ],
  "2024-07-18": [
    { type: "expense", amount: 350, description: "Supermercado" },
    { type: "income", amount: 800, description: "Freelance" },
  ],
  "2024-07-20": [
    { type: "expense", amount: 120, description: "Gasolina" },
  ],
  "2024-07-22": [
    { type: "expense", amount: 60, description: "Cinema" },
  ],
  "2024-07-25": [
    { type: "income", amount: 1200, description: "Consultoria" },
  ],
};

export function FinancialCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getDayEvents = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return financialEvents[dateKey] || [];
  };

  const getDayTotal = (date: Date) => {
    const events = getDayEvents(date);
    return events.reduce((total, event) => {
      return total + (event.type === 'income' ? event.amount : -event.amount);
    }, 0);
  };

  const modifiers = {
    hasEvents: (date: Date) => {
      const dateKey = date.toISOString().split('T')[0];
      return !!financialEvents[dateKey];
    },
    positive: (date: Date) => getDayTotal(date) > 0,
    negative: (date: Date) => getDayTotal(date) < 0,
  };

  const modifiersStyles = {
    hasEvents: {
      fontWeight: 'bold',
    },
    positive: {
      backgroundColor: 'hsl(var(--success) / 0.1)',
      color: 'hsl(var(--success))',
    },
    negative: {
      backgroundColor: 'hsl(var(--destructive) / 0.1)',
      color: 'hsl(var(--destructive))',
    },
  };

  const selectedEvents = selectedDate ? getDayEvents(selectedDate) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.0 }}
      className="w-full"
    >
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Calendário Financeiro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Calendário - Ocupa mais espaço */}
            <div className="xl:col-span-2 space-y-6">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border border-border/30 p-4 pointer-events-auto scale-110 transform origin-center"
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                />
              </div>
              
              {/* Legenda melhorada */}
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-success/20 border-2 border-success/30"></div>
                  <span className="text-muted-foreground">Saldo positivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-destructive/20 border-2 border-destructive/30"></div>
                  <span className="text-muted-foreground">Saldo negativo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-muted border-2 border-border"></div>
                  <span className="text-muted-foreground">Sem transações</span>
                </div>
              </div>
            </div>

            {/* Eventos do dia selecionado */}
            <div className="space-y-6">
              <div className="sticky top-4">
                <h4 className="font-semibold text-lg text-foreground mb-4 text-center xl:text-left">
                  {selectedDate 
                    ? `${selectedDate.toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: 'long',
                        year: 'numeric'
                      })}`
                    : "Selecione uma data"
                  }
                </h4>
                
                {selectedEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedEvents.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border border-border/30 bg-card/50 hover:bg-card/70 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">{event.description}</p>
                          <Badge 
                            variant={event.type === 'income' ? 'default' : 'destructive'}
                            className={cn(
                              "text-xs",
                              event.type === 'income' 
                                ? "bg-success/10 text-success hover:bg-success/20" 
                                : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                            )}
                          >
                            {event.type === 'income' ? 'Receita' : 'Despesa'}
                          </Badge>
                        </div>
                        <span className={cn(
                          "font-semibold text-sm",
                          event.type === 'income' ? "text-success" : "text-destructive"
                        )}>
                          {event.type === 'income' ? '+' : '-'}R$ {event.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                    
                    {/* Total do dia */}
                    <div className="mt-6 p-4 rounded-lg bg-accent/20 border border-accent/30">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground">Total do dia:</span>
                        <span className={cn(
                          "font-bold text-lg",
                          getDayTotal(selectedDate!) >= 0 ? "text-success" : "text-destructive"
                        )}>
                          {getDayTotal(selectedDate!) >= 0 ? '+' : ''}R$ {getDayTotal(selectedDate!).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                      <span className="text-2xl">📅</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Nenhuma transação registrada para esta data.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}


import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Calendar, MapPin, Tag } from "lucide-react";

interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    id: string;
    title: string;
    description: string;
    type: "income" | "expense";
    amount: number;
    date: string;
  } | null;
}

export function TransactionDetailModal({ isOpen, onClose, transaction }: TransactionDetailModalProps) {
  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {transaction.type === "income" ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
            {transaction.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Valor</span>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-semibold ${
                transaction.type === "income" ? "text-green-600" : "text-red-600"
              }`}>
                {transaction.type === "income" ? "+" : "-"}R$ {transaction.amount.toLocaleString('pt-BR')}
              </span>
              <Badge variant={transaction.type === "income" ? "default" : "destructive"}>
                {transaction.type === "income" ? "Receita" : "Despesa"}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Data</span>
              <span className="text-sm font-medium ml-auto">{transaction.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Categoria</span>
              <span className="text-sm font-medium ml-auto">
                {transaction.description.split(' • ')[0]}
              </span>
            </div>

            {transaction.description.includes(' • ') && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">Descrição</span>
                <span className="text-sm font-medium ml-auto text-right">
                  {transaction.description}
                </span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

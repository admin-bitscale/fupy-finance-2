
import { useState, useRef, useEffect } from "react";
import { Search, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { TransactionDetailModal } from "./transaction-detail-modal";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "income" | "expense";
  amount: number;
  date: string;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "Salário",
    description: "Trabalho • 19/07/2024",
    type: "income",
    amount: 5000,
    date: "19/07/2024"
  },
  {
    id: "2",
    title: "Supermercado",
    description: "Alimentação • 18/07/2024",
    type: "expense",
    amount: 350,
    date: "18/07/2024"
  },
  {
    id: "3",
    title: "Freelance",
    description: "Trabalho • 17/07/2024",
    type: "income",
    amount: 800,
    date: "17/07/2024"
  },
  {
    id: "4",
    title: "Gasolina",
    description: "Transporte • 16/07/2024",
    type: "expense",
    amount: 120,
    date: "16/07/2024"
  },
  {
    id: "5",
    title: "Cinema",
    description: "Lazer • 15/07/2024",
    type: "expense",
    amount: 60,
    date: "15/07/2024"
  }
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<SearchResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockResults.filter(
        result =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectResult = (result: SearchResult) => {
    setSelectedTransaction(result);
    setIsModalOpen(true);
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <>
      <div ref={containerRef} className="relative w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            ref={inputRef}
            placeholder="Buscar transações..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 0 && setIsOpen(true)}
            className="pl-10 h-10 bg-background/90 border-border/50 focus:bg-background/95 transition-all duration-200 text-sm w-full rounded-full shadow-sm"
          />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 z-[100] mt-2"
            >
              <Card className="shadow-lg border-border/50 bg-card/95 backdrop-blur-sm">
                <CardContent className="p-0">
                  {results.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto">
                      {results.map((result, index) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="flex items-center gap-3 p-3 hover:bg-accent/50 cursor-pointer transition-colors border-b border-border/30 last:border-b-0"
                          onClick={() => handleSelectResult(result)}
                        >
                          <div className={`p-2 rounded-lg ${
                            result.type === "income" 
                              ? "bg-green-500/10 text-green-600" 
                              : "bg-red-500/10 text-red-600"
                          }`}>
                            {result.type === "income" ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm text-foreground truncate">
                                {result.title}
                              </h4>
                              <span className={`text-sm font-medium ${
                                result.type === "income" 
                                  ? "text-green-600" 
                                  : "text-red-600"
                              }`}>
                                {result.type === "income" ? "+" : "-"}R$ {result.amount.toLocaleString('pt-BR')}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {result.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Nenhuma transação encontrada</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <TransactionDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />
    </>
  );
}

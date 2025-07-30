
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays, FilterX, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface DashboardFilterProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const periodOptions = [
  "Hoje",
  "7 dias atrás", 
  "Este mês",
  "Este ano"
];

export function DashboardFilter({ selectedPeriod, onPeriodChange }: DashboardFilterProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isCustom, setIsCustom] = useState(false);

  const handlePeriodSelect = (period: string) => {
    setIsCustom(false);
    onPeriodChange(period);
  };

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      setIsCustom(true);
      const fromDate = format(range.from, "dd/MM/yyyy");
      const toDate = format(range.to, "dd/MM/yyyy");
      onPeriodChange(`${fromDate} - ${toDate}`);
    } else if (range?.from) {
      setIsCustom(true);
      onPeriodChange(`A partir de ${format(range.from, "dd/MM/yyyy")}`);
    }
  };

  const handleClearFilter = () => {
    setIsCustom(false);
    setDateRange(undefined);
    onPeriodChange("Este mês");
  };

  const handleUpdate = () => {
    // Simulate data refresh
    console.log("Atualizando dados...");
  };

  return (
    <div className="flex flex-col space-y-4 p-3 sm:p-4 glass-effect rounded-xl border border-border/30">
      {/* Mobile: Stack vertically */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <span className="text-xl sm:text-2xl">📅</span>
            <span className="text-xs sm:text-sm">Julho</span>
          </div>
        </div>

        {/* Period Options - Mobile: 2 columns, Desktop: horizontal */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {periodOptions.map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => handlePeriodSelect(period)}
              className={cn(
                "text-xs h-8 px-2 sm:px-3 min-w-0 flex-1 sm:flex-none",
                selectedPeriod === period 
                  ? "bg-success text-success-foreground hover:bg-success/90" 
                  : "hover:bg-muted"
              )}
            >
              <span className="truncate">{period}</span>
            </Button>
          ))}
        </div>

        {/* Custom Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={isCustom ? "default" : "outline"}
              size="sm"
              className={cn(
                "text-xs gap-1 h-8 px-2 sm:px-3 w-full sm:w-auto",
                isCustom 
                  ? "bg-success text-success-foreground hover:bg-success/90" 
                  : "hover:bg-muted"
              )}
            >
              <CalendarDays className="h-3 w-3 flex-shrink-0" />
              <span className="truncate sm:hidden">
                {dateRange?.from ? (
                  dateRange.to ? "Período" : "Data"
                ) : "Custom"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4 space-y-3">
              <div className="text-center">
                <h4 className="font-medium text-sm mb-2">Selecionar Período</h4>
                <p className="text-xs text-muted-foreground">Escolha as datas de início e fim</p>
              </div>
              
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={handleDateRangeSelect}
                numberOfMonths={1}
                className="rounded-md border-0 pointer-events-auto"
              />
              
              {dateRange?.from && dateRange?.to && (
                <div className="p-3 bg-muted/50 rounded-md text-center">
                  <p className="text-xs text-muted-foreground">
                    {format(dateRange.from, "dd/MM/yyyy")} - {format(dateRange.to, "dd/MM/yyyy")}
                  </p>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Action Buttons - Icons only */}
      <div className="flex flex-row gap-2 sm:gap-3 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilter}
          className="h-8 w-8 p-0"
          title="Limpar filtros"
        >
          <FilterX className="h-3 w-3" />
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleUpdate}
          className="h-8 w-8 p-0"
          title="Atualizar"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

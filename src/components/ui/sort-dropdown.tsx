
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SortDropdownProps {
  options: SortOption[];
  currentSort: string;
  currentOrder: "asc" | "desc";
  onSortChange: (sort: string, order: "asc" | "desc") => void;
  className?: string;
}

export function SortDropdown({ options, currentSort, currentOrder, onSortChange, className }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = options.find(opt => opt.value === currentSort);

  const handleSortSelect = (sortValue: string) => {
    if (sortValue === currentSort) {
      // Toggle order if same field
      onSortChange(sortValue, currentOrder === "asc" ? "desc" : "asc");
    } else {
      // New field, default to desc
      onSortChange(sortValue, "desc");
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("h-8 gap-2 text-xs sm:text-sm", className)}
        >
          <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Ordenar</span>
          {currentOption && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground truncate max-w-20">
                {currentOption.label}
              </span>
              {currentOrder === "asc" ? (
                <ArrowUp className="h-3 w-3 text-primary" />
              ) : (
                <ArrowDown className="h-3 w-3 text-primary" />
              )}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-background/95 backdrop-blur-sm border border-border/50">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSortSelect(option.value)}
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              {option.icon}
              <span className="text-sm">{option.label}</span>
            </div>
            {currentSort === option.value && (
              <div className="flex items-center gap-1">
                {currentOrder === "asc" ? (
                  <ArrowUp className="h-3 w-3 text-primary" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-primary" />
                )}
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

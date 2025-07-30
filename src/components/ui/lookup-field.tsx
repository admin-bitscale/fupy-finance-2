
import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LookupOption {
  id: string;
  name: string;
  color?: string;
  description?: string;
}

interface LookupFieldProps {
  options: LookupOption[];
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  placeholder?: string;
  emptyText?: string;
  multiple?: boolean;
  className?: string;
}

export function LookupField({
  options,
  selected,
  onSelectionChange,
  placeholder = "Selecionar...",
  emptyText = "Nenhum resultado encontrado.",
  multiple = true,
  className
}: LookupFieldProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (optionId: string) => {
    if (multiple) {
      const newSelected = selected.includes(optionId)
        ? selected.filter(id => id !== optionId)
        : [...selected, optionId];
      onSelectionChange(newSelected);
    } else {
      onSelectionChange([optionId]);
      setOpen(false);
    }
  };

  const removeItem = (optionId: string) => {
    onSelectionChange(selected.filter(id => id !== optionId));
  };

  const getSelectedOptions = () => {
    return options.filter(option => selected.includes(option.id));
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-[2.5rem] p-2"
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {selected.length === 0 ? (
                <span className="text-muted-foreground text-sm">{placeholder}</span>
              ) : (
                getSelectedOptions().map((option) => (
                  <Badge
                    key={option.id}
                    variant="secondary"
                    className="text-xs flex items-center gap-1"
                  >
                    {option.color && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: option.color }}
                      />
                    )}
                    {option.name}
                    <X
                      className="h-3 w-3 cursor-pointer hover:bg-muted rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(option.id);
                      }}
                    />
                  </Badge>
                ))
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 z-[200]" align="start">
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.name}
                    onSelect={() => handleSelect(option.id)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(option.id) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.color && (
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: option.color }}
                      />
                    )}
                    <div>
                      <div className="font-medium">{option.name}</div>
                      {option.description && (
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

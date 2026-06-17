import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SimpleSelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

interface SimpleSelectTriggerProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

interface SimpleSelectContentProps {
  children: React.ReactNode;
}

interface SimpleSelectItemProps {
  value: string;
  children: React.ReactNode;
}

let currentSelectContext: {
  value: string;
  setValue: (value: string) => void;
  setOpen: (open: boolean) => void;
} | null = null;

export function SimpleSelect({ value, defaultValue, onValueChange, children }: SimpleSelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || value || "");
  const [isOpen, setIsOpen] = useState(false);

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  currentSelectContext = {
    value: value || internalValue,
    setValue: handleValueChange,
    setOpen: setIsOpen,
  };

  return (
    <div className="relative">
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export function SimpleSelectTrigger({ id, className = "", children }: SimpleSelectTriggerProps) {
  return (
    <button
      id={id}
      type="button"
      onClick={() => currentSelectContext?.setOpen(true)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

export function SimpleSelectValue() {
  const displayValue = currentSelectContext?.value || "";
  return <span>{displayValue}</span>;
}

export function SimpleSelectContent({ children }: SimpleSelectContentProps) {
  return (
    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md">
      {children}
    </div>
  );
}

export function SimpleSelectItem({ value, children }: SimpleSelectItemProps) {
  const isSelected = currentSelectContext?.value === value;
  
  return (
    <div
      onClick={() => currentSelectContext?.setValue(value)}
      className={`relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-hidden hover:bg-accent hover:text-accent-foreground ${
        isSelected ? "bg-accent text-accent-foreground" : ""
      }`}
    >
      {children}
    </div>
  );
}

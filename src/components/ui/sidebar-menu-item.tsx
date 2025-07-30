
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarMenuItemProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  collapsed?: boolean;
}

export function SidebarMenuItemWithDroplet({ to, icon: Icon, children, collapsed }: SidebarMenuItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative group",
        isActive
          ? "bg-primary/10 text-primary font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-primary before:rounded-r-full"
          : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && (
        <span className="truncate transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden">
          {children}
        </span>
      )}
    </NavLink>
  );
}

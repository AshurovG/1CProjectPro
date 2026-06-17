interface SimpleSidebarProps {
  children: React.ReactNode;
}

export function SimpleSidebarProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SimpleSidebar({ children }: SimpleSidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col border-r bg-background">
      {children}
    </aside>
  );
}

export function SimpleSidebarHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function SimpleSidebarContent({ children }: SimpleSidebarProps) {
  return <div className="flex-1 overflow-auto">{children}</div>;
}

export function SimpleSidebarFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function SimpleSidebarGroup({ children }: SimpleSidebarProps) {
  return <div className="px-3 py-2">{children}</div>;
}

export function SimpleSidebarGroupLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 px-3 text-xs uppercase text-muted-foreground">{children}</div>;
}

export function SimpleSidebarGroupContent({ children }: SimpleSidebarProps) {
  return <div>{children}</div>;
}

export function SimpleSidebarMenu({ children }: SimpleSidebarProps) {
  return <div className="space-y-1">{children}</div>;
}

export function SimpleSidebarMenuItem({ children }: SimpleSidebarProps) {
  return <div>{children}</div>;
}

interface SimpleSidebarMenuButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function SimpleSidebarMenuButton({ 
  onClick, 
  isActive, 
  className = "",
  children 
}: SimpleSidebarMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
        isActive ? "bg-accent text-accent-foreground" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}

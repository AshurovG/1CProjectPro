interface SimpleAvatarProps {
  children: React.ReactNode;
  className?: string;
}

export function SimpleAvatar({ children, className = "" }: SimpleAvatarProps) {
  return (
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted ${className}`}>
      {children}
    </div>
  );
}

export function SimpleAvatarFallback({ children, className = "" }: SimpleAvatarProps) {
  return (
    <div className={`flex h-full w-full items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

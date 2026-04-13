import { type ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "primary" | "destructive" | "warning" | "success";
}

const variantStyles = {
  default: "border-border/50",
  primary: "border-primary/30",
  destructive: "border-destructive/30",
  warning: "border-warning/30",
  success: "border-success/30",
};

const valueStyles = {
  default: "text-foreground",
  primary: "text-primary",
  destructive: "text-destructive",
  warning: "text-warning",
  success: "text-success",
};

export function KpiCard({ title, value, subtitle, icon, variant = "default" }: KpiCardProps) {
  return (
    <div className={`glass-card p-5 ${variantStyles[variant]} transition-all hover:scale-[1.02] hover:border-primary/40`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <p className={`text-3xl font-display font-bold ${valueStyles[variant]} stat-glow`}>{value}</p>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}

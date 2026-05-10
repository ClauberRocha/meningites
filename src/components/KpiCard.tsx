import { type ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "primary" | "destructive" | "warning" | "success";
  /** Variação percentual vs período anterior. Positivo = aumento. */
  deltaPct?: number;
  /** Para KPIs onde "subir" é ruim (ex: confirmados, óbitos), passe true. */
  higherIsWorse?: boolean;
  deltaLabel?: string;
  /**
   * Quando true, a cor do card (variant) é derivada automaticamente do deltaPct:
   * - higherIsWorse=true:  > +10% → destructive · −10% a +10% → warning · < −10% → success
   * - higherIsWorse=false: invertido
   * Útil para KPIs como Confirmados/Notificados/Em Investigação cujo "estado" depende da tendência.
   */
  situational?: boolean;
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

export function KpiCard({ title, value, subtitle, icon, variant = "default", deltaPct, higherIsWorse = true, deltaLabel = "vs anterior", situational = false }: KpiCardProps) {
  const hasDelta = typeof deltaPct === "number";
  const isUp = hasDelta && deltaPct! > 0;
  const isDown = hasDelta && deltaPct! < 0;

  // Variant situacional: deriva da variação percentual
  let effectiveVariant = variant;
  if (situational && hasDelta) {
    const d = deltaPct!;
    const worsened = higherIsWorse ? d > 10 : d < -10;
    const improved = higherIsWorse ? d < -10 : d > 10;
    effectiveVariant = worsened ? "destructive" : improved ? "success" : "warning";
  }

  const deltaTone =
    !hasDelta || deltaPct === 0
      ? "text-muted-foreground"
      : higherIsWorse
      ? isUp
        ? "text-destructive"
        : "text-success"
      : isUp
      ? "text-success"
      : "text-destructive";
  const DeltaIcon = !hasDelta || deltaPct === 0 ? Minus : isUp ? TrendingUp : TrendingDown;
  const isAlert = effectiveVariant === "destructive" && hasDelta && (higherIsWorse ? isUp : isDown);
  return (
    <div
      className={`glass-card glass-card-hover p-5 ${variantStyles[effectiveVariant]} animate-fade-in-up group ${
        isAlert ? "animate-pulse-danger" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</span>
        {icon && (
          <span className="text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110">
            {icon}
          </span>
        )}
      </div>
      <p className={`text-3xl font-display font-bold ${valueStyles[effectiveVariant]} stat-glow transition-transform duration-300 group-hover:translate-x-0.5`}>
        {value}
      </p>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      {hasDelta && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${deltaTone}`}>
          <DeltaIcon className="w-3.5 h-3.5" />
          <span>{isUp ? "+" : ""}{deltaPct}%</span>
          <span className="text-muted-foreground font-normal">{deltaLabel}</span>
        </div>
      )}
    </div>
  );
}

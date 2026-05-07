import { TrendingDown, TrendingUp, Minus, AlertTriangle, Calendar, BarChart3 } from "lucide-react";

type Trend = "up" | "down" | "stable";
type Level = "low" | "medium" | "high";

interface ExecutiveSummaryProps {
  trend?: Trend;
  level?: Level;
  yoyPct?: number; // positive = aumento vs ano anterior
  criticalWeek?: string;
  headline?: string;
}

const trendMap = {
  up: { label: "Aumento", color: "text-destructive", bg: "bg-destructive/10 border-destructive/30", Icon: TrendingUp },
  stable: { label: "Estável", color: "text-warning", bg: "bg-warning/10 border-warning/30", Icon: Minus },
  down: { label: "Queda", color: "text-success", bg: "bg-success/10 border-success/30", Icon: TrendingDown },
};

const levelMap = {
  low: { label: "Baixo", color: "text-success", bg: "bg-success/10 border-success/30", dot: "bg-success" },
  medium: { label: "Médio", color: "text-warning", bg: "bg-warning/10 border-warning/30", dot: "bg-warning" },
  high: { label: "Alto", color: "text-destructive", bg: "bg-destructive/10 border-destructive/30", dot: "bg-destructive" },
};

export function ExecutiveSummary({
  trend = "down",
  level = "medium",
  yoyPct = -20,
  criticalWeek = "SE 14",
  headline = "32 casos confirmados em 17 semanas; pico recente em SE 14 com 6 confirmados; queda nas últimas semanas com taxa de mortalidade ainda elevada (19%).",
}: ExecutiveSummaryProps) {
  const t = trendMap[trend];
  const l = levelMap[level];
  const yoyUp = yoyPct > 0;
  const yoyColor = yoyUp ? "text-destructive" : yoyPct < 0 ? "text-success" : "text-warning";
  const YoyIcon = yoyUp ? TrendingUp : yoyPct < 0 ? TrendingDown : Minus;

  return (
    <div className="glass-card p-6 md:p-7 border-2 border-primary/30">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium uppercase tracking-widest text-primary">Resumo Executivo</span>
        <div className={`w-2 h-2 rounded-full ${l.dot} animate-pulse`} />
      </div>
      <p className="text-sm md:text-base text-foreground mb-5 leading-relaxed">{headline}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className={`rounded-lg border p-4 ${t.bg}`}>
          <div className="flex items-center gap-2 mb-1">
            <t.Icon className={`w-4 h-4 ${t.color}`} />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Tendência</span>
          </div>
          <p className={`text-xl font-display font-bold ${t.color}`}>{t.label}</p>
        </div>

        <div className={`rounded-lg border p-4 ${l.bg}`}>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className={`w-4 h-4 ${l.color}`} />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Nível de Alerta</span>
          </div>
          <p className={`text-xl font-display font-bold ${l.color}`}>{l.label}</p>
        </div>

        <div className={`rounded-lg border p-4 ${yoyUp ? "bg-destructive/10 border-destructive/30" : yoyPct < 0 ? "bg-success/10 border-success/30" : "bg-warning/10 border-warning/30"}`}>
          <div className="flex items-center gap-2 mb-1">
            <YoyIcon className={`w-4 h-4 ${yoyColor}`} />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">vs Ano Anterior</span>
          </div>
          <p className={`text-xl font-display font-bold ${yoyColor}`}>{yoyPct > 0 ? "+" : ""}{yoyPct}%</p>
        </div>

        <div className="rounded-lg border border-warning/30 bg-warning/10 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-warning" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Semana Crítica</span>
          </div>
          <p className="text-xl font-display font-bold text-warning">{criticalWeek}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
        <BarChart3 className="w-3.5 h-3.5" />
        <span>Indicadores baseados nos casos confirmados de meningite — SE 01 a SE 17 / 2026.</span>
      </div>
    </div>
  );
}
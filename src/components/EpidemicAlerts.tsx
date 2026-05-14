import { AlertTriangle, AlertCircle, Info, CheckCircle2, TrendingUp } from "lucide-react";

type Severity = "critical" | "warning" | "info" | "control";

interface Alert {
  severity: Severity;
  title: string;
  message: string;
  Icon: typeof AlertTriangle;
}

const severityMap: Record<Severity, { label: string; color: string; bg: string; border: string; dot: string }> = {
  critical: { label: "Crítico", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/40", dot: "bg-destructive" },
  warning: { label: "Atenção", color: "text-warning", bg: "bg-warning/10", border: "border-warning/40", dot: "bg-warning" },
  info: { label: "Informativo", color: "text-info", bg: "bg-info/10", border: "border-info/40", dot: "bg-info" },
  control: { label: "Controle", color: "text-success", bg: "bg-success/10", border: "border-success/40", dot: "bg-success" },
};

// Máximo de 5 alertas simultâneos, ordenados por severidade
const alerts: Alert[] = [
  {
    severity: "critical",
    title: "Crescimento de casos",
    message: "Notificações saltaram de 12 (SE 11) para 17 (SE 14) — alta de 42%.",
    Icon: TrendingUp,
  },
  {
    severity: "critical",
    title: "Letalidade elevada",
    message: "12 óbitos por meningite em 44 confirmados — letalidade de 27%.",
    Icon: AlertTriangle,
  },
  {
    severity: "critical",
    title: "Possível concentração",
    message: "São Luís concentra 34% dos casos confirmados (15 de 44).",
    Icon: AlertCircle,
  },
  {
    severity: "warning",
    title: "Tendência preocupante",
    message: "Faixa etária <1 ano apresentou 27% dos confirmados (12 casos) — vigilância reforçada.",
    Icon: AlertTriangle,
  },
  {
    severity: "warning",
    title: "Predomínio bacteriano",
    message: "80% das confirmações são bacterianas (35 de 44) — reforçar quimioprofilaxia.",
    Icon: AlertCircle,
  },
];

export function EpidemicAlerts() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-1">
        <AlertTriangle className="w-4 h-4 text-warning" />
        <h3 className="font-display font-semibold text-foreground">Alertas Epidemiológicos</h3>
        <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
          {alerts.length} ativos
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Monitoramento automático — máximo 5 alertas simultâneos</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {alerts.map((a, i) => {
          const s = severityMap[a.severity];
          return (
            <div
              key={i}
              className={`relative rounded-lg border ${s.border} ${s.bg} p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg animate-fade-in-up`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
                <span className={`text-[9px] font-bold uppercase tracking-wider ${s.color}`}>{s.label}</span>
                <a.Icon className={`w-3.5 h-3.5 ${s.color} ml-auto`} />
              </div>
              <p className="text-xs font-semibold text-foreground mb-1 leading-snug">{a.title}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{a.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
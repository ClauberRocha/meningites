import { Crown, AlertTriangle, Flame, ShieldCheck, Activity } from "lucide-react";

const totalMun = 32;
// raw inputs por município: casos confirmados, crescimento recente (%), óbitos, tempo médio de encerramento (dias)
const rawMunicipalities = [
  { name: "São Luís", value: 14, growth: 35, deaths: 3, closureDays: 55 },
  { name: "Outros", value: 2, growth: 5, deaths: 0, closureDays: 50 },
  { name: "Bacabeira", value: 1, growth: 0, deaths: 0, closureDays: 45 },
  { name: "Bacabal", value: 1, growth: 10, deaths: 1, closureDays: 60 },
  { name: "Amarante do Maranhão", value: 1, growth: 0, deaths: 0, closureDays: 40 },
  { name: "São José de Ribamar", value: 1, growth: 15, deaths: 0, closureDays: 50 },
  { name: "Nova Olinda do Maranhão", value: 1, growth: 0, deaths: 0, closureDays: 50 },
  { name: "Viana", value: 1, growth: 0, deaths: 0, closureDays: 45 },
  { name: "Urbano Santos", value: 1, growth: 0, deaths: 0, closureDays: 50 },
  { name: "Poção de Pedras", value: 1, growth: 0, deaths: 0, closureDays: 55 },
  { name: "Caxias", value: 1, growth: 8, deaths: 1, closureDays: 65 },
  { name: "Santa Inês", value: 1, growth: 0, deaths: 0, closureDays: 50 },
  { name: "São Luís Gonzaga do Maranhão", value: 1, growth: 0, deaths: 0, closureDays: 70 },
  { name: "Jenipapo dos Vieiras", value: 1, growth: 0, deaths: 0, closureDays: 60 },
  { name: "Raposa", value: 1, growth: 0, deaths: 0, closureDays: 45 },
  { name: "Alcântara", value: 1, growth: 0, deaths: 0, closureDays: 50 },
  { name: "Presidente Juscelino", value: 1, growth: 0, deaths: 0, closureDays: 55 },
  { name: "Bequimão", value: 1, growth: 0, deaths: 0, closureDays: 50 },
];

// Normaliza valor entre 0-100
const norm = (v: number, max: number) => (max > 0 ? Math.min(100, (v / max) * 100) : 0);

const maxCases = Math.max(...rawMunicipalities.map((m) => m.value));
const maxGrowth = Math.max(...rawMunicipalities.map((m) => m.growth), 1);
const maxDeaths = Math.max(...rawMunicipalities.map((m) => m.deaths), 1);
const maxClosure = Math.max(...rawMunicipalities.map((m) => m.closureDays), 60);

type RiskLevel = "high" | "medium" | "low";
const riskMeta: Record<RiskLevel, { label: string; color: string; bg: string; ring: string; dot: string; Icon: typeof Flame }> = {
  high:   { label: "🔴 Alto",  color: "text-destructive", bg: "bg-destructive/10",  ring: "ring-destructive/40", dot: "bg-destructive",  Icon: Flame },
  medium: { label: "🟡 Médio", color: "text-warning",     bg: "bg-warning/10",      ring: "ring-warning/40",     dot: "bg-warning",      Icon: Activity },
  low:    { label: "🟢 Baixo", color: "text-success",     bg: "bg-success/10",      ring: "ring-success/30",     dot: "bg-success",      Icon: ShieldCheck },
};

const municipalities = rawMunicipalities.map((m) => {
  const score = Math.round(
    norm(m.value, maxCases) * 0.4 +
    norm(m.growth, maxGrowth) * 0.3 +
    norm(m.deaths, maxDeaths) * 0.2 +
    norm(m.closureDays, maxClosure) * 0.1
  );
  const risk: RiskLevel = score >= 60 ? "high" : score >= 35 ? "medium" : "low";
  return { ...m, pct: Math.round((m.value / totalMun) * 100), score, risk };
});

// ordena por score (risco) decrescente
municipalities.sort((a, b) => b.score - a.score);

export function MunicipalityChart() {
  const maxValue = Math.max(...municipalities.map((m) => m.value));
  const top = municipalities[0];
  const concentrationLeader = top.pct >= 30;
  const counts = {
    high: municipalities.filter((m) => m.risk === "high").length,
    medium: municipalities.filter((m) => m.risk === "medium").length,
    low: municipalities.filter((m) => m.risk === "low").length,
  };

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Risco Epidemiológico por Município</h3>
      <p className="text-xs text-muted-foreground mb-3">
        Score: 40% casos · 30% crescimento · 20% óbitos · 10% tempo de encerramento
      </p>

      {/* Resumo de risco */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {(["high", "medium", "low"] as RiskLevel[]).map((lvl) => {
          const r = riskMeta[lvl];
          return (
            <div key={lvl} className={`p-2 rounded-lg border ${r.bg} border-border/40 flex items-center gap-2`}>
              <r.Icon className={`w-4 h-4 ${r.color}`} />
              <div className="leading-tight">
                <p className={`text-sm font-bold ${r.color}`}>{counts[lvl]}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{r.label.replace(/^[^\s]+\s/, "")}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Banner de outlier / concentração */}
      <div className={`mb-4 p-3 rounded-lg border flex items-start gap-2 ${concentrationLeader ? "bg-destructive/10 border-destructive/30" : "bg-info/10 border-info/30"}`}>
        {concentrationLeader ? (
          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
        ) : (
          <Crown className="w-4 h-4 text-info mt-0.5 shrink-0" />
        )}
        <p className={`text-xs leading-relaxed ${concentrationLeader ? "text-destructive" : "text-info"}`}>
          <span className="font-semibold">{top.name}</span> concentra{" "}
          <span className="font-bold">{top.pct}%</span> dos casos confirmados ({top.value} de {totalMun}).
          {concentrationLeader && " Concentração crítica — priorizar ações de bloqueio."}
        </p>
      </div>

      <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
        {municipalities.map((m) => {
          const isTop = m.name === top.name;
          const r = riskMeta[m.risk];
          const barColor = m.risk === "high" ? "bg-destructive" : m.risk === "medium" ? "bg-warning" : "bg-success";
          return (
            <div
              key={m.name}
              className={`flex items-center gap-3 rounded-md px-2 py-1 ${r.bg} ring-1 ${r.ring}`}
              title={`Score ${m.score}/100 · ${m.value} casos · crescimento ${m.growth}% · ${m.deaths} óbito(s) · ${m.closureDays}d encerramento`}
            >
              <span className={`text-xs w-44 truncate shrink-0 flex items-center gap-1 ${isTop ? "text-destructive font-semibold" : "text-foreground"}`}>
                {isTop && <Crown className="w-3 h-3 text-destructive" />}
                {m.name}
              </span>
              <div className="flex-1 h-4 bg-secondary/50 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${barColor}`} style={{ width: `${m.score}%` }} />
              </div>
              <span className={`text-[11px] font-bold w-9 text-right ${r.color}`}>{m.score}</span>
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${r.color} border-current/30 shrink-0`}>
                {r.label}
              </span>
              <span className="text-[10px] text-muted-foreground w-14 text-right shrink-0">{m.value}c · {m.pct}%</span>
            </div>
          );
        })}
      </div>

      {concentrationLeader && (
        <div className="mt-3 p-2 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
          <p className="text-[11px] text-destructive leading-relaxed">
            <span className="font-semibold">{top.name}</span> concentra <span className="font-bold">{top.pct}%</span> dos casos —
            score de risco <span className="font-bold">{top.score}/100</span>. Priorizar bloqueio e quimioprofilaxia.
          </p>
        </div>
      )}
    </div>
  );
}

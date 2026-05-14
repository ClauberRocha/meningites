import { Flame, Activity, ShieldCheck, ArrowUp, ArrowDown, ArrowRight } from "lucide-react";

const total = 44;

// dados base por regional + crescimento recente (%), óbitos e tempo médio de resposta (dias)
const regions = [
  { name: "Metropolitana",  value: 21, growth: 28, deaths: 6, responseDays: 24 },
  { name: "Rosário",        value: 5,  growth: 15, deaths: 1, responseDays: 30 },
  { name: "Imperatriz",     value: 4,  growth: 12, deaths: 1, responseDays: 25 },
  { name: "Bacabal",        value: 2,  growth: 10, deaths: 1, responseDays: 32 },
  { name: "Caxias",         value: 2,  growth: 8,  deaths: 1, responseDays: 19 },
  { name: "Outro Estado",   value: 2,  growth: 0,  deaths: 0, responseDays: 30 },
  { name: "Zé Doca",        value: 1,  growth: 5,  deaths: 0, responseDays: 70 },
  { name: "Viana",          value: 1,  growth: 0,  deaths: 0, responseDays: 30 },
  { name: "Itapecuru",      value: 1,  growth: 0,  deaths: 0, responseDays: 30 },
  { name: "Pedreiras",      value: 1,  growth: 0,  deaths: 0, responseDays: 30 },
  { name: "Santa Inês",     value: 1,  growth: 0,  deaths: 0, responseDays: 25 },
  { name: "S.J. dos Patos", value: 1,  growth: 0,  deaths: 0, responseDays: 30 },
  { name: "Barra do Corda", value: 1,  growth: 0,  deaths: 0, responseDays: 30 },
  { name: "Pinheiro",       value: 1,  growth: 0,  deaths: 0, responseDays: 30 },
];

type RiskLevel = "high" | "medium" | "low";
const maxCases = Math.max(...regions.map((r) => r.value));
const maxGrowth = Math.max(...regions.map((r) => Math.abs(r.growth)), 1);
const maxDeaths = Math.max(...regions.map((r) => r.deaths), 1);

const norm = (v: number, max: number) => (max > 0 ? Math.min(100, (v / max) * 100) : 0);

const scored = regions.map((r) => {
  const score = Math.round(
    norm(r.value, maxCases) * 0.5 +
    norm(Math.max(r.growth, 0), maxGrowth) * 0.3 +
    norm(r.deaths, maxDeaths) * 0.2
  );
  const risk: RiskLevel = score >= 60 ? "high" : score >= 30 ? "medium" : "low";
  const trend: "up" | "down" | "flat" = r.growth >= 10 ? "up" : r.growth <= -5 ? "down" : "flat";
  return { ...r, score, risk, trend };
});

const riskMeta: Record<RiskLevel, { label: string; tile: string; text: string; Icon: typeof Flame }> = {
  high:   { label: "🔴 Alto",  tile: "bg-destructive/20 border-destructive/40", text: "text-destructive", Icon: Flame },
  medium: { label: "🟡 Médio", tile: "bg-warning/15 border-warning/30",         text: "text-warning",     Icon: Activity },
  low:    { label: "🟢 Baixo", tile: "bg-success/10 border-success/30",         text: "text-success",     Icon: ShieldCheck },
};

const trendMeta = {
  up:   { Icon: ArrowUp,    color: "text-destructive", label: "Subindo" },
  down: { Icon: ArrowDown,  color: "text-success",     label: "Caindo" },
  flat: { Icon: ArrowRight, color: "text-muted-foreground", label: "Estável" },
} as const;

export function GeographicHeatmap() {
  const ranking = [...scored].sort((a, b) => b.score - a.score);
  const counts = {
    high: scored.filter((r) => r.risk === "high").length,
    medium: scored.filter((r) => r.risk === "medium").length,
    low: scored.filter((r) => r.risk === "low").length,
  };

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Mapa de Risco — Regionais de Saúde</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Classificação por nível de risco (casos · crescimento · óbitos) — responde "onde agir agora?"
      </p>

      {/* Resumo de risco */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {(["high", "medium", "low"] as RiskLevel[]).map((lvl) => {
          const m = riskMeta[lvl];
          return (
            <div key={lvl} className={`p-2 rounded-lg border ${m.tile} flex items-center gap-2`}>
              <m.Icon className={`w-4 h-4 ${m.text}`} />
              <div className="leading-tight">
                <p className={`text-sm font-bold ${m.text}`}>{counts[lvl]}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label.replace(/^[^\s]+\s/, "")}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tiles do mapa */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
        {scored.map((r) => {
          const m = riskMeta[r.risk];
          const t = trendMeta[r.trend];
          return (
            <div
              key={r.name}
              className={`rounded-xl p-3 text-center border transition-all hover:scale-105 ${m.tile}`}
              title={`Score ${r.score}/100 · ${r.value} casos · crescimento ${r.growth}% · ${r.deaths} óbito(s) · ${r.responseDays}d resposta`}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <m.Icon className={`w-3 h-3 ${m.text}`} />
                <p className={`text-[11px] font-semibold ${m.text} truncate`}>{r.name}</p>
              </div>
              <p className={`text-2xl font-display font-bold ${m.text}`}>{r.value}</p>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <p className="text-[10px] text-muted-foreground">{((r.value / total) * 100).toFixed(0)}%</p>
                <t.Icon className={`w-3 h-3 ${t.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Ranking */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Ranking de regionais críticas</p>
        <div className="overflow-hidden rounded-lg border border-border/40">
          <table className="w-full text-xs">
            <thead className="bg-secondary/40 text-muted-foreground">
              <tr>
                <th className="text-left px-3 py-2 font-medium">#</th>
                <th className="text-left px-3 py-2 font-medium">Regional</th>
                <th className="text-left px-3 py-2 font-medium">Risco</th>
                <th className="text-right px-3 py-2 font-medium">Score</th>
                <th className="text-right px-3 py-2 font-medium">Casos</th>
                <th className="text-right px-3 py-2 font-medium">Tempo Resp.</th>
                <th className="text-center px-3 py-2 font-medium">Tendência</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((r, i) => {
                const m = riskMeta[r.risk];
                const t = trendMeta[r.trend];
                return (
                  <tr key={r.name} className="border-t border-border/30 hover:bg-secondary/20">
                    <td className="px-3 py-2 text-muted-foreground">{i + 1}</td>
                    <td className="px-3 py-2 font-medium text-foreground">{r.name}</td>
                    <td className={`px-3 py-2 font-semibold ${m.text}`}>{m.label}</td>
                    <td className={`px-3 py-2 text-right font-bold ${m.text}`}>{r.score}</td>
                    <td className="px-3 py-2 text-right text-foreground">{r.value}</td>
                    <td className="px-3 py-2">
                      <span className={`flex items-center justify-center gap-1 ${t.color}`}>
                        <t.Icon className="w-3.5 h-3.5" />
                        <span className="text-[10px] uppercase tracking-wider">{t.label}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
        <p className="text-xs text-destructive">
          <span className="font-semibold">Onde agir agora:</span> {ranking[0].name} — score {ranking[0].score}/100,
          {" "}{ranking[0].value} casos ({((ranking[0].value / total) * 100).toFixed(0)}% do total) e tendência {trendMeta[ranking[0].trend].label.toLowerCase()}.
        </p>
      </div>
    </div>
  );
}

import { Target, AlertCircle, Activity } from "lucide-react";

const recommendations = [
  {
    priority: "Alta",
    color: "destructive",
    text: "Intensificar investigação em São Luís (44% dos confirmados).",
  },
  {
    priority: "Alta",
    color: "destructive",
    text: "Reduzir tempo médio de encerramento — 70 dias na Regional Zé Doca, acima do recomendado.",
  },
  {
    priority: "Média",
    color: "warning",
    text: "Focar vacinação meningocócica em menores de 1 ano (28% dos casos confirmados).",
  },
  {
    priority: "Média",
    color: "warning",
    text: "Reforçar quimioprofilaxia para contatos de casos bacterianos (75% dos confirmados).",
  },
  {
    priority: "Baixa",
    color: "success",
    text: "Manter monitoramento de cobertura vacinal — metas atingidas em diversas vacinas em 2026.",
  },
];

const municipalityRisk = [
  { name: "São Luís", cases: 14, risk: "high" as const, reason: "44% dos confirmados, crescimento acumulado" },
  { name: "São José de Ribamar", cases: 1, risk: "medium" as const, reason: "Região metropolitana — vigilância reforçada" },
  { name: "Bacabal", cases: 1, risk: "medium" as const, reason: "Histórico recorrente na regional" },
  { name: "Caxias", cases: 1, risk: "medium" as const, reason: "Casos isolados em monitoramento" },
  { name: "Demais municípios", cases: 1, risk: "low" as const, reason: "Casos pontuais sem aglomeração" },
];

const riskMap = {
  high: { label: "🔴 Alto", color: "text-destructive", bg: "bg-destructive/10 border-destructive/30" },
  medium: { label: "🟡 Médio", color: "text-warning", bg: "bg-warning/10 border-warning/30" },
  low: { label: "🟢 Baixo", color: "text-success", bg: "bg-success/10 border-success/30" },
};

const priorityColors: Record<string, string> = {
  destructive: "bg-destructive/15 text-destructive border-destructive/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  success: "bg-success/15 text-success border-success/30",
};

export function ActionPanel() {
  // Pressão epidemiológica: casos ativos 42 em invest., crescimento estável, tempo resposta alto → Moderada
  const pressure = { label: "Moderada", color: "text-warning", bg: "bg-warning/10 border-warning/30", dot: "bg-warning" };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-1">
          <Target className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">Painel de Ação</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Recomendações automáticas priorizadas</p>
        <ul className="space-y-2.5">
          {recommendations.map((r, i) => (
            <li key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-secondary/30 border border-border/40">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${priorityColors[r.color]} shrink-0`}>
                {r.priority}
              </span>
              <span className="text-xs text-foreground leading-relaxed">{r.text}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-4 p-4 rounded-lg border-2 ${pressure.bg}`}>
          <div className="flex items-center gap-2 mb-1">
            <Activity className={`w-4 h-4 ${pressure.color}`} />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Pressão Epidemiológica</span>
            <div className={`w-2 h-2 rounded-full ${pressure.dot} animate-pulse ml-auto`} />
          </div>
          <p className={`text-lg font-display font-bold ${pressure.color}`}>{pressure.label}</p>
          <p className="text-[11px] text-muted-foreground mt-1">
            42 casos ativos em investigação · crescimento estável · tempo de resposta acima do recomendado em 1 regional.
          </p>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle className="w-4 h-4 text-warning" />
          <h3 className="font-display font-semibold text-foreground">Classificação de Risco — Municípios</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Baseado em casos recentes, crescimento e óbitos</p>
        <ul className="space-y-2">
          {municipalityRisk.map((m) => {
            const r = riskMap[m.risk];
            return (
              <li key={m.name} className={`flex items-center gap-3 p-3 rounded-lg border ${r.bg}`}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{m.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{m.reason}</p>
                </div>
                <span className={`text-xs font-bold ${r.color}`}>{r.label}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Critério: ≥5 casos confirmados ou óbito recente → <span className="text-destructive font-semibold">Alto</span> · 1–4 casos em região metropolitana → <span className="text-warning font-semibold">Médio</span> · casos isolados → <span className="text-success font-semibold">Baixo</span>.
        </p>
      </div>
    </div>
  );
}
import { Siren, Syringe, Timer, Hospital, ClipboardList } from "lucide-react";

type Category = "vigilancia" | "imunizacao" | "operacional" | "assistencia";
type Priority = "alta" | "media" | "baixa";

interface Recommendation {
  category: Category;
  priority: Priority;
  action: string;
  context: string;
}

const categoryMeta: Record<Category, { label: string; icon: typeof Siren; emoji: string; color: string; bg: string; border: string }> = {
  vigilancia: {
    label: "Vigilância",
    icon: Siren,
    emoji: "🚨",
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
  },
  imunizacao: {
    label: "Imunização",
    icon: Syringe,
    emoji: "💉",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
  operacional: {
    label: "Operacional",
    icon: Timer,
    emoji: "⏱️",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
  },
  assistencia: {
    label: "Assistência",
    icon: Hospital,
    emoji: "🏥",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/30",
  },
};

const priorityMeta: Record<Priority, { label: string; cls: string }> = {
  alta: { label: "Alta", cls: "bg-destructive/15 text-destructive border-destructive/30" },
  media: { label: "Média", cls: "bg-warning/15 text-warning border-warning/30" },
  baixa: { label: "Baixa", cls: "bg-success/15 text-success border-success/30" },
};

const recommendations: Recommendation[] = [
  { category: "vigilancia", priority: "alta", action: "Intensificar investigação em São Luís.", context: "44% dos confirmados — crescimento sustentado" },
  { category: "vigilancia", priority: "media", action: "Reforçar busca ativa na Regional Zé Doca.", context: "Casos suspeitos sem encerramento há >60 dias" },
  { category: "imunizacao", priority: "alta", action: "Ampliar cobertura vacinal em menores de 1 ano.", context: "28% dos confirmados — grupo crítico" },
  { category: "imunizacao", priority: "media", action: "Quimioprofilaxia para contatos de casos bacterianos.", context: "75% das confirmações são bacterianas" },
  { category: "operacional", priority: "alta", action: "Reduzir tempo de encerramento na Regional Zé Doca.", context: "70 dias — acima do recomendado (60d)" },
  { category: "operacional", priority: "media", action: "Padronizar fluxo de notificação semanal.", context: "52% dos casos seguem em aberto" },
  { category: "assistencia", priority: "alta", action: "Monitorar leitos em hospitais de referência de São Luís.", context: "Concentração de casos graves na capital" },
  { category: "assistencia", priority: "baixa", action: "Manter protocolos de manejo clínico atualizados.", context: "Letalidade em queda (-25% vs sem. anterior)" },
];

const order: Category[] = ["vigilancia", "imunizacao", "operacional", "assistencia"];

export function StrategicRecommendations() {
  const grouped = order.map((cat) => ({
    cat,
    items: recommendations.filter((r) => r.category === cat),
  }));

  const totalAlta = recommendations.filter((r) => r.priority === "alta").length;

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">Recomendações Estratégicas</h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-destructive/15 text-destructive border-destructive/30 shrink-0">
          {totalAlta} ações prioritárias
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Ações executivas geradas a partir de tendência, risco, perfil etário e tempo operacional</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {grouped.map(({ cat, items }) => {
          const meta = categoryMeta[cat];
          const Icon = meta.icon;
          return (
            <div key={cat} className={`p-4 rounded-lg border ${meta.bg} ${meta.border}`}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-4 h-4 ${meta.color}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${meta.color}`}>
                  {meta.emoji} {meta.label}
                </span>
              </div>
              <ul className="space-y-2">
                {items.map((r, i) => {
                  const p = priorityMeta[r.priority];
                  return (
                    <li key={i} className="p-2.5 rounded-md bg-background/40 border border-border/40">
                      <div className="flex items-start gap-2">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${p.cls} shrink-0 mt-0.5`}>
                          {p.label}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-foreground leading-snug">{r.action}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{r.context}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
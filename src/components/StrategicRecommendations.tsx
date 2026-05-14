import { Siren, Syringe, Timer, Hospital, ClipboardList, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";

type Category = "vigilancia" | "imunizacao" | "operacional" | "assistencia";
type Priority = "alta" | "media" | "baixa";
type TrendDir = "up" | "down" | "flat";

interface TrendSignal {
  id: string;
  label: string;
  metric: string;
  direction: TrendDir;
  deltaPct: number;
  /** Texto curto descrevendo o gatilho ("3 sem. consecutivas em alta") */
  trigger: string;
  category: Category;
  priority: Priority;
  action: string;
}

const categoryMeta: Record<Category, { label: string; icon: typeof Siren; emoji: string; color: string; bg: string; border: string }> = {
  vigilancia: { label: "Vigilância", icon: Siren, emoji: "🚨", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30" },
  imunizacao: { label: "Imunização", icon: Syringe, emoji: "💉", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  operacional: { label: "Operacional", icon: Timer, emoji: "⏱️", color: "text-warning", bg: "bg-warning/10", border: "border-warning/30" },
  assistencia: { label: "Assistência", icon: Hospital, emoji: "🏥", color: "text-success", bg: "bg-success/10", border: "border-success/30" },
};

const priorityMeta: Record<Priority, { label: string; cls: string }> = {
  alta: { label: "Alta", cls: "bg-destructive/15 text-destructive border-destructive/30" },
  media: { label: "Média", cls: "bg-warning/15 text-warning border-warning/30" },
  baixa: { label: "Baixa", cls: "bg-success/15 text-success border-success/30" },
};

/**
 * Gatilhos de tendência → recomendação acionável.
 * Cada item simula a leitura automática de uma métrica e o disparo de uma ação.
 */
const signals: TrendSignal[] = [
  {
    id: "growth-sustained",
    label: "Crescimento sustentado",
    metric: "Confirmados / 4 sem.",
    direction: "up",
    deltaPct: 22,
    trigger: "3 semanas consecutivas em alta em São Luís",
    category: "vigilancia",
    priority: "alta",
    action: "Abrir investigação ampliada em São Luís.",
  },
  {
    id: "infant-rise",
    label: "Aumento em menores de 1 ano",
    metric: "Faixa < 1 ano",
    direction: "up",
    deltaPct: 35,
    trigger: "28% dos confirmados concentrados em < 1 ano",
    category: "imunizacao",
    priority: "alta",
    action: "Acelerar vacinação meningocócica em < 1 ano.",
  },
  {
    id: "deaths-rise",
    label: "Aumento de óbitos",
    metric: "Óbitos / 2 sem.",
    direction: "up",
    deltaPct: 18,
    trigger: "2 óbitos novos na capital nas últimas 2 semanas",
    category: "assistencia",
    priority: "alta",
    action: "Reforçar leitos e protocolo clínico em São Luís.",
  },
  {
    id: "response-time",
    label: "Tempo de resposta acima do limite",
    metric: "Tempo médio encerramento",
    direction: "up",
    deltaPct: 15,
    trigger: "Regional Zé Doca: 70 dias (limite 60d)",
    category: "operacional",
    priority: "alta",
    action: "Reduzir tempo de encerramento na Regional Zé Doca.",
  },
  {
    id: "bacterial-share",
    label: "Predomínio bacteriano",
    metric: "Etiologia bacteriana",
    direction: "flat",
    deltaPct: -3,
    trigger: "75% das confirmações são bacterianas",
    category: "imunizacao",
    priority: "media",
    action: "Quimioprofilaxia para contatos de casos bacterianos.",
  },
  {
    id: "open-cases",
    label: "Casos em aberto elevados",
    metric: "Investigação",
    direction: "up",
    deltaPct: 8,
    trigger: "52% dos casos seguem sem encerramento",
    category: "operacional",
    priority: "media",
    action: "Padronizar fluxo semanal de encerramento.",
  },
  {
    id: "search-active",
    label: "Suspeitos sem desfecho",
    metric: "Notificados sem follow-up",
    direction: "up",
    deltaPct: 12,
    trigger: "Suspeitos > 60 dias sem investigação na Zé Doca",
    category: "vigilancia",
    priority: "media",
    action: "Reforçar busca ativa na Regional Zé Doca.",
  },
  {
    id: "lethality-down",
    label: "Letalidade em queda",
    metric: "Taxa de letalidade",
    direction: "down",
    deltaPct: -25,
    trigger: "Letalidade reduziu vs semana anterior",
    category: "assistencia",
    priority: "baixa",
    action: "Manter protocolos clínicos atualizados.",
  },
];

const order: Category[] = ["vigilancia", "imunizacao", "operacional", "assistencia"];

function TrendBadge({ direction, deltaPct }: { direction: TrendDir; deltaPct: number }) {
  const Icon = direction === "up" ? TrendingUp : direction === "down" ? TrendingDown : Minus;
  const tone =
    direction === "up"
      ? "text-destructive bg-destructive/10 border-destructive/30"
      : direction === "down"
      ? "text-success bg-success/10 border-success/30"
      : "text-muted-foreground bg-muted/20 border-border/40";
  const sign = deltaPct > 0 ? "+" : "";
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded border ${tone} shrink-0`}>
      <Icon className="w-3 h-3" />
      {sign}{deltaPct}%
    </span>
  );
}

export function StrategicRecommendations() {
  const grouped = order.map((cat) => ({ cat, items: signals.filter((s) => s.category === cat) }));
  const totalAlta = signals.filter((s) => s.priority === "alta").length;

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">Recomendações Baseadas em Tendência</h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-destructive/15 text-destructive border-destructive/30 shrink-0">
          {totalAlta} ações prioritárias
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Cada ação é gerada automaticamente a partir de um sinal de tendência detectado nos indicadores epidemiológicos.
      </p>

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
                {items.map((s) => {
                  const p = priorityMeta[s.priority];
                  return (
                    <li key={s.id} className="p-3 rounded-md bg-background/40 border border-border/40">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${p.cls}`}>
                          {p.label}
                        </span>
                        <TrendBadge direction={s.direction} deltaPct={s.deltaPct} />
                        <span className="text-[10px] text-muted-foreground truncate">{s.metric}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug mb-1.5">
                        <span className="font-semibold text-foreground/80">Sinal:</span> {s.trigger}
                      </p>
                      <div className="flex items-start gap-1.5">
                        <ArrowRight className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${meta.color}`} />
                        <p className="text-xs font-semibold text-foreground leading-snug">{s.action}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-info/10 border border-info/20">
        <p className="text-[11px] text-info leading-snug">
          <span className="font-semibold">Como ler:</span> cada cartão mostra a métrica monitorada, a variação detectada e a ação executiva recomendada.
          Crescimento sustentado → investigação · Aumento infantil → vacinação · Aumento de óbitos → assistência hospitalar.
        </p>
      </div>
    </div>
  );
}
import { useState } from "react";
import {
  Flame, Activity, ShieldCheck, AlertTriangle, TrendingUp, Skull, Gauge, CheckCircle2, Info,
  Maximize2, X
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// População estimada (mil hab) — usada para calcular incidência por 100k
// Fonte: estimativas IBGE (valores aproximados para fins de demonstração)
type Row = {
  name: string;
  cases: number;        // casos confirmados
  deaths: number;       // óbitos
  growth: number;       // crescimento recente em %
  closurePct: number;   // % encerramento (0-100)
  responseDays: number; // tempo médio de resposta (dias)
  pop: number;          // população em milhares
};

const data: Row[] = [
  { name: "São Luís",            cases: 15, deaths: 4, growth: 25, closurePct: 70, responseDays: 35, pop: 1108 },
  { name: "São José de Ribamar", cases: 3,  deaths: 1, growth: 18, closurePct: 75, responseDays: 36, pop: 184 },
  { name: "Amarante do Maranhão",cases: 2,  deaths: 1, growth: 10, closurePct: 70, responseDays: 40, pop: 41 },
  { name: "Caxias",              cases: 2,  deaths: 1, growth: 8,  closurePct: 80, responseDays: 19, pop: 165 },
  { name: "Presidente Juscelino",cases: 2,  deaths: 0, growth: 12, closurePct: 75, responseDays: 30, pop: 12 },
  { name: "Bacabal",             cases: 1,  deaths: 1, growth: 5,  closurePct: 70, responseDays: 32, pop: 102 },
  { name: "Imperatriz",          cases: 1,  deaths: 0, growth: 8,  closurePct: 80, responseDays: 25, pop: 259 },
  { name: "S. L. Gonzaga do MA", cases: 1,  deaths: 1, growth: 0,  closurePct: 65, responseDays: 50, pop: 21 },
  { name: "Bacabeira",           cases: 1,  deaths: 0, growth: 0,  closurePct: 85, responseDays: 30, pop: 16 },
  { name: "Santa Inês",          cases: 1,  deaths: 0, growth: 0,  closurePct: 80, responseDays: 25, pop: 91 },
];

// helpers
const clamp = (v: number, min = 0, max = 100) => Math.max(min, Math.min(max, v));

// Calcula componentes (0-100) e índice composto
function computeIndex(r: Row) {
  const incidence = (r.cases / r.pop) * 100;          // casos por 100k hab
  const lethality = r.cases > 0 ? (r.deaths / r.cases) * 100 : 0;
  const growth = r.growth;                            // %
  const operationalPressure = clamp((r.responseDays / 60) * 100); // referência: 60d = 100%
  const closureCoverage = r.closurePct;

  // Score por componente (0-100), normalizando para que "pior" → maior pontuação
  const sIncid   = clamp(incidence * 4);                 // 25/100k → 100
  const sLethal  = clamp(lethality * 2);                 // 50% → 100
  const sGrowth  = clamp(growth * 2);                    // 50% → 100
  const sOper    = operationalPressure;                  // já 0-100
  const sClosure = clamp(100 - closureCoverage);         // pior cobertura → maior score

  // Pesos: incidência 30%, letalidade 25%, crescimento 20%, op 15%, encerramento 10%
  const score = Math.round(
    sIncid * 0.30 + sLethal * 0.25 + sGrowth * 0.20 + sOper * 0.15 + sClosure * 0.10
  );

  let level: "critical" | "high" | "medium" | "low";
  if (score >= 65) level = "critical";
  else if (score >= 45) level = "high";
  else if (score >= 25) level = "medium";
  else level = "low";

  return {
    ...r,
    incidence: +incidence.toFixed(1),
    lethality: +lethality.toFixed(1),
    operationalPressure: +operationalPressure.toFixed(0),
    closureCoverage,
    components: { sIncid, sLethal, sGrowth, sOper, sClosure },
    score,
    level,
  };
}

const levelMeta = {
  critical: { label: "Prioridade Crítica", color: "text-destructive", bg: "bg-destructive/15", ring: "ring-destructive/40", Icon: Flame,         action: "Ação imediata" },
  high:     { label: "Alto Risco",         color: "text-destructive", bg: "bg-destructive/10", ring: "ring-destructive/30", Icon: AlertTriangle, action: "Investigar" },
  medium:   { label: "Médio Risco",        color: "text-warning",     bg: "bg-warning/10",     ring: "ring-warning/30",     Icon: Activity,      action: "Monitorar" },
  low:      { label: "Baixo Risco",        color: "text-success",     bg: "bg-success/10",     ring: "ring-success/30",     Icon: ShieldCheck,   action: "Rotina" },
} as const;

const computed = data.map(computeIndex).sort((a, b) => b.score - a.score);

function IndexContent({ expanded = false }: { expanded?: boolean }) {
  const counts = {
    critical: computed.filter((c) => c.level === "critical").length,
    high:     computed.filter((c) => c.level === "high").length,
    medium:   computed.filter((c) => c.level === "medium").length,
    low:      computed.filter((c) => c.level === "low").length,
  };
  const top = computed[0];
  const TopIcon = levelMeta[top.level].Icon;

  const t = {
    title: expanded ? "text-xl" : "text-base",
    subtitle: expanded ? "text-sm" : "text-xs",
    badge: expanded ? "text-xs" : "text-[10px]",
    icon: expanded ? "w-6 h-6" : "w-4 h-4",
    count: expanded ? "text-2xl" : "text-lg",
    label: expanded ? "text-xs" : "text-[10px]",
    body: expanded ? "text-sm" : "text-xs",
    table: expanded ? "text-sm" : "text-xs",
    barH: expanded ? "h-2.5" : "h-1.5",
    score: expanded ? "text-sm" : "text-[11px]",
    legend: expanded ? "text-xs" : "text-[10px]",
  };

  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-1">
        <div>
          <h3 className={`font-display font-semibold text-foreground ${t.title}`}>Índice Epidemiológico Completo</h3>
          <p className={`${t.subtitle} text-muted-foreground`}>
            Combina incidência · letalidade · velocidade de crescimento · pressão operacional · cobertura de encerramento
          </p>
        </div>
        <span className={`${t.badge} uppercase tracking-wider px-2 py-1 rounded border border-primary/30 text-primary bg-primary/5 shrink-0`}>
          Nível secretaria estadual
        </span>
      </div>

      {/* Resumo por nível */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-4">
        {(["critical", "high", "medium", "low"] as const).map((lvl) => {
          const m = levelMeta[lvl];
          return (
            <div key={lvl} className={`p-3 rounded-lg border border-border/40 ${m.bg} flex items-center gap-2`}>
              <m.Icon className={`${t.icon} ${m.color}`} />
              <div className="leading-tight">
                <p className={`${t.count} font-display font-bold ${m.color}`}>{counts[lvl]}</p>
                <p className={`${t.label} text-muted-foreground uppercase tracking-wider`}>{m.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Headline do município top */}
      <div className={`p-3 rounded-lg border ${levelMeta[top.level].bg} ${levelMeta[top.level].ring} ring-1 mb-4 flex items-start gap-2`}>
        <TopIcon className={`${t.icon} mt-0.5 ${levelMeta[top.level].color} shrink-0`} />
        <p className={`${t.body} leading-relaxed ${levelMeta[top.level].color}`}>
          <span className="font-semibold">{top.name}</span> é{" "}
          <span className="font-bold">{levelMeta[top.level].label.toLowerCase()}</span> e exige{" "}
          <span className="font-bold">{levelMeta[top.level].action.toLowerCase()}</span> — índice {top.score}/100
          {" "}(incidência {top.incidence}/100k · letalidade {top.lethality}% · crescimento {top.growth}%).
        </p>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto rounded-lg border border-border/40">
        <table className={`w-full ${t.table}`}>
          <thead className="bg-secondary/40 text-muted-foreground">
            <tr>
              <th className="text-left px-3 py-2 font-medium">Município</th>
              <th className="text-center px-3 py-2 font-medium">Classificação</th>
              <th className="text-right px-3 py-2 font-medium" title="Casos por 100 mil habitantes">Incid. /100k</th>
              <th className="text-right px-3 py-2 font-medium">Letal. %</th>
              <th className="text-right px-3 py-2 font-medium">Cresc. %</th>
              <th className="text-right px-3 py-2 font-medium" title="Pressão operacional (tempo de resposta vs referência 60d)">Pressão Op.</th>
              <th className="text-right px-3 py-2 font-medium">Encerr. %</th>
              <th className="px-3 py-2 font-medium w-44">Índice</th>
            </tr>
          </thead>
          <tbody>
            {computed.map((c) => {
              const m = levelMeta[c.level];
              const barColor =
                c.level === "critical" || c.level === "high" ? "bg-destructive" :
                c.level === "medium" ? "bg-warning" : "bg-success";
              return (
                <tr key={c.name} className="border-t border-border/30 hover:bg-secondary/20">
                  <td className="px-3 py-2 font-medium text-foreground">{c.name}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`inline-flex items-center gap-1 ${t.badge} font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-current/30 ${m.color}`}>
                      <m.Icon className="w-4 h-4" />
                      {m.label}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right text-foreground">{c.incidence}</td>
                  <td className={`px-3 py-2 text-right ${c.lethality >= 20 ? "text-destructive font-semibold" : "text-foreground"}`}>{c.lethality}</td>
                  <td className={`px-3 py-2 text-right ${c.growth >= 20 ? "text-destructive font-semibold" : c.growth <= -10 ? "text-success" : "text-foreground"}`}>{c.growth > 0 ? "+" : ""}{c.growth}</td>
                  <td className={`px-3 py-2 text-right ${c.operationalPressure >= 80 ? "text-destructive font-semibold" : "text-foreground"}`}>{c.operationalPressure}</td>
                  <td className={`px-3 py-2 text-right ${c.closureCoverage < 60 ? "text-warning" : "text-success"}`}>{c.closureCoverage}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className={`${t.barH} bg-secondary/50 rounded-full overflow-hidden flex-1`}>
                        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${clamp(c.score)}%` }} />
                      </div>
                      <span className={`${t.score} font-bold w-10 text-right ${m.color}`}>{c.score}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legenda dos componentes */}
      <div className={`grid grid-cols-2 md:grid-cols-5 gap-2 mt-4 ${t.legend} text-muted-foreground`}>
        <div className="flex items-center gap-1"><Activity className="w-4 h-4 text-primary" /> Incidência (30%)</div>
        <div className="flex items-center gap-1"><Skull className="w-4 h-4 text-destructive" /> Letalidade (25%)</div>
        <div className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-warning" /> Crescimento (20%)</div>
        <div className="flex items-center gap-1"><Gauge className="w-4 h-4 text-info" /> Pressão Op. (15%)</div>
        <div className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-success" /> Encerramento (10%)</div>
      </div>
      <p className={`${t.legend} text-muted-foreground mt-2 flex items-start gap-1`}>
        <Info className="w-4 h-4 mt-0.5 shrink-0" />
        Combinar quantidade, crescimento e taxa proporcional evita viés de município grande — o índice prioriza por <span className="font-semibold">risco real</span>, não por volume bruto.
      </p>
    </>
  );
}

export function EpidemiologicalIndex() {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card p-6">
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-semibold text-foreground">Índice Epidemiológico Completo</h3>
          <p className="text-xs text-muted-foreground">
            Combina incidência · letalidade · velocidade de crescimento · pressão operacional · cobertura de encerramento
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-secondary/60 transition-colors shrink-0"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          Ampliar
        </button>
      </div>

      {/* Exibe conteúdo resumido no card (sem o header duplicado) */}
      <IndexContent />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[96vw] w-[96vw] h-[94vh] p-0 border-border/60 overflow-hidden flex flex-col">
          {/* Cabeçalho do modo ampliado */}
          <div className="flex items-center justify-between border-b border-border/40 bg-background/40 px-4 py-3 backdrop-blur shrink-0">
            <button
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary/70 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              Voltar pro Informe
            </button>
            <div className="text-right">
              <p className="text-sm font-display font-semibold text-foreground">Índice Epidemiológico Completo</p>
              <p className="text-[11px] text-muted-foreground">Visualização ampliada com todos os dados</p>
            </div>
          </div>

          {/* Conteúdo scrollável */}
          <div className="flex-1 overflow-auto p-6">
            <IndexContent expanded />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

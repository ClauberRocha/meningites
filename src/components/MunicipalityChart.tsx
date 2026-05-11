import { Crown, AlertTriangle } from "lucide-react";

const totalMun = 32;
const rawMunicipalities = [
  { name: "São Luís", value: 14 },
  { name: "Outros", value: 2 },
  { name: "Bacabeira", value: 1 },
  { name: "Bacabal", value: 1 },
  { name: "Amarante", value: 1 },
  { name: "São José de Ribamar", value: 1 },
  { name: "Nova Olinda do Maranhão", value: 1 },
  { name: "Viana", value: 1 },
  { name: "Urbano Santos", value: 1 },
  { name: "Poção de Pedras", value: 1 },
  { name: "Caxias", value: 1 },
  { name: "Santa Inês", value: 1 },
  { name: "São Luiz Gonzaga do Maranhão", value: 1 },
  { name: "Jenipapo dos Vieiras", value: 1 },
  { name: "Raposa", value: 1 },
  { name: "Alcântara", value: 1 },
  { name: "Presidente Juscelino", value: 1 },
  { name: "Bequimão", value: 1 },
];
const municipalities = rawMunicipalities.map((m) => ({ ...m, pct: Math.round((m.value / totalMun) * 100) }));

export function MunicipalityChart() {
  const maxValue = Math.max(...municipalities.map(m => m.value));
  const top = municipalities.reduce((a, b) => (a.value >= b.value ? a : b));
  const concentrationLeader = top.pct >= 30; // sinal de concentração crítica

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Por Município de Residência</h3>
      <p className="text-xs text-muted-foreground mb-4">Distribuição dos casos confirmados</p>

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

      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
        {municipalities.map((m) => {
          const isTop = m.name === top.name;
          return (
            <div
              key={m.name}
              className={`flex items-center gap-3 rounded-md px-1 ${isTop ? "bg-destructive/5 ring-1 ring-destructive/30" : ""}`}
            >
              <span className={`text-xs w-44 truncate shrink-0 flex items-center gap-1 ${isTop ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                {isTop && <Crown className="w-3 h-3" />}
                {m.name}
              </span>
              <div className="flex-1 h-5 bg-secondary/50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${isTop ? "bg-destructive" : "bg-destructive/60"}`}
                  style={{ width: `${(m.value / maxValue) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-destructive w-5 text-right">{m.value}</span>
              <span className="text-xs text-muted-foreground w-12 text-right">({m.pct}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

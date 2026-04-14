const total = 26;

const regions = [
  { name: "Metropolitana", value: 12, max: 12 },
  { name: "Santa Inês", value: 3, max: 12 },
  { name: "Rosário", value: 3, max: 12 },
  { name: "Viana", value: 2, max: 12 },
  { name: "Bacabal", value: 2, max: 12 },
  { name: "Presidente Dutra", value: 1, max: 12 },
  { name: "Balsas", value: 1, max: 12 },
  { name: "Imperatriz", value: 1, max: 12 },
  { name: "Pedreiras", value: 1, max: 12 },
];

export function GeographicHeatmap() {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Mapa de Calor — Distribuição Geográfica</h3>
      <p className="text-xs text-muted-foreground mb-4">Concentração de casos confirmados por regional</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {regions.map((r) => {
          const isHot = r.name === "Metropolitana";
          return (
            <div
              key={r.name}
              className={`rounded-xl p-4 text-center transition-all hover:scale-105 ${
                isHot
                  ? "bg-destructive/20 border border-destructive/40"
                  : "bg-warning/10 border border-warning/20"
              }`}
            >
              <p className={`text-xs font-medium ${isHot ? "text-destructive" : "text-warning"}`}>{r.name}</p>
              <p className={`text-2xl font-display font-bold mt-1 ${isHot ? "text-destructive" : "text-warning"}`}>{r.value}</p>
              <p className="text-[10px] text-muted-foreground">{((r.value / 21) * 100).toFixed(1)}%</p>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border/50 pt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Por Macrorregiões</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {macroRegions.map((m) => (
            <div key={m.name} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <span className="text-sm text-muted-foreground">{m.name}</span>
              <span className="font-bold text-foreground">{m.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
        <p className="text-xs text-destructive">
          <span className="font-semibold">Alerta:</span> A Metropolitana concentra 57% dos casos confirmados (12 casos), indicando necessidade de intensificação da vigilância nesta região.
        </p>
      </div>
    </div>
  );
}

const confirmedData = [
  { regional: "METROPOLITANA", confirmados: 25 },
  { regional: "ROSÁRIO", confirmados: 4 },
  { regional: "SANTA INÊS", confirmados: 2 },
  { regional: "IMPERATRIZ", confirmados: 2 },
  { regional: "BACABAL", confirmados: 2 },
  { regional: "PRESIDENTE DUTRA", confirmados: 2 },
  { regional: "BALSAS", confirmados: 1 },
  { regional: "CHAPADINHA", confirmados: 1 },
  { regional: "VIANA", confirmados: 1 },
  { regional: "ITAPECURU", confirmados: 1 },
  { regional: "AÇAILÂNDIA", confirmados: 1 },
];

export function RegionalTable() {
  const maxConfirmed = Math.max(...confirmedData.map(d => d.confirmados));

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Distribuição por Regional</h3>
      <p className="text-xs text-muted-foreground mb-4">Casos pendentes de informação</p>
      <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
        {confirmedData.map((item) => (
          <div key={item.regional} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-32 truncate shrink-0">{item.regional}</span>
            <div className="flex-1 h-5 bg-secondary/50 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-destructive rounded-full transition-all"
                style={{ width: maxConfirmed > 0 ? `${(item.confirmados / maxConfirmed) * 100}%` : "0%" }}
              />
            </div>
            <span className="text-sm font-semibold text-destructive w-6 text-right">{item.confirmados}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

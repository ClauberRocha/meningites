const confirmedData = [
  { regional: "METROPOLITANA", confirmados: 12, pendentes: 12 },
  { regional: "VIANA", confirmados: 2, pendentes: 2 },
  { regional: "ROSÁRIO", confirmados: 1, pendentes: 3 },
  { regional: "BARRA DO CORDA", confirmados: 1, pendentes: 0 },
  { regional: "ITAPECURU", confirmados: 1, pendentes: 0 },
  { regional: "SANTA INÊS", confirmados: 0, pendentes: 3 },
  { regional: "BACABAL", confirmados: 0, pendentes: 2 },
  { regional: "PRESIDENTE DUTRA", confirmados: 0, pendentes: 1 },
  { regional: "BALSAS", confirmados: 0, pendentes: 1 },
  { regional: "IMPERATRIZ", confirmados: 0, pendentes: 1 },
  { regional: "PEDREIRAS", confirmados: 0, pendentes: 1 },
];

export function RegionalTable() {
  const maxConfirmed = Math.max(...confirmedData.map(d => d.confirmados));

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Distribuição por Regional</h3>
      <p className="text-xs text-muted-foreground mb-4">Casos confirmados e pendentes</p>
      <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
        {confirmedData.map((item) => (
          <div key={item.regional} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-32 truncate shrink-0">{item.regional}</span>
            <div className="flex-1 h-5 bg-secondary/50 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all"
                style={{ width: maxConfirmed > 0 ? `${(item.confirmados / maxConfirmed) * 100}%` : "0%" }}
              />
            </div>
            <span className="text-sm font-semibold text-primary w-6 text-right">{item.confirmados}</span>
            <span className="text-xs text-warning w-6 text-right">{item.pendentes > 0 ? item.pendentes : "—"}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> Confirmados</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-warning" /> Pendentes</span>
      </div>
    </div>
  );
}

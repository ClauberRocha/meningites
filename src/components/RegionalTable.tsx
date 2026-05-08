const confirmedData = [
  { regional: "METROPOLITANA", confirmados: 17 },
  { regional: "ROSÁRIO", confirmados: 2 },
  { regional: "BACABAL", confirmados: 2 },
  { regional: "OUTRO ESTADO", confirmados: 2 },
  { regional: "IMPERATRIZ", confirmados: 1 },
  { regional: "ZÉ DOCA", confirmados: 1 },
  { regional: "VIANA", confirmados: 1 },
  { regional: "ITAPECURU", confirmados: 1 },
  { regional: "PEDREIRAS", confirmados: 1 },
  { regional: "CAXIAS", confirmados: 1 },
  { regional: "SANTA INÊS", confirmados: 1 },
  { regional: "BARRA DO CORDA", confirmados: 1 },
  { regional: "PINHEIRO", confirmados: 1 },
];

export function RegionalTable() {
  const maxConfirmed = Math.max(...confirmedData.map(d => d.confirmados));

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Distribuição por Regional</h3>
      <p className="text-xs text-muted-foreground mb-4">Casos confirmados por regional ({confirmedData.reduce((s,d)=>s+d.confirmados,0)} confirmados)</p>
      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
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

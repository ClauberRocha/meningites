const municipalities = [
  { name: "São Luís", value: 9, pct: 42.9 },
  { name: "São José de Ribamar", value: 1, pct: 4.8 },
  { name: "Bacabeira", value: 1, pct: 4.8 },
  { name: "Viana", value: 1, pct: 4.8 },
  { name: "São Luiz Gonzaga do Maranhão", value: 1, pct: 4.8 },
  { name: "Bacabal", value: 1, pct: 4.8 },
  { name: "Urbano Santos", value: 1, pct: 4.8 },
  { name: "Caxias", value: 1, pct: 4.8 },
  { name: "Amarante", value: 1, pct: 4.8 },
  { name: "Nova Olinda do Maranhão", value: 1, pct: 4.8 },
  { name: "Rosário", value: 1, pct: 4.8 },
  { name: "Barra do Corda", value: 1, pct: 4.8 },
];

export function MunicipalityChart() {
  const maxValue = Math.max(...municipalities.map(m => m.value));

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Por Município de Residência</h3>
      <p className="text-xs text-muted-foreground mb-4">Distribuição dos casos confirmados</p>
      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
        {municipalities.map((m) => (
          <div key={m.name} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-44 truncate shrink-0">{m.name}</span>
            <div className="flex-1 h-5 bg-secondary/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary/70 to-primary rounded-full"
                style={{ width: `${(m.value / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-primary w-5 text-right">{m.value}</span>
            <span className="text-xs text-muted-foreground w-12 text-right">({m.pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const totalMun = 26;
const rawMunicipalities = [
  { name: "São Luís", value: 13 },
  { name: "Bacabeira", value: 1 },
  { name: "Bacabal", value: 1 },
  { name: "Amarante", value: 1 },
  { name: "São José de Ribamar", value: 1 },
  { name: "Nova Olinda do Maranhão", value: 1 },
  { name: "Viana", value: 1 },
  { name: "Urbano Santos", value: 1 },
  { name: "Caxias", value: 1 },
  { name: "Santa Inês", value: 1 },
  { name: "São Luiz Gonzaga do Maranhão", value: 1 },
  { name: "Jenipapo dos Vieiras", value: 1 },
  { name: "Alcântara", value: 1 },
  { name: "Outros", value: 1 },
];
const municipalities = rawMunicipalities.map((m) => ({ ...m, pct: Math.round((m.value / totalMun) * 100) }));

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
                className="h-full bg-destructive rounded-full"
                style={{ width: `${(m.value / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-destructive w-5 text-right">{m.value}</span>
            <span className="text-xs text-muted-foreground w-12 text-right">({m.pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

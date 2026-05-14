const total = 44;
const rawCriteria = [
  { name: "Quimiocitológico", value: 18 },
  { name: "PCR", value: 8 },
  { name: "Clínico", value: 6 },
  { name: "Cultura", value: 5 },
  { name: "Necropsia", value: 4 },
  { name: "Outros", value: 2 },
  { name: "Em Investigação", value: 1 },
];
const criteria = rawCriteria.map((c) => ({ ...c, pct: Math.round((c.value / total) * 100) }));

export function ConfirmationCriteria() {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Critérios de Confirmação</h3>
      <p className="text-xs text-muted-foreground mb-4">Método laboratorial / diagnóstico ({total} confirmados)</p>
      <div className="space-y-3">
        {criteria.map((c) => (
          <div key={c.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{c.name}</span>
              <span className="font-semibold text-foreground">{c.value} ({c.pct}%)</span>
            </div>
            <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-destructive transition-all"
                style={{ width: `${c.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const criteria = [
  { name: "Quimiocitológico", value: 8, pct: 38 },
  { name: "Clínico", value: 5, pct: 24 },
  { name: "PCR", value: 4, pct: 19 },
  { name: "Cultura", value: 3, pct: 14 },
  { name: "Necropsia", value: 1, pct: 5 },
];

export function ConfirmationCriteria() {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Critérios de Confirmação</h3>
      <p className="text-xs text-muted-foreground mb-4">Método laboratorial / diagnóstico</p>
      <div className="space-y-3">
        {criteria.map((c) => (
          <div key={c.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{c.name}</span>
              <span className="font-semibold text-foreground">{c.value}</span>
            </div>
            <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-info to-primary transition-all"
                style={{ width: `${c.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CaseEvolution() {
  const evolution = [
    { label: "Alta", value: 9, pct: 50, color: "bg-success", textColor: "text-success" },
    { label: "Óbito por Meningite", value: 2, pct: 11, color: "bg-destructive", textColor: "text-destructive" },
    { label: "Internação", value: 7, pct: 39, color: "bg-warning", textColor: "text-warning" },
    { label: "Em Investigação", value: 0, pct: 0, color: "bg-muted", textColor: "text-muted-foreground" },
  ];

  const viralEvolution = [
    { label: "Alta", value: 2, color: "text-success" },
    { label: "Óbitos", value: 0, color: "text-muted-foreground" },
  ];

  const outrasEvolution = [
    { label: "Alta", value: 1, color: "text-success" },
    { label: "Óbitos", value: 0, color: "text-muted-foreground" },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Evolução dos Casos</h3>
      <p className="text-xs text-muted-foreground mb-4">Desfecho clínico por etiologia</p>

      {/* Bacterianas */}
      <div className="mb-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Meningites Bacterianas (18 casos)</p>
        <div className="space-y-3">
          {evolution.map((e) => (
            <div key={e.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">{e.label}</span>
                <span className={`font-bold ${e.textColor}`}>{e.value} ({e.pct}%)</span>
              </div>
              <div className="h-2.5 bg-secondary/50 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${e.color}`} style={{ width: `${e.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Viral */}
      <div className="border-t border-border/50 pt-4 mb-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Meningite Viral (2 casos)</p>
        <div className="flex gap-4">
          {viralEvolution.map((e) => (
            <div key={e.label} className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{e.label}:</span>
              <span className={`font-bold ${e.color}`}>{e.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Outras */}
      <div className="border-t border-border/50 pt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Outras Etiologias (1 caso)</p>
        <div className="flex gap-4">
          {outrasEvolution.map((e) => (
            <div key={e.label} className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{e.label}:</span>
              <span className={`font-bold ${e.color}`}>{e.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
        <p className="text-xs text-warning">
          <span className="font-semibold">Análise:</span> A taxa de alta entre bacterianas é de 50%, com 11% de óbitos e 39% em internação. Todos os casos virais e de outras etiologias evoluíram para alta.
        </p>
      </div>
    </div>
  );
}

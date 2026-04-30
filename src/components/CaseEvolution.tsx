export function CaseEvolution() {
  const total = 32;
  // Conforme informe: Geral - Alta 17, Internado 8, Óbito 6, Em invest 1; Viral - Alta 3, Em invest 1, Óbito 2; Outras - Alta 2
  const bactTotal = 24;
  const evolution = [
    { label: "Alta", value: 12, pct: Math.round((12/bactTotal)*100), color: "bg-success", textColor: "text-success" },
    { label: "Internação", value: 8, pct: Math.round((8/bactTotal)*100), color: "bg-warning", textColor: "text-warning" },
    { label: "Óbito por Meningite", value: 4, pct: Math.round((4/bactTotal)*100), color: "bg-destructive", textColor: "text-destructive" },
    { label: "Em Investigação", value: 0, pct: 0, color: "bg-primary", textColor: "text-primary" },
  ];

  const viralEvolution = [
    { label: "Alta", value: 3, color: "text-success" },
    { label: "Em Investigação", value: 1, color: "text-primary" },
    { label: "Óbitos", value: 2, color: "text-destructive" },
  ];

  const outrasEvolution = [
    { label: "Alta", value: 2, color: "text-success" },
    { label: "Óbitos", value: 0, color: "text-muted-foreground" },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Evolução dos Casos</h3>
      <p className="text-xs text-muted-foreground mb-4">Desfecho clínico por etiologia — Total: Alta 17, Internado 8, Óbito 6, Em investigação 1</p>

      {/* Bacterianas */}
      <div className="mb-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Meningites Bacterianas (24 casos)</p>
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
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Meningite Viral (6 casos)</p>
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
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Outras Etiologias (2 casos)</p>
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
          <span className="font-semibold">Análise:</span> Entre as 32 confirmações, 17 evoluíram para alta (53%), 8 permanecem internados (25%), 6 evoluíram para óbito (19%) e 1 segue em investigação (3%). A taxa de mortalidade geral é de 19%.
        </p>
      </div>
    </div>
  );
}

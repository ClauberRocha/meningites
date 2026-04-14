const glossary = [
  { sigla: "MNE", desc: "Meningite Não Especificada — Meningite bacteriana sem identificação específica do agente etiológico" },
  { sigla: "MB", desc: "Meningite por outras Bactérias — Causada por bactérias diferentes de Neisseria meningitidis" },
  { sigla: "MM", desc: "Meningite Meningocócica — Causada por Neisseria meningitidis" },
  { sigla: "MM+MCC", desc: "Meningite Meningocócica + Meningococcemia — Meningite meningocócica com presença de meningococcemia" },
  { sigla: "SE", desc: "Semana Epidemiológica — Unidade de tempo padrão para análise de dados epidemiológicos" },
  { sigla: "SINAN", desc: "Sistema de Informação de Agravos de Notificação" },
  { sigla: "SES/MA", desc: "Secretaria de Estado da Saúde do Maranhão" },
  { sigla: "PNI", desc: "Programa Nacional de Imunizações" },
];

const borderColors: Record<string, string> = {
  destructive: "border-destructive/30 hover:border-destructive/60",
  warning: "border-warning/30 hover:border-warning/60",
  default: "border-border/50 hover:border-primary/40",
};

const bgColors: Record<string, string> = {
  destructive: "bg-destructive/5",
  warning: "bg-warning/5",
  default: "bg-secondary/30",
};

export function GlossarySection() {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Glossário de Siglas Epidemiológicas</h3>
      <p className="text-xs text-muted-foreground mb-4">Definições de termos e siglas utilizadas no dashboard</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {glossary.map((g, i) => {
          const variant = i < 3 ? "destructive" : i < 6 ? "warning" : "default";
          return (
            <div
              key={g.sigla}
              className={`rounded-xl border p-4 transition-all hover:scale-[1.02] ${borderColors[variant]} ${bgColors[variant]}`}
            >
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xl">📋</span>
                <h4 className="text-sm font-bold text-primary">{g.sigla}</h4>
              </div>
              <p className="text-xs text-muted-foreground">{g.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

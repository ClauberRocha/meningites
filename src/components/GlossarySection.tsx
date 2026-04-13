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

export function GlossarySection() {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Glossário de Siglas Epidemiológicas</h3>
      <p className="text-xs text-muted-foreground mb-4">Definições de termos e siglas utilizadas no dashboard</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {glossary.map((g) => (
          <div key={g.sigla} className="flex gap-3 p-3 bg-secondary/30 rounded-lg">
            <span className="text-sm font-bold text-primary shrink-0 w-16">{g.sigla}</span>
            <span className="text-xs text-muted-foreground">{g.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

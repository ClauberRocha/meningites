const alerts = [
  {
    emoji: "🚨",
    title: "Concentração em Crianças Pequenas",
    finding: "28% dos casos confirmados ocorrem em crianças menores de 1 ano (9 casos).",
    recommendations: [
      "Intensificar campanhas de vacinação meningocócica em menores de 2 anos",
      "Reforçar orientação aos pais sobre sinais de alerta",
      "Garantir acesso à vacina meningocócica conjugada (MenC)",
    ],
    variant: "destructive" as const,
  },
  {
    emoji: "📍",
    title: "Concentração Geográfica",
    finding: "53% dos casos na região Metropolitana (17 casos). O volume elevado de notificações na Região Metropolitana deve-se ao fato de essa região concentrar os serviços de referência que recebem casos provenientes de todos os municípios maranhenses.",
    recommendations: [
      "Intensificar vigilância epidemiológica na região Metropolitana",
      "Reforçar capacitação de profissionais para detecção precoce",
      "Implementar medidas de controle de infecção em serviços de saúde",
    ],
    variant: "warning" as const,
  },
  {
    emoji: "🦠",
    title: "Predominância de Meningite Bacteriana",
    finding: "75% dos casos são bacterianos (24 casos), com taxa de mortalidade geral de 19%.",
    recommendations: [
      "Garantir acesso rápido a antibióticos apropriados",
      "Reforçar protocolos de manejo clínico de meningite bacteriana",
      "Implementar quimioprofilaxia para contatos de casos",
    ],
    variant: "destructive" as const,
  },
  {
    emoji: "⚠️",
    title: "Taxa de Mortalidade",
    finding: "19% de taxa de mortalidade (6 óbitos em 32 confirmados).",
    recommendations: [
      "Revisar protocolos de manejo clínico e terapia antimicrobiana",
      "Reforçar capacitação em diagnóstico precoce",
      "Realizar auditorias de óbitos para identificação de melhorias",
    ],
    variant: "warning" as const,
  },
  {
    emoji: "🌍",
    title: "Perfil Étnico-Racial",
    finding: "84% dos casos em indivíduos pardos, refletindo perfil populacional.",
    recommendations: [
      "Assegurar equidade no acesso a vacinas e tratamentos",
      "Monitorar possíveis disparidades no acesso à saúde",
      "Reforçar campanhas em comunidades vulneráveis",
    ],
    variant: "default" as const,
  },
  {
    emoji: "👥",
    title: "Distribuição por Sexo",
    finding: "53% masculino (17) vs 47% feminino (15) entre confirmados.",
    recommendations: [
      "Manter monitoramento de tendências epidemiológicas por gênero",
      "Fortalecer campanhas direcionadas a ambos os sexos",
    ],
    variant: "default" as const,
  },
];

const borderColors = {
  destructive: "border-destructive/30 hover:border-destructive/60",
  warning: "border-warning/30 hover:border-warning/60",
  default: "border-border/50 hover:border-primary/40",
};

const bgColors = {
  destructive: "bg-destructive/5",
  warning: "bg-warning/5",
  default: "bg-secondary/30",
};

export function AlertsSection() {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Alertas e Recomendações de Saúde Pública</h3>
      <p className="text-xs text-muted-foreground mb-5">Principais achados e ações recomendadas</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alerts.map((a) => (
          <div
            key={a.title}
            className={`rounded-xl border p-4 transition-all hover:scale-[1.02] ${borderColors[a.variant]} ${bgColors[a.variant]}`}
          >
            <div className="flex items-start gap-2 mb-2">
              <span className="text-xl">{a.emoji}</span>
              <h4 className="text-sm font-semibold text-foreground">{a.title}</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              <span className="font-semibold">Achado:</span> {a.finding}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">Recomendações:</p>
            <ul className="space-y-1">
              {a.recommendations.map((r, i) => (
                <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-lg bg-info/10 border border-info/20">
        <p className="text-xs text-info">
          <span className="font-semibold">Nota Importante:</span> Essas recomendações devem ser implementadas em coordenação com as autoridades de saúde pública estaduais e municipais, considerando a capacidade operacional e recursos disponíveis.
        </p>
      </div>
    </div>
  );
}

interface AnalysisCardProps {
  title: string;
  text: string;
}

export function AnalysisCard({ title, text }: AnalysisCardProps) {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}

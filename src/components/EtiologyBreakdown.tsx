import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const bacterialTypes = [
  { name: "MNE", fullName: "Meningite Não Especificada", value: 13, pct: 72, color: "hsl(0 72% 55%)" },
  { name: "MM", fullName: "Meningite Meningocócica", value: 3, pct: 17, color: "hsl(38 92% 50%)" },
  { name: "MM+MCC", fullName: "Meningo + Meningococcemia", value: 1, pct: 6, color: "hsl(210 80% 55%)" },
  { name: "MB", fullName: "Meningite por outras Bactérias", value: 1, pct: 6, color: "hsl(152 60% 45%)" },
];

const etiologiaData = [
  { name: "Bacteriana", value: 18, color: "hsl(0 72% 55%)" },
  { name: "Viral", value: 3, color: "hsl(210 80% 55%)" },
  { name: "Outras", value: 1, color: "hsl(38 92% 50%)" },
];

const tooltipStyle = {
  backgroundColor: "hsl(210 28% 12%)",
  border: "1px solid hsl(210 20% 22%)",
  borderRadius: "8px",
  color: "hsl(210 20% 92%)",
  fontSize: 12,
};

export function EtiologyBreakdown() {
  const total = etiologiaData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Etiologia dos Casos</h3>
      <p className="text-xs text-muted-foreground mb-4">Classificação dos {total} casos confirmados</p>

      <div className="flex items-center gap-6 mb-5">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={etiologiaData} innerRadius={30} outerRadius={55} paddingAngle={3} dataKey="value" stroke="none">
                {etiologiaData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {etiologiaData.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-muted-foreground">{d.name}</span>
              <span className="font-bold text-foreground">{d.value}</span>
              <span className="text-xs text-muted-foreground">({((d.value / total) * 100).toFixed(0)}%)</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/50 pt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Detalhamento Bacteriana (18 casos)</p>
        <div className="grid grid-cols-2 gap-2">
          {bacterialTypes.map((b) => (
            <div key={b.name} className="flex items-center gap-2 p-2 bg-secondary/30 rounded-lg">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground">{b.name} — {b.value} ({b.pct}%)</p>
                <p className="text-[10px] text-muted-foreground truncate">{b.fullName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
        <p className="text-xs text-destructive">
          <span className="font-semibold">Análise:</span> A MNE é predominante com 13 casos (72% das bacterianas), seguida por MM com 3 casos (17%). A etiologia bacteriana domina com 82% do total.
        </p>
      </div>
    </div>
  );
}

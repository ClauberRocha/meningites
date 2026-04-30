import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const etiologiaData = [
  { name: "Bacteriana", value: 24, color: "hsl(0 72% 55%)" },
  { name: "Viral", value: 6, color: "hsl(210 80% 55%)" },
  { name: "Outras", value: 2, color: "hsl(38 92% 50%)" },
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
    <div className="glass-card p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
      <h3 className="font-display font-semibold text-foreground mb-1">Etiologia dos Casos</h3>
      <p className="text-xs text-muted-foreground mb-4">Classificação dos {total} casos confirmados</p>

      <div className="flex items-center gap-6 mb-5">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={etiologiaData} innerRadius={30} outerRadius={55} paddingAngle={3} dataKey="value" stroke="none">
                {etiologiaData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", color: "#1e293b", fontSize: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }} />
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

      <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
        <p className="text-xs text-destructive">
          <span className="font-semibold">Análise:</span> A etiologia bacteriana predomina com 24 casos (75% do total), seguida pela viral com 6 casos (19%) e outras etiologias com 2 casos (6%).
        </p>
      </div>
    </div>
  );
}

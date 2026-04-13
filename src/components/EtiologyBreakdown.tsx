import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Bacteriana", value: 18, color: "hsl(0 72% 55%)" },
  { name: "Viral", value: 2, color: "hsl(210 80% 55%)" },
  { name: "Outras", value: 1, color: "hsl(38 92% 50%)" },
];

const bacterialDetail = [
  { label: "Meningocócica", value: 3 },
  { label: "Meningo + Meningococcemia", value: 1 },
  { label: "Meningococcemia", value: 0 },
];

const evolution = [
  { label: "Alta", value: 9, pct: "50%", color: "text-success" },
  { label: "Óbito por Meningite", value: 2, pct: "11%", color: "text-destructive" },
  { label: "Internação", value: 7, pct: "39%", color: "text-warning" },
];

export function EtiologyBreakdown() {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Etiologia & Evolução</h3>
      <p className="text-xs text-muted-foreground mb-4">Classificação dos 21 casos confirmados</p>

      <div className="flex items-center gap-6 mb-5">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={30} outerRadius={55} paddingAngle={3} dataKey="value" stroke="none">
                {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(210 28% 12%)",
                  border: "1px solid hsl(210 20% 22%)",
                  borderRadius: "8px",
                  color: "hsl(210 20% 92%)",
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-1.5">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-muted-foreground">{d.name}</span>
              <span className="font-semibold text-foreground">{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/50 pt-4 mb-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Detalhamento Bacteriana</p>
        <div className="space-y-1">
          {bacterialDetail.map((d) => (
            <div key={d.label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{d.label}</span>
              <span className="font-semibold text-foreground">{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/50 pt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Evolução — Bacterianas (18)</p>
        <div className="space-y-1.5">
          {evolution.map((d) => (
            <div key={d.label} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{d.label}</span>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${d.color}`}>{d.value}</span>
                <span className="text-xs text-muted-foreground">({d.pct})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

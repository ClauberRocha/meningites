import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

const weeklyData = [
  { sem: "SE1", conf2025: 1, notif2026: 2, conf2026: 2 },
  { sem: "SE2", conf2025: 0, notif2026: 4, conf2026: 2 },
  { sem: "SE3", conf2025: 5, notif2026: 5, conf2026: 4 },
  { sem: "SE4", conf2025: 1, notif2026: 3, conf2026: 3 },
  { sem: "SE5", conf2025: 2, notif2026: 4, conf2026: 2 },
  { sem: "SE6", conf2025: 5, notif2026: 2, conf2026: 1 },
  { sem: "SE7", conf2025: 1, notif2026: 1, conf2026: 0 },
  { sem: "SE8", conf2025: 0, notif2026: 7, conf2026: 2 },
  { sem: "SE9", conf2025: 5, notif2026: 7, conf2026: 1 },
  { sem: "SE10", conf2025: 2, notif2026: 4, conf2026: 0 },
  { sem: "SE11", conf2025: 4, notif2026: 6, conf2026: 1 },
  { sem: "SE12", conf2025: 3, notif2026: 5, conf2026: 1 },
  { sem: "SE13", conf2025: 2, notif2026: 4, conf2026: 1 },
  { sem: "SE14", conf2025: 3, notif2026: 7, conf2026: 2 },
  { sem: "SE15", conf2025: 0, notif2026: 5, conf2026: 0 },
];

export function EpiChart() {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Distribuição por Semana Epidemiológica</h3>
      <p className="text-xs text-muted-foreground mb-4">Comparação 2025 vs 2026 — SE 01 a SE 15</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyData} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 18%)" />
          <XAxis dataKey="sem" tick={{ fill: "hsl(210 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(210 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(210 28% 12%)",
              border: "1px solid hsl(210 20% 22%)",
              borderRadius: "8px",
              color: "hsl(210 20% 92%)",
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "hsl(210 15% 55%)" }} />
          <Bar dataKey="conf2025" name="Confirmados 2025" fill="hsl(210 80% 55%)" radius={[3, 3, 0, 0]} />
          <Bar dataKey="notif2026" name="Notificados 2026" fill="hsl(38 92% 50%)" radius={[3, 3, 0, 0]} />
          <Bar dataKey="conf2026" name="Confirmados 2026" fill="hsl(174 62% 47%)" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

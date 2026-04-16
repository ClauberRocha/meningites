import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LabelList } from "recharts";

const data = [
  { month: "Janeiro", notificados: 24, confirmados: 11 },
  { month: "Fevereiro", notificados: 21, confirmados: 5 },
  { month: "Março", notificados: 33, confirmados: 3 },
  { month: "Abril", notificados: 4, confirmados: 3 },
];

const tooltipStyle = {
  backgroundColor: "hsl(210 28% 12%)",
  border: "1px solid hsl(210 20% 22%)",
  borderRadius: "8px",
  color: "hsl(210 20% 92%)",
  fontSize: 12,
};

export function CasesByMonth() {
  return (
    <div className="glass-card p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
      <h3 className="font-display font-semibold text-foreground mb-1">Casos Notificados e Confirmados por Mês</h3>
      <p className="text-xs text-muted-foreground mb-4">Evolução mensal — 2026</p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 18%)" />
          <XAxis dataKey="month" tick={{ fill: "hsl(210 15% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(210 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{...tooltipStyle, boxShadow: "0 8px 24px rgba(0,0,0,0.3)"}} cursor={{ fill: 'transparent' }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="notificados" name="Notificados" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="notificados" position="top" fill="hsl(38 92% 50%)" fontSize={11} fontWeight={600} />
          </Bar>
          <Bar dataKey="confirmados" name="Confirmados" fill="hsl(0 72% 55%)" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="confirmados" position="top" fill="hsl(0 72% 55%)" fontSize={11} fontWeight={600} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 p-3 rounded-lg bg-info/10 border border-info/20">
        <p className="text-xs text-info">
          <span className="font-semibold">Análise:</span> Janeiro apresentou o maior número de confirmações (11 casos). Março teve o pico de notificações (33 casos). Abril com dados parciais.
        </p>
      </div>
    </div>
  );
}

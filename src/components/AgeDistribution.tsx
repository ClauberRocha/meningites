import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from "recharts";

const ageData = [
  { faixa: "0-1", casos: 6 },
  { faixa: "1-10", casos: 5 },
  { faixa: "11-20", casos: 3 },
  { faixa: "21-30", casos: 1 },
  { faixa: "31-40", casos: 2 },
  { faixa: "41-50", casos: 3 },
  { faixa: "51-60", casos: 1 },
  { faixa: "61-70", casos: 1 },
];

export function AgeDistribution() {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Faixa Etária</h3>
      <p className="text-xs text-muted-foreground mb-4">Casos confirmados por idade</p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={ageData} layout="vertical" barSize={20}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 18%)" horizontal={false} />
          <XAxis type="number" tick={{ fill: "hsl(210 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis dataKey="faixa" type="category" tick={{ fill: "hsl(210 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} width={45} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(210 28% 12%)",
              border: "1px solid hsl(210 20% 22%)",
              borderRadius: "8px",
              color: "hsl(210 20% 92%)",
              fontSize: 12,
            }}
          />
          <Bar dataKey="casos" name="Casos" fill="hsl(0 72% 55%)" radius={[0, 4, 4, 0]}>
            <LabelList dataKey="casos" position="right" fill="hsl(210 20% 85%)" fontSize={11} fontWeight={600} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const vaccineData = [
  { year: "2020", BCG: 72, HepB: 68, DTP: 65, VIP: 63, Pneumo: 61, TripliceViral: 70, DTPAdulto: 45 },
  { year: "2021", BCG: 74, HepB: 70, DTP: 67, VIP: 65, Pneumo: 64, TripliceViral: 72, DTPAdulto: 48 },
  { year: "2022", BCG: 82, HepB: 78, DTP: 75, VIP: 73, Pneumo: 72, TripliceViral: 79, DTPAdulto: 55 },
  { year: "2023", BCG: 86, HepB: 83, DTP: 80, VIP: 78, Pneumo: 77, TripliceViral: 83, DTPAdulto: 60 },
  { year: "2024", BCG: 89, HepB: 86, DTP: 83, VIP: 81, Pneumo: 80, TripliceViral: 86, DTPAdulto: 64 },
  { year: "2025", BCG: 91, HepB: 88, DTP: 85, VIP: 84, Pneumo: 82, TripliceViral: 88, DTPAdulto: 67 },
];

const vaccines = [
  { key: "BCG", color: "hsl(174 62% 47%)", name: "BCG" },
  { key: "HepB", color: "hsl(210 80% 55%)", name: "Hepatite B" },
  { key: "DTP", color: "hsl(38 92% 50%)", name: "DTP" },
  { key: "VIP", color: "hsl(152 60% 45%)", name: "Poliomielite VIP" },
  { key: "Pneumo", color: "hsl(0 72% 55%)", name: "Pneumocócica" },
  { key: "TripliceViral", color: "hsl(280 60% 55%)", name: "Tríplice Viral" },
  { key: "DTPAdulto", color: "hsl(330 65% 55%)", name: "DTP Adulto" },
];

const tooltipStyle = {
  backgroundColor: "hsl(210 28% 12%)",
  border: "1px solid hsl(210 20% 22%)",
  borderRadius: "8px",
  color: "hsl(210 20% 92%)",
  fontSize: 11,
};

export function VaccineCoverage() {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Cobertura Vacinal de Rotina (2020-2025)</h3>
      <p className="text-xs text-muted-foreground mb-4">Evolução da cobertura vacinal para principais vacinas do calendário infantil</p>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={vaccineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 18%)" />
          <XAxis dataKey="year" tick={{ fill: "hsl(210 15% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis
            domain={[40, 100]}
            tick={{ fill: "hsl(210 15% 55%)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => `${value}%`} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {vaccines.map((v) => (
            <Line
              key={v.key}
              type="monotone"
              dataKey={v.key}
              name={v.name}
              stroke={v.color}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3 p-3 rounded-lg bg-success/10 border border-success/20">
        <p className="text-xs text-success">
          <span className="font-semibold">Nota:</span> Observe o aumento significativo nas coberturas a partir de 2022, refletindo melhoria na execução do PNI. As metas de cobertura (90%) ainda não foram atingidas em várias vacinas, indicando necessidade de intensificação das estratégias de imunização.
        </p>
      </div>
    </div>
  );
}

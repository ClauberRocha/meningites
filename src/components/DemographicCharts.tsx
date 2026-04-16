import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from "recharts";

const sexDataByAge: Record<string, { name: string; value: number; pct: number }[]> = {
  all: [{ name: "Masculino", value: 11, pct: 50 }, { name: "Feminino", value: 11, pct: 50 }],
  "0-1": [{ name: "Masculino", value: 4, pct: 67 }, { name: "Feminino", value: 2, pct: 33 }],
  "1-10": [{ name: "Masculino", value: 2, pct: 40 }, { name: "Feminino", value: 3, pct: 60 }],
  "11-20": [{ name: "Masculino", value: 2, pct: 67 }, { name: "Feminino", value: 1, pct: 33 }],
  "21-30": [{ name: "Masculino", value: 1, pct: 100 }, { name: "Feminino", value: 0, pct: 0 }],
  "31-40": [{ name: "Masculino", value: 0, pct: 0 }, { name: "Feminino", value: 2, pct: 100 }],
  "41-50": [{ name: "Masculino", value: 1, pct: 33 }, { name: "Feminino", value: 2, pct: 67 }],
  "51-60": [{ name: "Masculino", value: 0, pct: 0 }, { name: "Feminino", value: 1, pct: 100 }],
  "61-70": [{ name: "Masculino", value: 1, pct: 50 }, { name: "Feminino", value: 0, pct: 50 }],
};

const raceDataByAge: Record<string, { name: string; value: number; pct: number }[]> = {
  all: [{ name: "Parda", value: 20, pct: 91 }, { name: "Branca", value: 1, pct: 5 }, { name: "Indígena", value: 1, pct: 5 }],
  "0-1": [{ name: "Parda", value: 6, pct: 100 }, { name: "Branca", value: 0, pct: 0 }, { name: "Indígena", value: 0, pct: 0 }],
  "1-10": [{ name: "Parda", value: 4, pct: 80 }, { name: "Branca", value: 1, pct: 20 }, { name: "Indígena", value: 0, pct: 0 }],
  "11-20": [{ name: "Parda", value: 3, pct: 100 }, { name: "Branca", value: 0, pct: 0 }, { name: "Indígena", value: 0, pct: 0 }],
  "21-30": [{ name: "Parda", value: 1, pct: 100 }, { name: "Branca", value: 0, pct: 0 }, { name: "Indígena", value: 0, pct: 0 }],
  "31-40": [{ name: "Parda", value: 2, pct: 100 }, { name: "Branca", value: 0, pct: 0 }, { name: "Indígena", value: 0, pct: 0 }],
  "41-50": [{ name: "Parda", value: 2, pct: 67 }, { name: "Branca", value: 0, pct: 0 }, { name: "Indígena", value: 1, pct: 33 }],
  "51-60": [{ name: "Parda", value: 1, pct: 100 }, { name: "Branca", value: 0, pct: 0 }, { name: "Indígena", value: 0, pct: 0 }],
  "61-70": [{ name: "Parda", value: 1, pct: 100 }, { name: "Branca", value: 0, pct: 0 }, { name: "Indígena", value: 0, pct: 0 }],
};

const SEX_COLORS = ["hsl(210 80% 55%)", "hsl(330 65% 55%)"];

const tooltipStyle = {
  backgroundColor: "hsl(210 28% 12%)",
  border: "1px solid hsl(210 20% 22%)",
  borderRadius: "8px",
  color: "hsl(210 20% 92%)",
  fontSize: 12,
};

const sexTooltipStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  color: "#1e293b",
  fontSize: 12,
  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
};

const raceTooltipStyle = {
  backgroundColor: "hsl(210 28% 12%)",
  border: "1px solid hsl(210 20% 22%)",
  borderRadius: "8px",
  color: "hsl(210 20% 92%)",
  fontSize: 12,
  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
};

export function DemographicCharts({ ageGroup }: { ageGroup: string }) {
  const sexData = sexDataByAge[ageGroup] || sexDataByAge.all;
  const raceData = raceDataByAge[ageGroup] || raceDataByAge.all;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Sexo */}
      <div className="glass-card p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
        <h3 className="font-display font-semibold text-foreground mb-1">Por Sexo</h3>
        <p className="text-xs text-muted-foreground mb-4">Distribuição dos casos confirmados</p>
        <div className="flex items-center gap-6">
          <div className="w-28 h-28">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sexData} innerRadius={25} outerRadius={50} paddingAngle={3} dataKey="value" stroke="none">
                  {sexData.map((_, i) => <Cell key={i} fill={SEX_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={sexTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {sexData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: SEX_COLORS[i] }} />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="font-bold text-foreground">{d.value}</span>
                <span className="text-xs text-muted-foreground">({d.pct}%)</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-info/10 border border-info/20">
          <p className="text-xs text-info">
            <span className="font-semibold">Análise:</span> Distribuição equilibrada entre os sexos (50%/50%), consistente com o perfil epidemiológico da doença.
          </p>
        </div>
      </div>

      {/* Raça/Cor */}
      <div className="glass-card p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
        <h3 className="font-display font-semibold text-foreground mb-1">Por Raça/Cor</h3>
        <p className="text-xs text-muted-foreground mb-4">Distribuição dos casos confirmados</p>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={raceData} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 18%)" />
            <XAxis dataKey="name" tick={{ fill: "hsl(210 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(210 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={raceTooltipStyle} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="value" name="Casos" fill="hsl(0 72% 55%)" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="value" position="top" fill="hsl(210 20% 85%)" fontSize={11} fontWeight={600} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
          <p className="text-xs text-warning">
            <span className="font-semibold">Análise:</span> Expressiva predominância de indivíduos pardos (91%), refletindo o perfil étnico-racial da população maranhense.
          </p>
        </div>
      </div>
    </div>
  );
}

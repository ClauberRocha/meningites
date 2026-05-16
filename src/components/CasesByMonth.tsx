import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LabelList, Cell } from "recharts";

const data = [
  { month: "Janeiro", notificados: 24, confirmados: 11 },
  { month: "Fevereiro", notificados: 21, confirmados: 7 },
  { month: "Março", notificados: 37, confirmados: 12 },
  { month: "Abril", notificados: 34, confirmados: 14 },
  { month: "Maio", notificados: 7, confirmados: 1 },
];

// Cores semânticas por nível de risco (baseado em confirmados)
const maxConf = Math.max(...data.map((d) => d.confirmados));
const minConf = Math.min(...data.map((d) => d.confirmados));
const riskColor = (v: number) => {
  if (v === maxConf) return "hsl(0 84% 60%)"; // vermelho — maior risco
  if (v === minConf) return "hsl(160 84% 39%)"; // verde — menor risco
  return "hsl(38 92% 50%)"; // amarelo — intermediário
};

const tooltipStyle = {
  backgroundColor: "hsl(210 28% 12%)",
  border: "1px solid hsl(210 20% 22%)",
  borderRadius: "8px",
  color: "hsl(210 20% 92%)",
  fontSize: 12,
};

const legendPayload = [
  { value: "Notificados", type: "square" as const, id: "notificados", color: "hsl(217 91% 60%)" },
  { value: "Confirmados", type: "square" as const, id: "confirmados", color: "hsl(var(--foreground))" },
];

const renderCasesTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  label?: string;
  payload?: Array<{
    color?: string;
    fill?: string;
    name?: string;
    value?: number | string;
  }>;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div style={{ ...tooltipStyle, boxShadow: "0 8px 24px rgba(0,0,0,0.3)", padding: 12 }}>
      <p className="mb-2 text-xs font-semibold text-foreground">{label}</p>
      <ul className="space-y-1.5">
        {payload.map((entry, index) => {
          const isConfirmed = entry.name === "Confirmados";

          return (
            <li key={`${entry.name ?? "item"}-${index}`} className="flex items-center gap-2 text-xs">
              <span
                className="h-2.5 w-2.5 rounded-[2px] border border-border/50"
                style={{ backgroundColor: isConfirmed ? "hsl(var(--foreground))" : entry.color ?? entry.fill }}
              />
              <span className={isConfirmed ? "text-foreground" : "text-muted-foreground"}>
                {entry.name}: <span className="font-semibold">{entry.value}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
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
          <Tooltip content={renderCasesTooltip} cursor={{ fill: 'transparent' }} />
          <Legend
            wrapperStyle={{ fontSize: 12 }}
            payload={legendPayload}
            content={({ payload }) => (
              <ul className="flex items-center justify-center gap-6 text-xs">
                {payload?.map((entry) => {
                  const isConfirmed = entry.value === "Confirmados";

                  return (
                    <li key={`${entry.id ?? entry.value}`} className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-[2px] border border-border/50"
                        style={{ backgroundColor: String(entry.color) }}
                      />
                      <span className={isConfirmed ? "text-foreground" : "text-muted-foreground"}>{entry.value}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          />
          <Bar dataKey="notificados" name="Notificados" fill="hsl(217 91% 60%)" fillOpacity={0.55} radius={[4, 4, 0, 0]}>
            <LabelList dataKey="notificados" position="top" fill="hsl(217 91% 75%)" fontSize={11} fontWeight={600} />
          </Bar>
          <Bar dataKey="confirmados" name="Confirmados" radius={[4, 4, 0, 0]}>
            {data.map((d) => (
              <Cell key={d.month} fill={riskColor(d.confirmados)} />
            ))}
            <LabelList dataKey="confirmados" position="top" fill="#ffffff" fontSize={11} fontWeight={700} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 p-3 rounded-lg bg-info/10 border border-info/20">
        <p className="text-xs text-info">
          <span className="font-semibold">Análise:</span> Abril concentrou o maior número de confirmações (14 casos), seguido por Março (12) e Janeiro (11). Março liderou em notificações (37 casos). Acumulado: 123 notificados e 45 confirmados em 2026.
        </p>
      </div>
    </div>
  );
}

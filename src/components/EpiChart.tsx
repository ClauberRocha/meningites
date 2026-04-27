import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, LabelList } from "recharts";

const allWeeklyData = [
  { sem: "SE1", conf2025: 2, notif2026: 2, conf2026: 0 },
  { sem: "SE2", conf2025: 0, notif2026: 7, conf2026: 2 },
  { sem: "SE3", conf2025: 5, notif2026: 7, conf2026: 4 },
  { sem: "SE4", conf2025: 1, notif2026: 4, conf2026: 3 },
  { sem: "SE5", conf2025: 2, notif2026: 6, conf2026: 2 },
  { sem: "SE6", conf2025: 5, notif2026: 5, conf2026: 1 },
  { sem: "SE7", conf2025: 1, notif2026: 4, conf2026: 0 },
  { sem: "SE8", conf2025: 0, notif2026: 7, conf2026: 2 },
  { sem: "SE9", conf2025: 5, notif2026: 5, conf2026: 1 },
  { sem: "SE10", conf2025: 2, notif2026: 4, conf2026: 0 },
  { sem: "SE11", conf2025: 4, notif2026: 6, conf2026: 1 },
  { sem: "SE12", conf2025: 3, notif2026: 13, conf2026: 1 },
  { sem: "SE13", conf2025: 2, notif2026: 6, conf2026: 1 },
  { sem: "SE14", conf2025: 3, notif2026: 10, conf2026: 5 },
  { sem: "SE15", conf2025: 0, notif2026: 6, conf2026: 1 },
  { sem: "SE16", conf2025: 2, notif2026: 1, conf2026: 0 },
];

interface EpiChartProps {
  startWeek?: number;
  endWeek?: number;
}

export function EpiChart({ startWeek = 1, endWeek = 16 }: EpiChartProps) {
  const weeklyData = allWeeklyData.slice(startWeek - 1, endWeek);
  const totalNotif = weeklyData.reduce((s, d) => s + d.notif2026, 0);
  const totalConf2026 = weeklyData.reduce((s, d) => s + d.conf2026, 0);
  const totalConf2025 = weeklyData.reduce((s, d) => s + d.conf2025, 0);
  const taxa = totalNotif > 0 ? ((totalConf2026 / totalNotif) * 100).toFixed(1) : "0";

  // Identificar picos no período filtrado
  const maxNotif = weeklyData.reduce((max, d) => (d.notif2026 > max.notif2026 ? d : max), weeklyData[0] || { sem: "-", notif2026: 0, conf2026: 0, conf2025: 0 });
  const maxConf = weeklyData.reduce((max, d) => (d.conf2026 > max.conf2026 ? d : max), weeklyData[0] || { sem: "-", notif2026: 0, conf2026: 0, conf2025: 0 });
  const maxConf2025 = weeklyData.reduce((max, d) => (d.conf2025 > max.conf2025 ? d : max), weeklyData[0] || { sem: "-", notif2026: 0, conf2026: 0, conf2025: 0 });
  const mediaConf = weeklyData.length > 0 ? (totalConf2026 / weeklyData.length).toFixed(1) : "0";
  const mediaNotif = weeklyData.length > 0 ? (totalNotif / weeklyData.length).toFixed(1) : "0";

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <span className="text-muted-foreground">Confirmados 2025: <span className="font-bold" style={{ color: "hsl(210 80% 55%)" }}>{totalConf2025}</span></span>
        <span className="text-muted-foreground">Notificados 2026: <span className="font-bold" style={{ color: "hsl(38 92% 50%)" }}>{totalNotif}</span></span>
        <span className="text-muted-foreground">Confirmados 2026: <span className="font-bold" style={{ color: "hsl(0 72% 55%)" }}>{totalConf2026}</span></span>
        <span className="text-muted-foreground">Taxa de confirmação: <span className="font-bold text-foreground">{taxa}%</span></span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={weeklyData}>
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
          <Line type="monotone" dataKey="conf2025" name="Confirmados 2025" stroke="hsl(210 80% 55%)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }}>
            <LabelList dataKey="conf2025" position="top" fill="hsl(210 80% 55%)" fontSize={10} fontWeight={600} />
          </Line>
          <Line type="monotone" dataKey="notif2026" name="Notificados 2026" stroke="hsl(38 92% 50%)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }}>
            <LabelList dataKey="notif2026" position="top" fill="hsl(38 92% 50%)" fontSize={10} fontWeight={600} />
          </Line>
          <Line type="monotone" dataKey="conf2026" name="Confirmados 2026" stroke="hsl(0 72% 55%)" strokeWidth={3.5} dot={{ r: 4 }} activeDot={{ r: 6 }}>
            <LabelList dataKey="conf2026" position="top" fill="hsl(0 72% 55%)" fontSize={10} fontWeight={600} />
          </Line>
        </LineChart>
      </ResponsiveContainer>

      {/* Análise de picos */}
      <div className="mt-5 p-4 rounded-lg bg-secondary/40 border border-border">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          Análise de Picos — {weeklyData[0]?.sem || "-"} a {weeklyData[weeklyData.length - 1]?.sem || "-"}
        </h4>
        <ul className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
          <li>
            <span className="font-semibold" style={{ color: "hsl(38 92% 50%)" }}>Pico de notificações (2026):</span>{" "}
            <span className="text-foreground font-bold">{maxNotif.sem}</span> com{" "}
            <span className="text-foreground font-bold">{maxNotif.notif2026}</span> casos notificados
            (média do período: {mediaNotif}).
          </li>
          <li>
            <span className="font-semibold" style={{ color: "hsl(0 72% 55%)" }}>Pico de confirmados (2026):</span>{" "}
            <span className="text-foreground font-bold">{maxConf.sem}</span> com{" "}
            <span className="text-foreground font-bold">{maxConf.conf2026}</span> casos confirmados
            (média do período: {mediaConf}).
          </li>
          <li>
            <span className="font-semibold" style={{ color: "hsl(210 80% 55%)" }}>Pico de confirmados (2025):</span>{" "}
            <span className="text-foreground font-bold">{maxConf2025.sem}</span> com{" "}
            <span className="text-foreground font-bold">{maxConf2025.conf2025}</span> casos confirmados
            no mesmo período comparativo.
          </li>
          <li className="pt-1 text-xs">
            No intervalo selecionado, foram registrados <span className="text-foreground font-bold">{totalNotif}</span> notificados
            e <span className="text-foreground font-bold">{totalConf2026}</span> confirmados em 2026,
            resultando em taxa de confirmação de <span className="text-foreground font-bold">{taxa}%</span>.
          </li>
        </ul>
      </div>
    </div>
  );
}

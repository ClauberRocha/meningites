import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, LabelList } from "recharts";

const allWeeklyData = [
  // mediaHist = média 2021-2025 estimada para confirmados
  { sem: "SE1",  conf2025: 2, notif2026: 2,  conf2026: 1, mediaHist: 1.8 },
  { sem: "SE2",  conf2025: 0, notif2026: 7,  conf2026: 2, mediaHist: 1.6 },
  { sem: "SE3",  conf2025: 5, notif2026: 7,  conf2026: 4, mediaHist: 3.2 },
  { sem: "SE4",  conf2025: 1, notif2026: 4,  conf2026: 3, mediaHist: 2.0 },
  { sem: "SE5",  conf2025: 2, notif2026: 6,  conf2026: 2, mediaHist: 2.4 },
  { sem: "SE6",  conf2025: 5, notif2026: 5,  conf2026: 2, mediaHist: 3.0 },
  { sem: "SE7",  conf2025: 1, notif2026: 4,  conf2026: 0, mediaHist: 1.8 },
  { sem: "SE8",  conf2025: 0, notif2026: 7,  conf2026: 2, mediaHist: 1.4 },
  { sem: "SE9",  conf2025: 5, notif2026: 5,  conf2026: 2, mediaHist: 3.4 },
  { sem: "SE10", conf2025: 2, notif2026: 5,  conf2026: 0, mediaHist: 2.0 },
  { sem: "SE11", conf2025: 4, notif2026: 6,  conf2026: 2, mediaHist: 2.8 },
  { sem: "SE12", conf2025: 3, notif2026: 13, conf2026: 2, mediaHist: 2.6 },
  { sem: "SE13", conf2025: 2, notif2026: 6,  conf2026: 1, mediaHist: 2.2 },
  { sem: "SE14", conf2025: 3, notif2026: 10, conf2026: 6, mediaHist: 2.8 },
  { sem: "SE15", conf2025: 0, notif2026: 7,  conf2026: 1, mediaHist: 1.6 },
  { sem: "SE16", conf2025: 2, notif2026: 1,  conf2026: 0, mediaHist: 1.8 },
  { sem: "SE17", conf2025: 3, notif2026: 2,  conf2026: 2, mediaHist: 2.2 },
];

interface EpiChartProps {
  startWeek?: number;
  endWeek?: number;
}

export function EpiChart({ startWeek = 1, endWeek = 17 }: EpiChartProps) {
  const baseData = allWeeklyData.slice(startWeek - 1, endWeek);

  // Regressão linear simples sobre confirmados 2026
  const n = baseData.length;
  const xs = baseData.map((_, i) => i);
  const ys = baseData.map((d) => d.conf2026);
  const sumX = xs.reduce((a, b) => a + b, 0);
  const sumY = ys.reduce((a, b) => a + b, 0);
  const sumXY = xs.reduce((a, x, i) => a + x * ys[i], 0);
  const sumXX = xs.reduce((a, x) => a + x * x, 0);
  const denom = n * sumXX - sumX * sumX;
  const slope = denom !== 0 ? (n * sumXY - sumX * sumY) / denom : 0;
  const intercept = n > 0 ? (sumY - slope * sumX) / n : 0;
  const weeklyData = baseData.map((d, i) => ({
    ...d,
    tendencia: Number((intercept + slope * i).toFixed(2)),
  }));

  const trendDir = slope > 0.05 ? "Alta" : slope < -0.05 ? "Queda" : "Estável";
  const trendColor = slope > 0.05 ? "hsl(0 84% 60%)" : slope < -0.05 ? "hsl(160 84% 39%)" : "hsl(38 92% 50%)";
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
        <span className="text-muted-foreground">Tendência: <span className="font-bold" style={{ color: trendColor }}>{trendDir}</span></span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={weeklyData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="2 6" stroke="hsl(210 20% 22%)" vertical={false} />
          <XAxis dataKey="sem" tick={{ fill: "hsl(210 15% 70%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(210 15% 70%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(210 28% 12%)",
              border: "1px solid hsl(210 20% 22%)",
              borderRadius: "8px",
              color: "hsl(210 20% 92%)",
              fontSize: 12,
            }}
            cursor={{ stroke: "hsl(210 20% 35%)", strokeWidth: 1, strokeDasharray: "3 3" }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "hsl(210 15% 70%)", paddingTop: 8 }} iconType="circle" />
          <Line
            type="monotone"
            dataKey="conf2025"
            name="Confirmados 2025"
            stroke="hsl(217 91% 70%)"
            strokeWidth={1.5}
            strokeDasharray="5 4"
            strokeOpacity={0.5}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="mediaHist"
            name="Média histórica (3 anos)"
            stroke="hsl(210 15% 60%)"
            strokeWidth={1.25}
            strokeDasharray="2 6"
            strokeOpacity={0.55}
            dot={false}
            activeDot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="notif2026"
            name="Notificados 2026"
            stroke="hsl(38 92% 55%)"
            strokeWidth={1.75}
            strokeOpacity={0.65}
            dot={{ r: 2.5, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="conf2026"
            name="Confirmados 2026"
            stroke="hsl(0 84% 60%)"
            strokeWidth={4}
            dot={{ r: 4, fill: "hsl(0 84% 60%)", stroke: "hsl(210 28% 10%)", strokeWidth: 2 }}
            activeDot={{ r: 7 }}
          >
            <LabelList dataKey="conf2026" position="top" fill="hsl(0 84% 75%)" fontSize={11} fontWeight={700} offset={10} />
          </Line>
          <Line
            type="linear"
            dataKey="tendencia"
            name="Tendência (regressão)"
            stroke={trendColor}
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={false}
            activeDot={false}
          />
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

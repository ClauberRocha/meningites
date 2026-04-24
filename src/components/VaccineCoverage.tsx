import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const vaccineData = [
  {
    year: "2020",
    BCG: 18.98, HepB30: 16.51, HepB1: 35.80, DTP: 36.03, FA: 32.61, VIP: 38.02,
    Pneumo: 43.26, MeningoC: 40.20, Penta: 35.80, Rotavirus: 39.79, HepA: 35.42,
    DTPRef: 30.90, TViralD1: 45.89, TViralD2: 21.82, PneumoRef: 40.10, PolioRef: 33.91,
    Varicela: 32.48, MenigoCRef: 39.02, dTpa: 27.78,
  },
  {
    year: "2021",
    BCG: 30.73, HepB30: 26.71, HepB1: 47.50, DTP: 48.65, FA: 40.98, VIP: 47.61,
    Pneumo: 52.62, MeningoC: 50.76, Penta: 47.50, Rotavirus: 49.41, HepA: 43.33,
    DTPRef: 43.08, TViralD1: 53.87, TViralD2: 25.64, PneumoRef: 50.90, PolioRef: 40.35,
    Varicela: 42.01, MenigoCRef: 50.99, dTpa: 39.43,
  },
  {
    year: "2022",
    BCG: 75.04, HepB30: 64.17, HepB1: 56.30, DTP: 56.30, FA: 46.50, VIP: 57.13,
    Pneumo: 63.48, MeningoC: 59.45, Penta: 56.30, Rotavirus: 59.12, HepA: 47.17,
    DTPRef: 44.94, TViralD1: 58.27, TViralD2: 31.97, PneumoRef: 55.90, PolioRef: 43.57,
    Varicela: 52.01, MenigoCRef: 55.27, dTpa: 40.01,
  },
  {
    year: "2023",
    BCG: 75.08, HepB30: 73.51, HepB1: 72.73, DTP: 72.75, FA: 63.14, VIP: 72.82,
    Pneumo: 78.47, MeningoC: 73.50, Penta: 72.69, Rotavirus: 75.44, HepA: 71.04,
    DTPRef: 61.18, TViralD1: 70.94, TViralD2: 41.77, PneumoRef: 73.00, PolioRef: 62.58,
    Varicela: 56.60, MenigoCRef: 76.07, dTpa: 75.54,
  },
  {
    year: "2024",
    BCG: 80.43, HepB30: 78.37, HepB1: 78.05, DTP: 78.10, FA: 57.02, VIP: 78.28,
    Pneumo: 86.45, MeningoC: 79.08, Penta: 78.05, Rotavirus: 82.67, HepA: 79.85,
    DTPRef: 78.82, TViralD1: 85.11, TViralD2: 54.59, PneumoRef: 87.79, PolioRef: 79.61,
    Varicela: 59.19, MenigoCRef: 85.03, dTpa: 84.45,
  },
  {
    year: "2025",
    BCG: 90.81, HepB30: 90.99, HepB1: 85.36, DTP: 85.49, FA: 68.06, VIP: 82.03,
    Pneumo: 90.06, MeningoC: 85.58, Penta: 83.58, Rotavirus: 85.28, HepA: 78.96,
    DTPRef: 82.95, TViralD1: 90.07, TViralD2: 72.49, PneumoRef: 87.03, PolioRef: 71.40,
    Varicela: 71.40, MenigoCRef: 87.39, dTpa: 100.60,
  },
  {
    year: "2026",
    BCG: 79.47, HepB30: 82.54, HepB1: 90.07, DTP: 90.07, FA: 85.00, VIP: 90.53,
    Pneumo: 91.31, MeningoC: 91.59, Penta: 90.07, Rotavirus: 88.77, HepA: 83.62,
    DTPRef: 81.27, TViralD1: 90.77, TViralD2: 81.27, PneumoRef: 87.43, PolioRef: 84.66,
    Varicela: 78.46, MenigoCRef: 89.12, dTpa: 0,
  },
];

const vaccines = [
  { key: "BCG", color: "hsl(174 62% 47%)", name: "BCG", meta: 90 },
  { key: "HepB30", color: "hsl(210 80% 55%)", name: "Hepatite B (<30 dias)", meta: 95 },
  { key: "HepB1", color: "hsl(38 92% 50%)", name: "Hepatite B (<1 ano)", meta: 95 },
  { key: "DTP", color: "hsl(0 72% 55%)", name: "DTP", meta: 95 },
  { key: "FA", color: "hsl(280 60% 55%)", name: "FA (<1 ano)", meta: 100 },
  { key: "VIP", color: "hsl(152 60% 45%)", name: "Poliomielite VIP Injetável (<1 ano)", meta: 95 },
  { key: "Pneumo", color: "hsl(330 65% 55%)", name: "Pneumocócica (<1 ano)", meta: 95 },
  { key: "MeningoC", color: "hsl(45 90% 50%)", name: "Meningocócica Conj.C (<1 ano)", meta: 95 },
  { key: "Penta", color: "hsl(200 70% 50%)", name: "Pentavalente (<1 ano)", meta: 95 },
  { key: "Rotavirus", color: "hsl(120 50% 45%)", name: "Rotavírus Humano", meta: 95 },
  { key: "HepA", color: "hsl(15 80% 55%)", name: "Hepatite A Infantil", meta: 95 },
  { key: "DTPRef", color: "hsl(260 50% 55%)", name: "DTP (1º reforço)", meta: 95 },
  { key: "TViralD1", color: "hsl(340 70% 50%)", name: "Tríplice Viral - D1", meta: 95 },
  { key: "TViralD2", color: "hsl(190 70% 45%)", name: "Tríplice Viral - D2", meta: 95 },
  { key: "PneumoRef", color: "hsl(60 70% 45%)", name: "Pneumocócica (1º reforço)", meta: 95 },
  { key: "PolioRef", color: "hsl(100 50% 50%)", name: "Polio Injetável (VIP) (Reforço)", meta: 95 },
  { key: "Varicela", color: "hsl(310 60% 50%)", name: "Varicela", meta: 95 },
  { key: "MenigoCRef", color: "hsl(230 60% 55%)", name: "Meningocócica Conj.C 1º reforço", meta: 95 },
  { key: "dTpa", color: "hsl(0 0% 55%)", name: "dTpa adulto", meta: 100 },
];

const allKeys = vaccines.map((v) => v.key);
const years = vaccineData.map((d) => d.year);

const tooltipStyle = {
  backgroundColor: "hsl(210 28% 12%)",
  border: "1px solid hsl(210 20% 22%)",
  borderRadius: "8px",
  color: "hsl(210 20% 92%)",
  fontSize: 11,
};

export function VaccineCoverage() {
  const [startYear, setStartYear] = useState("2020");
  const [endYear, setEndYear] = useState("2026");
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([...allKeys]);

  const allSelected = selectedVaccines.length === allKeys.length;

  const toggleVaccine = (key: string) => {
    setSelectedVaccines((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleAll = () => {
    setSelectedVaccines(allSelected ? [] : [...allKeys]);
  };

  const filteredData = useMemo(() => {
    const si = years.indexOf(startYear);
    const ei = years.indexOf(endYear);
    return vaccineData.slice(Math.min(si, ei), Math.max(si, ei) + 1);
  }, [startYear, endYear]);

  const activeVaccines = vaccines.filter((v) => selectedVaccines.includes(v.key));

  const latestData = filteredData[filteredData.length - 1];

  const comparison = useMemo(() => {
    const startData = vaccineData.find((d) => d.year === startYear);
    const endData = vaccineData.find((d) => d.year === endYear);
    if (!startData || !endData) return [];

    return activeVaccines.map((v) => {
      const initial = startData[v.key as keyof typeof startData] as number;
      const final = endData[v.key as keyof typeof endData] as number;
      const diff = +(final - initial).toFixed(2);
      return { ...v, initial, final, diff };
    });
  }, [startYear, endYear, selectedVaccines]);

  const avgDiff = comparison.length > 0
    ? (comparison.reduce((s, c) => s + c.diff, 0) / comparison.length).toFixed(1)
    : "0";

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-1">Cobertura Vacinal de Rotina</h3>
      <p className="text-xs text-muted-foreground mb-4">Evolução da cobertura vacinal para principais vacinas do calendário infantil</p>

      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Ano Inicial</label>
          <select
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="bg-secondary text-secondary-foreground border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {years.map((y) => (<option key={y} value={y}>{y}</option>))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Ano Final</label>
          <select
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="bg-secondary text-secondary-foreground border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {years.map((y) => (<option key={y} value={y}>{y}</option>))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5 p-3 bg-secondary/20 rounded-lg border border-border/30">
        <div className="flex items-center gap-2 mr-2">
          <Checkbox checked={allSelected} onCheckedChange={toggleAll} id="all-vaccines" />
          <label htmlFor="all-vaccines" className="text-xs font-semibold text-foreground cursor-pointer">Todas</label>
        </div>
        <div className="w-px h-5 bg-border/50" />
        {vaccines.map((v) => {
          const currentPct = latestData ? (latestData[v.key as keyof typeof latestData] as number) : null;
          return (
            <div key={v.key} className="flex items-center gap-1.5">
              <Checkbox
                checked={selectedVaccines.includes(v.key)}
                onCheckedChange={() => toggleVaccine(v.key)}
                id={`vaccine-${v.key}`}
              />
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: v.color }} />
              <label htmlFor={`vaccine-${v.key}`} className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                {v.name}
                {selectedVaccines.includes(v.key) && currentPct !== null && (
                  <>
                    <span className="ml-1 text-muted-foreground">(META {v.meta}%)</span>
                    <span className={`ml-1 font-semibold ${currentPct >= v.meta ? 'text-success' : 'text-destructive'}`}>
                      {currentPct}% — {currentPct >= v.meta ? `✓ Alcançada (+${(currentPct - v.meta).toFixed(1)}pp)` : `✗ Não alcançada (${(currentPct - v.meta).toFixed(1)}pp)`}
                    </span>
                  </>
                )}
              </label>
            </div>
          );
        })}
      </div>

      {activeVaccines.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 18%)" />
            <XAxis dataKey="year" tick={{ fill: "hsl(210 15% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              domain={[0, 110]}
              tick={{ fill: "hsl(210 15% 55%)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => `${value}%`} />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            {activeVaccines.map((v) => (
              <Line
                key={v.key}
                type="monotone"
                dataKey={v.key}
                name={v.name}
                stroke={v.color}
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-[400px] text-muted-foreground text-sm">
          Selecione ao menos uma vacina para visualizar o gráfico.
        </div>
      )}

      {startYear !== endYear && comparison.length > 0 && (
        <div className="mt-5 border-t border-border/50 pt-5">
          <h4 className="text-sm font-display font-semibold text-foreground mb-3">
            Comparativo {startYear} → {endYear}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {comparison.map((c) => {
              const isUp = c.diff > 0;
              const isDown = c.diff < 0;
              return (
                <div key={c.key} className="p-3 bg-secondary/30 rounded-lg flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground truncate">{c.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{c.initial}%</span>
                      <span className="text-xs text-muted-foreground">→</span>
                      <span className="text-xs text-muted-foreground">{c.final}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {isUp && <TrendingUp className="w-3.5 h-3.5 text-success" />}
                    {isDown && <TrendingDown className="w-3.5 h-3.5 text-destructive" />}
                    {!isUp && !isDown && <Minus className="w-3.5 h-3.5 text-muted-foreground" />}
                    <span className={`text-sm font-bold ${isUp ? "text-success" : isDown ? "text-destructive" : "text-muted-foreground"}`}>
                      {isUp ? "+" : ""}{c.diff}pp
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`p-3 rounded-lg border ${
            Number(avgDiff) > 0
              ? "bg-success/10 border-success/20"
              : Number(avgDiff) < 0
              ? "bg-destructive/10 border-destructive/20"
              : "bg-secondary/30 border-border/50"
          }`}>
            <p className={`text-xs ${
              Number(avgDiff) > 0 ? "text-success" : Number(avgDiff) < 0 ? "text-destructive" : "text-muted-foreground"
            }`}>
              <span className="font-semibold">Resumo ({startYear} → {endYear}):</span>{" "}
              {Number(avgDiff) > 0
                ? `Houve aumento médio de +${avgDiff} pontos percentuais na cobertura vacinal.`
                : Number(avgDiff) < 0
                ? `Houve redução média de ${avgDiff} pontos percentuais na cobertura vacinal.`
                : "Não houve variação significativa na cobertura vacinal no período selecionado."
              }
            </p>
          </div>
        </div>
      )}

      <div className="mt-3 p-3 rounded-lg bg-info/10 border border-info/20">
        <p className="text-xs text-info">
          <span className="font-semibold">Nota:</span> As metas de cobertura ainda não foram atingidas em várias vacinas, indicando necessidade de intensificação das estratégias de imunização.
        </p>
      </div>
    </div>
  );
}

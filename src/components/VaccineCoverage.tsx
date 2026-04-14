import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [endYear, setEndYear] = useState("2025");
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

  const clearFilters = () => {
    setStartYear("2020");
    setEndYear("2025");
    setSelectedVaccines([...allKeys]);
  };

  const filteredData = useMemo(() => {
    const si = years.indexOf(startYear);
    const ei = years.indexOf(endYear);
    return vaccineData.slice(Math.min(si, ei), Math.max(si, ei) + 1);
  }, [startYear, endYear]);

  const activeVaccines = vaccines.filter((v) => selectedVaccines.includes(v.key));

  const comparison = useMemo(() => {
    const startData = vaccineData.find((d) => d.year === startYear);
    const endData = vaccineData.find((d) => d.year === endYear);
    if (!startData || !endData) return [];

    return activeVaccines.map((v) => {
      const initial = startData[v.key as keyof typeof startData] as number;
      const final = endData[v.key as keyof typeof endData] as number;
      const diff = final - initial;
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

      {/* Filtros de Ano */}
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Ano Inicial</label>
          <select
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="bg-secondary text-secondary-foreground border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Ano Final</label>
          <select
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="bg-secondary text-secondary-foreground border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <button
          onClick={clearFilters}
          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          Limpar Filtros
        </button>
      </div>

      {/* Seleção de Vacinas */}
      <div className="flex flex-wrap items-center gap-3 mb-5 p-3 bg-secondary/20 rounded-lg border border-border/30">
        <div className="flex items-center gap-2 mr-2">
          <Checkbox
            checked={allSelected}
            onCheckedChange={toggleAll}
            id="all-vaccines"
          />
          <label htmlFor="all-vaccines" className="text-xs font-semibold text-foreground cursor-pointer">
            Todas
          </label>
        </div>
        <div className="w-px h-5 bg-border/50" />
        {vaccines.map((v) => (
          <div key={v.key} className="flex items-center gap-1.5">
            <Checkbox
              checked={selectedVaccines.includes(v.key)}
              onCheckedChange={() => toggleVaccine(v.key)}
              id={`vaccine-${v.key}`}
            />
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: v.color }} />
            <label htmlFor={`vaccine-${v.key}`} className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              {v.name}
            </label>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      {activeVaccines.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={filteredData}>
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
            {activeVaccines.map((v) => (
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
      ) : (
        <div className="flex items-center justify-center h-[350px] text-muted-foreground text-sm">
          Selecione ao menos uma vacina para visualizar o gráfico.
        </div>
      )}

      {/* Análise Comparativa */}
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

          {/* Resumo */}
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
                ? `Houve aumento médio de +${avgDiff} pontos percentuais na cobertura vacinal. Todas as ${comparison.filter(c => c.diff > 0).length} vacinas com variação positiva demonstram melhoria na execução do programa de imunização.`
                : Number(avgDiff) < 0
                ? `Houve redução média de ${avgDiff} pontos percentuais na cobertura vacinal, indicando necessidade urgente de intensificação das estratégias de imunização.`
                : "Não houve variação significativa na cobertura vacinal no período selecionado."
              }
              {" "}
              {comparison.length > 0 && (
                <>
                  Maior variação: <span className="font-bold">{
                    comparison.reduce((max, c) => Math.abs(c.diff) > Math.abs(max.diff) ? c : max).name
                  }</span> ({comparison.reduce((max, c) => Math.abs(c.diff) > Math.abs(max.diff) ? c : max).diff > 0 ? "+" : ""}
                  {comparison.reduce((max, c) => Math.abs(c.diff) > Math.abs(max.diff) ? c : max).diff}pp).
                  {" "}Menor variação: <span className="font-bold">{
                    comparison.reduce((min, c) => Math.abs(c.diff) < Math.abs(min.diff) ? c : min).name
                  }</span> ({comparison.reduce((min, c) => Math.abs(c.diff) < Math.abs(min.diff) ? c : min).diff > 0 ? "+" : ""}
                  {comparison.reduce((min, c) => Math.abs(c.diff) < Math.abs(min.diff) ? c : min).diff}pp).
                </>
              )}
            </p>
          </div>
        </div>
      )}

      <div className="mt-3 p-3 rounded-lg bg-info/10 border border-info/20">
        <p className="text-xs text-info">
          <span className="font-semibold">Nota:</span> As metas de cobertura (90% para maioria das vacinas) ainda não foram atingidas em várias vacinas, indicando necessidade de intensificação das estratégias de imunização.
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Activity, Users, AlertTriangle, CheckCircle, Search, Skull, TrendingUp, Shield } from "lucide-react";
import { KpiCard } from "@/components/KpiCard";
import { EpiChart } from "@/components/EpiChart";
import { AgeDistribution } from "@/components/AgeDistribution";
import { RegionalTable } from "@/components/RegionalTable";
import { EtiologyBreakdown } from "@/components/EtiologyBreakdown";
import { ConfirmationCriteria } from "@/components/ConfirmationCriteria";
import { DemographicCharts } from "@/components/DemographicCharts";
import { CasesByMonth } from "@/components/CasesByMonth";
import { GeographicHeatmap } from "@/components/GeographicHeatmap";
import { MunicipalityChart } from "@/components/MunicipalityChart";
import { CaseEvolution } from "@/components/CaseEvolution";
import { VaccineCoverage } from "@/components/VaccineCoverage";
import { AlertsSection } from "@/components/AlertsSection";
import { GlossarySection } from "@/components/GlossarySection";
import { AnalysisCard } from "@/components/AnalysisCard";

const Index = () => {
  const [ageGroup, setAgeGroup] = useState("all");
  const [startWeek, setStartWeek] = useState("1");
  const [endWeek, setEndWeek] = useState("15");

  const ageFilters = [
    { key: "all", label: "Todas" },
    { key: "0-1", label: "0-1" },
    { key: "1-10", label: "1-10" },
    { key: "11-20", label: "11-20" },
    { key: "21-30", label: "21-30" },
    { key: "31-40", label: "31-40" },
    { key: "41-50", label: "41-50" },
    { key: "51-60", label: "51-60" },
    { key: "61-70", label: "61-70" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-[1440px] mx-auto space-y-6">
        {/* Header */}
        <header className="glass-card p-6 md:p-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-widest text-primary">Vigilância Epidemiológica</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-display font-bold text-foreground">
              Informe Semanal — Meningite
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Vigilância das Doenças Imunopreveníveis — Programa de Controle das Meningites
            </p>
            <p className="text-xs text-primary font-semibold mt-1">
              SE 01 a SE 15 (05/01 – 18/04/2026)
            </p>
            <p className="text-sm text-foreground font-medium mt-2">
              Dashboard de Vigilância Epidemiológica — Meningite 2026
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Raimundo Expedito — RT pelo monitoramento das meningites
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Fonte: SINAN/SES/MA
            </p>
          </div>
        </header>

        {/* KPIs Row 1 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <KpiCard title="Total Notificados" value={82} icon={<Activity className="w-4 h-4" />} variant="primary" />
          <KpiCard title="Bacterianas" value="18 (82%)" icon={<Shield className="w-4 h-4" />} variant="destructive" />
          <KpiCard title="Virais" value="3 (14%)" icon={<Shield className="w-4 h-4" />} variant="default" />
          <KpiCard title="Outras Etiologias" value="1 (5%)" icon={<Shield className="w-4 h-4" />} variant="warning" />
          <KpiCard title="Taxa de Mortalidade" value="14%" subtitle="3 óbitos / 22 confirmados" icon={<Skull className="w-4 h-4" />} variant="destructive" />
          <KpiCard title="Tempo Resposta" value="0 dias" subtitle="Fluxo regionais" icon={<TrendingUp className="w-4 h-4" />} variant="success" />
        </div>

        {/* Status dos Casos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <KpiCard title="Confirmados" value="22 (27%)" icon={<CheckCircle className="w-4 h-4" />} variant="destructive" />
          <KpiCard title="Em Investigação" value="40 (49%)" icon={<Search className="w-4 h-4" />} variant="warning" />
          <KpiCard title="Descartados" value="20 (24%)" icon={<Users className="w-4 h-4" />} variant="success" />
        </div>

        {/* Status Bar */}
        <div className="glass-card p-5">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Status dos Casos</h3>
          <div className="flex h-10 rounded-lg overflow-hidden text-sm font-semibold">
            <div className="bg-destructive flex items-center justify-center text-destructive-foreground" style={{ width: "27%" }}>
              22 Confirmados (27%)
            </div>
            <div className="bg-warning flex items-center justify-center text-warning-foreground" style={{ width: "49%" }}>
              40 Em Investigação (49%)
            </div>
            <div className="bg-success flex items-center justify-center text-success-foreground" style={{ width: "24%" }}>
              20 Descartados (24%)
            </div>
          </div>
        </div>

        {/* Análise Geral */}
        <AnalysisCard
          title="Análise Geral do Informe"
          text="No período de 05/01/2026 a 18/04/2026 (SE 01 a SE 15), foram registrados 82 casos notificados de meningite, com 22 confirmados (27%), 20 descartados (24%) e 40 em investigação (49%). As meningites bacterianas representam a maioria dos casos (82%), com destaque para 3 casos de Meningite Meningocócica e 1 caso de Meningo + Meningococcemia. A taxa de mortalidade foi de 14% (3 óbitos entre 22 confirmados). A distribuição geográfica concentra-se na região Metropolitana (22 casos), com presença em múltiplas regionais."
        />

        {/* Demographic Filters */}
        <div className="glass-card p-5">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Filtrar por Faixa Etária</h3>
          <div className="flex flex-wrap gap-2">
            {ageFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setAgeGroup(f.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  ageGroup === f.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Demographics */}
        <DemographicCharts ageGroup={ageGroup} />

        {/* Age + Confirmation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AgeDistribution />
          <ConfirmationCriteria />
        </div>

        {/* Cases by Month */}
        <CasesByMonth />

        {/* Etiologia + Evolução */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EtiologyBreakdown />
          <CaseEvolution />
        </div>

        {/* Geographic Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RegionalTable />
          <MunicipalityChart />
        </div>

        {/* Heatmap */}
        <GeographicHeatmap />

        {/* Epidemic Curve with Filter */}
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-foreground mb-1">Filtrar por Semana Epidemiológica</h3>
          <p className="text-xs text-muted-foreground mb-4">Evolução semanal com comparação 2025 vs 2026</p>
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Semana Inicial</label>
              <select
                value={startWeek}
                onChange={(e) => setStartWeek(e.target.value)}
                className="bg-secondary text-secondary-foreground border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {Array.from({ length: 15 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1)}>SE {i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Semana Final</label>
              <select
                value={endWeek}
                onChange={(e) => setEndWeek(e.target.value)}
                className="bg-secondary text-secondary-foreground border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {Array.from({ length: 15 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1)}>SE {i + 1}</option>
                ))}
              </select>
            </div>
          </div>
          <EpiChart startWeek={parseInt(startWeek)} endWeek={parseInt(endWeek)} />
        </div>

        {/* Vaccination Coverage */}
        <VaccineCoverage />

        {/* Situação dos Casos */}
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Situação dos Casos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Status Geral</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Encerrados</span>
                  <span className="font-semibold text-success">37 (45%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: "45%" }} />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">Em Aberto</span>
                  <span className="font-semibold text-warning">45 (55%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full" style={{ width: "55%" }} />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Casos Encerrados</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Altas</span>
                  <span className="font-semibold text-success">31 (84%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: "84%" }} />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">Internação</span>
                  <span className="font-semibold text-warning">4 (11%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full" style={{ width: "11%" }} />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">Óbitos</span>
                  <span className="font-semibold text-destructive">2 (5%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-destructive rounded-full" style={{ width: "5%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <AlertsSection />

        {/* Glossary */}
        <GlossarySection />

      </div>
    </div>
  );
};

export default Index;
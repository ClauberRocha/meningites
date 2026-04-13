import { useState } from "react";
import { Activity, Users, AlertTriangle, CheckCircle, Search, Clock, Skull, TrendingUp, Shield } from "lucide-react";
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
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
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
              <p className="text-xs text-muted-foreground mt-2 max-w-2xl">
                Vigilância epidemiológica de casos de meningite no Maranhão com análise demográfica, distribuição geográfica e recomendações de saúde pública.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                SE 01 a SE 15 (05/01 – 18/04/2026)
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Fonte:</span> SINAN/SES/MA · Raimundo Expedito — RT Meningites
              </p>
            </div>
          </div>
        </header>

        {/* KPIs Row 1 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <KpiCard title="Total Notificados" value={66} icon={<Activity className="w-4 h-4" />} variant="primary" />
          <KpiCard title="Bacterianas" value="18 (86%)" icon={<Shield className="w-4 h-4" />} variant="destructive" />
          <KpiCard title="Virais" value="2 (10%)" icon={<Shield className="w-4 h-4" />} variant="default" />
          <KpiCard title="Outras Etiologias" value="1 (5%)" icon={<Shield className="w-4 h-4" />} variant="warning" />
          <KpiCard title="Taxa de Mortalidade" value="11%" subtitle="2 óbitos / 18 confirmados" icon={<Skull className="w-4 h-4" />} variant="destructive" />
          <KpiCard title="Tempo Resposta" value="0 dias" subtitle="Fluxo regionais" icon={<TrendingUp className="w-4 h-4" />} variant="success" />
        </div>

        {/* Status dos Casos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <KpiCard title="Confirmados" value="21 (32%)" icon={<CheckCircle className="w-4 h-4" />} variant="destructive" />
          <KpiCard title="Em Investigação" value="26 (39%)" icon={<Search className="w-4 h-4" />} variant="warning" />
          <KpiCard title="Descartados" value="19 (29%)" icon={<Users className="w-4 h-4" />} variant="success" />
        </div>

        {/* Status Bar */}
        <div className="glass-card p-5">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Status dos Casos</h3>
          <div className="flex h-10 rounded-lg overflow-hidden text-sm font-semibold">
            <div className="bg-destructive flex items-center justify-center text-destructive-foreground" style={{ width: "32%" }}>
              21 Confirmados (32%)
            </div>
            <div className="bg-warning flex items-center justify-center text-warning-foreground" style={{ width: "39%" }}>
              26 Em Investigação (39%)
            </div>
            <div className="bg-success flex items-center justify-center text-success-foreground" style={{ width: "29%" }}>
              19 Descartados (29%)
            </div>
          </div>
        </div>

        {/* Análise Geral */}
        <AnalysisCard
          title="Análise Geral do Informe"
          text="No período de 05/01/2026 a 18/04/2026 (SE 01 a SE 15), foram registrados 66 casos notificados de meningite, com 21 confirmados (32%), 19 descartados (29%) e 26 em investigação (39%). As meningites bacterianas representam a maioria dos casos (86%), com destaque para 3 casos de Meningite Meningocócica e 1 caso de Meningite + Meningococcemia. A taxa de mortalidade foi de 11% (2 óbitos entre 18 bacterianas). A distribuição geográfica concentra-se na região Metropolitana (12 casos confirmados), com presença em múltiplas regionais."
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
                  <span className="font-semibold text-success">40 (61%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: "61%" }} />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">Em Aberto</span>
                  <span className="font-semibold text-warning">26 (39%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full" style={{ width: "39%" }} />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Casos Encerrados</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Altas</span>
                  <span className="font-semibold text-success">38 (95%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: "95%" }} />
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

        {/* Footer */}
        <footer className="text-center py-6 border-t border-border/30">
          <p className="text-sm text-muted-foreground font-medium">Dashboard de Vigilância Epidemiológica — Meningite 2026</p>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="font-semibold">Raimundo Expedito</span> — RT pelo monitoramento das meningites / SES-MA
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

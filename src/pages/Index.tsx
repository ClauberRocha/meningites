import { useState } from "react";
import { Activity, Users, AlertTriangle, CheckCircle, Search, Skull, TrendingUp, Shield, Gauge } from "lucide-react";
import { KpiCard } from "@/components/KpiCard";
import { EpiChart } from "@/components/EpiChart";
import { AgeDistribution } from "@/components/AgeDistribution";
import { MaranhaoMap } from "@/components/MaranhaoMap";
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
import { BackToTopButton } from "@/components/BackToTopButton";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { ActionPanel } from "@/components/ActionPanel";
import { EpidemicAlerts } from "@/components/EpidemicAlerts";
import { EpidemiologicalIndex } from "@/components/EpidemiologicalIndex";
import { StrategicRecommendations } from "@/components/StrategicRecommendations";

const Index = () => {
  const [ageGroup, setAgeGroup] = useState("all");
  const [startWeek, setStartWeek] = useState("1");
  const [endWeek, setEndWeek] = useState("19");

  const ageFilters = [
    { key: "all", label: "Todas" },
    { key: "0-1", label: "< 1" },
    { key: "1-10", label: "1-10" },
    { key: "11-20", label: "11-20" },
    { key: "21-30", label: "21-30" },
    { key: "31-40", label: "31-40" },
    { key: "41-50", label: "41-50" },
    { key: "51-60", label: "51-60" },
    { key: "61-70", label: "61-70" },
  ];

  return (
    <div className="min-h-screen bg-background bg-gradient-soft p-4 md:p-6 lg:p-8">
      <div className="max-w-[1440px] mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <header className="glass-card glass-card-hover p-6 md:p-8 animate-scale-in">
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
              SE 01 a SE 19 (05/01 – 16/05/2026)
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

        {/* Resumo Executivo */}
        <ExecutiveSummary
          trend="up"
          level="high"
          yoyPct={12}
          criticalWeek="SE 14"
          headline="44 casos confirmados em 121 notificações; pico em SE 14 com 8 confirmados; letalidade elevada (27%, 12 óbitos) e concentração crítica em São Luís (34% dos confirmados)."
        />

        {/* Recomendações Estratégicas — central de decisão */}
        <StrategicRecommendations />

        {/* SEÇÃO: SITUAÇÃO GERAL */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary border-l-2 border-primary pl-3">Situação Geral</h2>

          {/* KPIs principais — destacados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <KpiCard title="Confirmados" value="44 (36%)" icon={<CheckCircle className="w-4 h-4" />} situational deltaPct={18} higherIsWorse deltaLabel="vs sem. anterior" />
            <KpiCard title="Óbitos" value={12} subtitle="Letalidade 27%" icon={<Skull className="w-4 h-4" />} variant="destructive" deltaPct={50} higherIsWorse deltaLabel="vs sem. anterior" />
            <KpiCard title="Tendência (4 sem.)" value="Alta" subtitle="Confirmados em crescimento" icon={<TrendingUp className="w-4 h-4" />} variant="destructive" deltaPct={22} higherIsWorse deltaLabel="vs sem. anterior" />
          </div>

          {/* KPIs secundários */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <KpiCard title="Total Notificados" value={121} icon={<Activity className="w-4 h-4" />} situational deltaPct={25} higherIsWorse deltaLabel="vs sem. anterior" />
            <KpiCard title="Em Investigação" value="43 (36%)" icon={<Search className="w-4 h-4" />} situational deltaPct={8} higherIsWorse deltaLabel="vs sem. anterior" />
            <KpiCard title="Descartados" value="34 (28%)" icon={<Users className="w-4 h-4" />} variant="success" deltaPct={15} higherIsWorse={false} deltaLabel="vs sem. anterior" />
            <KpiCard title="Bacterianas" value="35 (80%)" icon={<Shield className="w-4 h-4" />} situational deltaPct={5} higherIsWorse deltaLabel="vs sem. anterior" />
            <KpiCard title="Virais" value="7 (16%)" icon={<Shield className="w-4 h-4" />} situational deltaPct={2} higherIsWorse deltaLabel="vs sem. anterior" />
            <KpiCard title="Outras Etiologias" value="2 (5%)" icon={<Shield className="w-4 h-4" />} situational deltaPct={0} higherIsWorse deltaLabel="vs sem. anterior" />
          </div>

          {/* KPIs operacionais / eficiência */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <KpiCard
              title="Eficiência da Vigilância"
              value="60%"
              subtitle="Encerramento + investigação + confirmação"
              icon={<Gauge className="w-4 h-4" />}
              situational
              deltaPct={-8}
              higherIsWorse={false}
              deltaLabel="vs sem. anterior"
            />
            <KpiCard
              title="Tempo Resposta"
              value="84 dias"
              subtitle="Regional Zé Doca — acima do recomendado (≤60d)"
              icon={<AlertTriangle className="w-4 h-4" />}
              variant="destructive"
              deltaPct={24}
              higherIsWorse
              deltaLabel="vs sem. anterior"
            />
          </div>
        </section>

        {/* Alertas Epidemiológicos (logo abaixo dos KPIs) */}
        <EpidemicAlerts />

        {/* Painel de Ação */}
        <ActionPanel />

        {/* SEÇÃO: PERFIL EPIDEMIOLÓGICO */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary border-l-2 border-primary pl-3">Perfil Epidemiológico</h2>
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

        <DemographicCharts ageGroup={ageGroup} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AgeDistribution />
          <div className="hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all">
            <ConfirmationCriteria />
          </div>
        </div>
        </section>

        {/* SEÇÃO: EVOLUÇÃO TEMPORAL */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary border-l-2 border-primary pl-3">Evolução Temporal</h2>
          <CasesByMonth />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <EtiologyBreakdown />
            <div className="hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all">
              <CaseEvolution />
            </div>
          </div>

          {/* Curva epidêmica com filtro */}
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold text-foreground mb-1">Filtrar por Semana Epidemiológica</h3>
            <p className="text-xs text-muted-foreground mb-2">Evolução semanal com comparação 2025 vs 2026</p>
            <div className="flex flex-wrap gap-4 mb-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Semana Inicial</label>
                <select
                  value={startWeek}
                  onChange={(e) => setStartWeek(e.target.value)}
                  className="bg-secondary text-secondary-foreground border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {Array.from({ length: 19 }, (_, i) => (
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
                  {Array.from({ length: 19 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1)}>SE {i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
            <EpiChart startWeek={parseInt(startWeek)} endWeek={parseInt(endWeek)} />
          </div>
        </section>

        {/* SEÇÃO: DISTRIBUIÇÃO GEOGRÁFICA */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary border-l-2 border-primary pl-3">Distribuição Geográfica</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
            <div className="hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all h-full [&>div]:h-full">
              <MaranhaoMap />
            </div>
            <div className="hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all h-full [&>div]:h-full">
              <EpidemiologicalIndex />
            </div>
          </div>

          <div className="hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all">
            <MunicipalityChart />
          </div>

          <div className="hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all">
            <GeographicHeatmap />
          </div>
        </section>

        {/* SEÇÃO: OPERACIONAL */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary border-l-2 border-primary pl-3">Operacional</h2>
          <VaccineCoverage />

          <div className="glass-card p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all">
          <h3 className="font-display font-semibold text-foreground mb-4">Situação dos Casos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Status Geral</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Encerrados</span>
                  <span className="font-semibold text-success">72 (60%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: "60%" }} />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">Em Aberto</span>
                  <span className="font-semibold text-warning">49 (40%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full" style={{ width: "40%" }} />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Desfecho dos Confirmados (44)</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Altas</span>
                  <span className="font-semibold text-success">27 (61%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: "61%" }} />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">Internação</span>
                  <span className="font-semibold text-warning">5 (11%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full" style={{ width: "11%" }} />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">Óbitos</span>
                  <span className="font-semibold text-destructive">12 (27%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-destructive rounded-full" style={{ width: "27%" }} />
                </div>
              </div>
            </div>
          </div>
          </div>

          <AlertsSection />
          <GlossarySection />
        </section>

      </div>
      <BackToTopButton />
    </div>
  );
};

export default Index;

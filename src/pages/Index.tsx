import { Activity, Users, AlertTriangle, CheckCircle, Search, Clock } from "lucide-react";
import { KpiCard } from "@/components/KpiCard";
import { EpiChart } from "@/components/EpiChart";
import { AgeDistribution } from "@/components/AgeDistribution";
import { RegionalTable } from "@/components/RegionalTable";
import { EtiologyBreakdown } from "@/components/EtiologyBreakdown";
import { ConfirmationCriteria } from "@/components/ConfirmationCriteria";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-widest text-primary">Vigilância Epidemiológica</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Informe Semanal — Meningite
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Maranhão · SE 01 a SE 15 (05/01/2026 – 18/04/2026) · Fonte: SINAN/SES/MA
            </p>
          </div>
          <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm text-muted-foreground shrink-0">
            <Clock className="w-4 h-4 text-primary" />
            Atualizado em 18/04/2026
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <KpiCard title="Notificados" value={66} icon={<Activity className="w-4 h-4" />} variant="primary" />
          <KpiCard title="Confirmados" value={21} subtitle="32% dos notificados" icon={<CheckCircle className="w-4 h-4" />} variant="success" />
          <KpiCard title="Em Investigação" value={26} subtitle="39%" icon={<Search className="w-4 h-4" />} variant="warning" />
          <KpiCard title="Descartados" value={19} subtitle="29%" icon={<Users className="w-4 h-4" />} />
          <KpiCard title="Óbitos" value={2} subtitle="11% das bacterianas" icon={<AlertTriangle className="w-4 h-4" />} variant="destructive" />
          <KpiCard title="Letalidade Bact." value="11%" subtitle="2 de 18 casos" icon={<AlertTriangle className="w-4 h-4" />} variant="destructive" />
        </div>

        {/* Sex + Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="glass-card p-5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Sexo — Confirmados</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Masculino</span>
                  <span className="font-semibold text-info">10 (48%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-info rounded-full" style={{ width: "48%" }} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Feminino</span>
                  <span className="font-semibold text-primary">11 (52%)</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "52%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 col-span-1 md:col-span-2">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Status dos Casos</h3>
            <div className="flex h-8 rounded-lg overflow-hidden">
              <div className="bg-destructive flex items-center justify-center text-xs font-semibold text-destructive-foreground" style={{ width: "32%" }}>
                21 Conf.
              </div>
              <div className="bg-warning flex items-center justify-center text-xs font-semibold text-warning-foreground" style={{ width: "39%" }}>
                26 Invest.
              </div>
              <div className="bg-success flex items-center justify-center text-xs font-semibold text-success-foreground" style={{ width: "29%" }}>
                19 Desc.
              </div>
            </div>
          </div>
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <EpiChart />
          </div>
          <EtiologyBreakdown />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AgeDistribution />
          <ConfirmationCriteria />
          <RegionalTable />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-muted-foreground pt-4 border-t border-border/30">
          Programa de Controle das Meningites · Vigilância das Doenças Imunopreveníveis · SES/MA
        </footer>
      </div>
    </div>
  );
};

export default Index;

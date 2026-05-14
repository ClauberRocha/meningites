import { useEffect, useMemo, useRef, useState } from "react";
import { Maximize2, X, Plus, Minus, RotateCcw } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

/** Casos confirmados por município (nomes batem com o GeoJSON oficial do IBGE). */
const casesByMunicipality: Record<string, number> = {
  "São Luís": 14,
  "Bacabeira": 1,
  "Bacabal": 1,
  "Amarante do Maranhão": 1,
  "São José de Ribamar": 1,
  "Nova Olinda do Maranhão": 1,
  "Viana": 1,
  "Urbano Santos": 1,
  "Poção de Pedras": 1,
  "Caxias": 1,
  "Santa Inês": 1,
  "São Luís Gonzaga do Maranhão": 1,
  "Jenipapo dos Vieiras": 1,
  "Raposa": 1,
  "Alcântara": 1,
  "Presidente Juscelino": 1,
  "Bequimão": 1,
};

type Bin = { min: number; max: number; color: string; label: string };
const BINS: Bin[] = [
  { min: 0, max: 0, color: "#ffffff", label: "0 casos" },
  { min: 1, max: 1, color: "hsl(48 95% 60%)", label: "1 caso" },
  { min: 2, max: 4, color: "hsl(28 90% 58%)", label: "2 – 4 casos" },
  { min: 5, max: 9, color: "hsl(8 85% 58%)", label: "5 – 9 casos" },
  { min: 10, max: Infinity, color: "hsl(348 88% 50%)", label: "10+ casos" },
];
const colorFor = (n: number) => BINS.find((b) => n >= b.min && n <= b.max)!.color;

const MAP_BG = "#111724";

type GeoFeature = {
  type: "Feature";
  properties: { name: string; codarea: string };
  geometry: { type: "Polygon" | "MultiPolygon"; coordinates: number[][][] | number[][][][] };
};

interface ProjectedFeature {
  name: string;
  cases: number;
  d: string;
  cx: number;
  cy: number;
}

function useGeo() {
  const [data, setData] = useState<GeoFeature[] | null>(null);
  useEffect(() => {
    fetch("/geo/ma-municipios.geojson")
      .then((r) => r.json())
      .then((g) => setData(g.features as GeoFeature[]))
      .catch(() => setData([]));
  }, []);
  return data;
}

function project(features: GeoFeature[], width: number, height: number): ProjectedFeature[] {
  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
  const eachCoord = (f: GeoFeature, fn: (lng: number, lat: number) => void) => {
    const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates as number[][][]] : (f.geometry.coordinates as number[][][][]);
    polys.forEach((poly) => poly.forEach((ring) => ring.forEach(([lng, lat]) => fn(lng, lat))));
  };
  features.forEach((f) =>
    eachCoord(f, (lng, lat) => {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }),
  );
  const midLat = (minLat + maxLat) / 2;
  const kx = Math.cos((midLat * Math.PI) / 180);
  const dataW = (maxLng - minLng) * kx;
  const dataH = maxLat - minLat;
  const pad = 8;
  const scale = Math.min((width - pad * 2) / dataW, (height - pad * 2) / dataH);
  const offsetX = (width - dataW * scale) / 2;
  const offsetY = (height - dataH * scale) / 2;
  const px = (lng: number) => offsetX + (lng - minLng) * kx * scale;
  const py = (lat: number) => offsetY + (maxLat - lat) * scale;

  return features.map((f) => {
    const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates as number[][][]] : (f.geometry.coordinates as number[][][][]);
    const segs: string[] = [];
    let sumX = 0, sumY = 0, n = 0;
    polys.forEach((poly) =>
      poly.forEach((ring) => {
        ring.forEach(([lng, lat], i) => {
          const x = px(lng);
          const y = py(lat);
          segs.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
          sumX += x;
          sumY += y;
          n++;
        });
        segs.push("Z");
      }),
    );
    const name = f.properties.name;
    return {
      name,
      cases: casesByMunicipality[name] ?? 0,
      d: segs.join(" "),
      cx: sumX / n,
      cy: sumY / n,
    };
  });
}

interface MapSvgProps {
  features: ProjectedFeature[];
  width: number;
  height: number;
  hoverScale?: number;
  onSurfaceClick?: () => void;
  zoom?: number;
}

function MapSvg({ features, width, height, hoverScale = 2.22, onSurfaceClick, zoom = 1 }: MapSvgProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(() => [...features].sort((a, b) => b.cases - a.cases), [features]);
  const hoveredFeature = hovered ? features.find((f) => f.name === hovered) : null;

  const handleMove = (e: React.MouseEvent) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    setTip({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden rounded-lg cursor-pointer"
      style={{ background: MAP_BG, height }}
      onClick={onSurfaceClick}
    >
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="ma-elev" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.55" />
          </filter>
        </defs>
        <g
          style={{
            transform: `translate(${width / 2}px, ${height / 2}px) scale(${zoom}) translate(${-width / 2}px, ${-height / 2}px)`,
            transformOrigin: "0 0",
            transition: "transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {features.map((f) => {
            const isHover = f.name === hovered;
            const hasCases = f.cases > 0;
            return (
              <path
                key={f.name}
                d={f.d}
                fill={colorFor(f.cases)}
                stroke={isHover ? "#0f172a" : "rgba(120,130,140,0.55)"}
                strokeWidth={isHover ? 0.8 : 0.4}
                style={{ transition: "fill 200ms ease, opacity 200ms ease", opacity: hovered && !isHover ? 0.55 : 1 }}
                {...(hasCases ? {
                  onMouseEnter: (e: React.MouseEvent) => {
                    setHovered(f.name);
                    handleMove(e);
                  },
                  onMouseMove: handleMove,
                  onMouseLeave: () => {
                    setHovered(null);
                    setTip(null);
                  },
                } : {})}
              />
            );
          })}
          {/* Renderiza o hover por cima dos demais, com elevação e ampliação — apenas para municípios com casos */}
          {hoveredFeature && hoveredFeature.cases > 0 && (
            <g
              style={{
                transform: `translate(${hoveredFeature.cx}px, ${hoveredFeature.cy}px) scale(${hoverScale}) translate(${-hoveredFeature.cx}px, ${-hoveredFeature.cy}px) translateY(-6px)`,
                transformOrigin: "0 0",
                transition: "transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                pointerEvents: "none",
              }}
            >
              <path
                d={hoveredFeature.d}
                fill={colorFor(hoveredFeature.cases)}
                stroke="#0f172a"
                strokeWidth={0.6}
                filter="url(#ma-elev)"
              />
            </g>
          )}
        </g>
      </svg>

      {hovered && tip && (
        <div
          className="pointer-events-none absolute z-10 rounded-md border border-border/60 bg-background/95 px-3 py-2 text-xs shadow-xl backdrop-blur"
          style={{
            left: Math.min(tip.x + 12, width - 180),
            top: Math.max(tip.y - 48, 8),
          }}
        >
          <p className="font-semibold text-foreground leading-tight">{hovered}</p>
          <p className="text-[11px] text-muted-foreground">
            {(features.find((f) => f.name === hovered)?.cases ?? 0)} caso(s) confirmado(s)
          </p>
        </div>
      )}
      {/* swallow stray refs */}
      {sorted.length === 0 ? <span className="hidden" /> : null}
    </div>
  );
}

function Legend() {
  const total = Object.values(casesByMunicipality).reduce((a, b) => a + b, 0);
  const munCount = Object.keys(casesByMunicipality).length;
  return (
    <div className="mt-3 rounded-lg border border-border/40 bg-secondary/20 p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Legenda — casos confirmados</p>
        <p className="text-[11px] text-muted-foreground">
          {munCount} municípios com casos · {total} confirmados
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {BINS.map((b) => (
          <div key={b.label} className="flex items-center gap-2 rounded-md border border-border/40 bg-background/40 px-2 py-1">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: b.color }} />
            <span className="text-[11px] text-foreground">{b.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-muted-foreground">
        Passe o mouse para destacar o município (escala 2.22× com elevação) · Clique no mapa ou em "Ampliar" para visualizar em tela cheia.
      </p>
    </div>
  );
}

export function MaranhaoMap() {
  const features = useGeo();
  const [open, setOpen] = useState(false);

  const projected = useMemo(() => (features ? project(features, 800, 800) : []), [features]);
  const projectedFs = useMemo(() => (features ? project(features, 1400, 1100) : []), [features]);

  return (
    <div className="glass-card p-6">
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-semibold text-foreground">Distribuição por Regional</h3>
          <p className="text-xs text-muted-foreground">Mapa coroplético dos municípios do Maranhão por casos confirmados</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-secondary/60 transition-colors"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          Ampliar
        </button>
      </div>

      {features === null ? (
        <div className="flex h-[420px] items-center justify-center rounded-lg" style={{ background: MAP_BG }}>
          <span className="text-xs text-muted-foreground">Carregando mapa…</span>
        </div>
      ) : (
        <MapSvg features={projected} width={800} height={800} onSurfaceClick={() => setOpen(true)} />
      )}

      <Legend />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-[96vw] w-[96vw] h-[94vh] p-0 border-border/60 overflow-hidden"
          style={{ background: MAP_BG }}
        >
          <div className="flex items-center justify-between border-b border-border/40 bg-background/40 px-4 py-3 backdrop-blur">
            <button
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary/70 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              Voltar para o informe
            </button>
            <div className="text-right">
              <p className="text-sm font-display font-semibold text-foreground">Mapa de Casos — Maranhão</p>
              <p className="text-[11px] text-muted-foreground">Hover destaca o município (escala 2.22×) · Tooltip com nome e quantidade</p>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {features && features.length > 0 && (
              <MapSvg features={projectedFs} width={1400} height={1100} hoverScale={2.22} />
            )}
            <div className="mt-3">
              <Legend />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
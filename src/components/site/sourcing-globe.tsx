"use client";

import Globe from "@/components/originkit/globe";

/** Accra, and the markets the agency sources in. */
const ACCRA = { lat: 5.6, lng: -0.19 };
const MARKETS = [
  { lat: 23.13, lng: 113.26 }, // Guangzhou, China
  { lat: 25.2, lng: 55.27 }, // Dubai, UAE
  { lat: 51.51, lng: -0.13 }, // London, UK
  { lat: 48.86, lng: 2.35 }, // Paris, for Europe
];

// Held at module level: the globe rebuilds whenever one of these changes identity.
const DOTS = { color: "#203c01", size: 6, density: 8, allDots: false };
const MARKERS = { markers: [ACCRA, ...MARKETS], color: "#63001a", size: 62 };
const CONNECTIONS = MARKETS.map((to) => ({ from: ACCRA, to }));

/**
 * The world in the site's olive on cream, turning slowly, with burgundy
 * lines running from Ghana to each sourcing market. Decorative: the markets
 * are named in the text beside it.
 */
export function SourcingGlobe({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <Globe
        speed={1}
        scale={9}
        dots={DOTS}
        markerConfig={MARKERS}
        connections={CONNECTIONS}
        connectionColor="#63001a"
        oceanColor="#f1e3c4"
        outlineColor="rgba(32,60,1,0.45)"
        graticuleColor="rgba(32,60,1,0.12)"
        direction="right"
        initialLatitude={18}
        initialLongitude={-45}
        detail={10}
      />
    </div>
  );
}

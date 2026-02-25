// src/components/FlightMap.jsx
import React, { useMemo } from 'react';
import styles from './FlightMap.module.css';
import worldMapSvg from '../assets/images/world.svg';

// ——— Map constants ———
export const BASE_MAP_WIDTH = 800;
export const BASE_MAP_HEIGHT = 600;
const PACIFIC_CENTER_OFFSET = -160;
// wrap any longitude below this pivot by +360°
const LON_WRAP_THRESHOLD = -20;

export function wrapLon(lon) {
  return lon < LON_WRAP_THRESHOLD ? lon + 360 : lon;
}

// ——— Mercator projection helpers ———
export function lonToX(lon) {
  let adj = lon + PACIFIC_CENTER_OFFSET;
  adj = ((adj + 180) % 360) - 180;
  return (adj + 180) * (BASE_MAP_WIDTH / 360);
}

export function latToY(lat) {
  const c = Math.max(Math.min(lat, 85), -85);
  const rad = (c * Math.PI) / 180;
  const m = Math.log(Math.tan(Math.PI / 4 + rad / 2));
  return BASE_MAP_HEIGHT / 2 - (BASE_MAP_WIDTH * m) / (2 * Math.PI);
}

// ——— FlightMap component ———
export default function FlightMap({
  flights,
  origin,
  selectedFlightId,
  affordableIds,
  viewBox,
  onFlightClick
}) {
  // compute positions (apply wrapLon to shift points < threshold)
  const originPos = useMemo(
    () => ({
      x: lonToX(wrapLon(origin.lon)),
      y: latToY(origin.lat)
    }),
    [origin]
  );

  const destPos = useMemo(() => {
    const m = {};
    flights.forEach(f => {
      const lon = wrapLon(f.lon);
      m[f.id] = { x: lonToX(lon), y: latToY(f.lat) };
    });
    return m;
  }, [flights]);

  // affordability halo
  const haloR = useMemo(() => {
    let maxSq = 0;
    affordableIds.forEach(id => {
      const p = destPos[id];
      if (!p) return;
      const dx = p.x - originPos.x, dy = p.y - originPos.y;
      maxSq = Math.max(maxSq, dx * dx + dy * dy);
    });
    return maxSq ? Math.sqrt(maxSq) + 8 : 0;
  }, [affordableIds, destPos, originPos]);

  // dot sizes
  const R_RED = 5;
  const R_SELECTED = 6;
  const R_ORIGIN = 4;

  return (
    <div className="relative w-full h-64">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="100%"
        height="100%"
        viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* grey background */}
        <rect
          x={-300}
          y={-300}
          width="500%"
          height="700%"
          fill="#f2f2f2"
          pointerEvents="none"
        />

        {/* affordability halo */}
        {haloR > 0 && (
          <circle
            cx={originPos.x}
            cy={originPos.y}
            r={haloR}
            className={styles.affordabilityCircle}
          />
        )}

        {/* origin dot */}
        <circle
          cx={originPos.x}
          cy={originPos.y}
          r={R_ORIGIN}
          className={styles.originDot}
        />

        {/* destination dots */}
        {flights.map(f => {
          const p = destPos[f.id];
          if (!p) return null;
          const isAff = affordableIds.includes(f.id);
          const isSel = f.id === selectedFlightId;

          if (isSel) {
            return (
              <circle
                key={f.id}
                cx={p.x}
                cy={p.y}
                r={R_SELECTED}
                className={styles.dotSelected}
                onClick={() => onFlightClick?.(f.id)}
              />
            );
          }
          if (isAff) {
            return (
              <circle
                key={f.id}
                cx={p.x}
                cy={p.y}
                r={R_RED}
                className={styles.dotAffordable}
                onClick={() => onFlightClick?.(f.id)}
              />
            );
          }
          return (
            <circle
              key={f.id}
              cx={p.x}
              cy={p.y}
              r={R_RED}
              className={styles.dotUnaffordable}
            />
          );
        })}

        {/* world map image moves with image */}
        <image
          href={worldMapSvg}
          xlinkHref={worldMapSvg}
          pointerEvents="none"
        />
      </svg>
    </div>
  );
}

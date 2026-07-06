"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    daum?: {
      roughmap: {
        phase?: string;
        cdn?: string;
        URL_KEY_DATA_LOAD_PRE?: string;
        url_protocal?: string;
        url_cdn_domain?: string;
        Lander?: new (config: {
          timestamp: string;
          key: string;
          mapWidth: string;
          mapHeight: string;
        }) => { render: () => void };
      };
    };
  }
}

const ROUGHMAP_LANDER_SCRIPT_ID = "daum-roughmap-lander-script";
const ROUGHMAP_LANDER_SRC =
  "https://t1.kakaocdn.net/kakaomapweb/roughmap/place/prod/207038f2_1774248312945/roughmapLander.js";
const MAP_TIMESTAMP = "1782728095550";
const MAP_KEY = "qd8rcop48mx";
const MAP_ASPECT = 360 / 640;
const MAP_MIN_WIDTH = 320;
const MAP_RESIZE_THRESHOLD = 32;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function initRoughmapConfig() {
  const protocol = window.location.protocol === "https:" ? "https:" : "http:";

  window.daum = window.daum ?? { roughmap: {} };
  window.daum.roughmap = {
    ...window.daum.roughmap,
    phase: "prod",
    cdn: "207038f2_1774248312945",
    URL_KEY_DATA_LOAD_PRE: `${protocol}//t1.kakaocdn.net/roughmap/`,
    url_protocal: protocol,
    url_cdn_domain: "//t1.kakaocdn.net",
  };
}

async function waitForRoughmapLander() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (window.daum?.roughmap?.Lander) return;
    await wait(50);
  }
}

async function waitForContainerWidth(element: HTMLElement) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const width = element.clientWidth;
    if (width > 0) return width;
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  }

  return 640;
}

function loadRoughmapLander(): Promise<void> {
  initRoughmapConfig();

  if (window.daum?.roughmap?.Lander) {
    return Promise.resolve();
  }

  const existing = document.getElementById(ROUGHMAP_LANDER_SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return waitForRoughmapLander().then(() => undefined);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = ROUGHMAP_LANDER_SCRIPT_ID;
    script.charset = "UTF-8";
    script.src = ROUGHMAP_LANDER_SRC;
    script.onload = () => {
      waitForRoughmapLander().then(resolve).catch(reject);
    };
    script.onerror = () => reject(new Error("Kakao roughmapLander failed"));
    document.body.appendChild(script);
  });
}

export default function LocationKakaoMap() {
  const embedRef = useRef<HTMLDivElement>(null);
  const lastWidthRef = useRef(0);
  const isRenderingRef = useRef(false);
  const mapRootId = `daumRoughmapContainer${MAP_TIMESTAMP}`;

  useEffect(() => {
    const embed = embedRef.current;
    if (!embed) return;

    const observeTarget = embed.closest(".location_map") ?? embed;
    let cancelled = false;
    let resizeTimer: number | undefined;

    async function renderMap(nextWidth?: number) {
      if (isRenderingRef.current || cancelled || !embed) return;

      await loadRoughmapLander();
      if (cancelled || !embed || !window.daum?.roughmap?.Lander) return;

      const measuredWidth = nextWidth ?? Math.max(Math.round(await waitForContainerWidth(embed)), MAP_MIN_WIDTH);
      const width = Math.max(measuredWidth, MAP_MIN_WIDTH);

      if (
        lastWidthRef.current > 0 &&
        Math.abs(width - lastWidthRef.current) < MAP_RESIZE_THRESHOLD
      ) {
        return;
      }

      isRenderingRef.current = true;
      lastWidthRef.current = width;

      const height = Math.round(width * MAP_ASPECT);

      embed.replaceChildren();
      const mapNode = document.createElement("div");
      mapNode.id = mapRootId;
      mapNode.className = "root_daum_roughmap root_daum_roughmap_landing";
      embed.appendChild(mapNode);

      new window.daum!.roughmap.Lander!({
        timestamp: MAP_TIMESTAMP,
        key: MAP_KEY,
        mapWidth: String(width),
        mapHeight: String(height),
      }).render();

      isRenderingRef.current = false;
    }

    function scheduleRender(nextWidth?: number) {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        renderMap(nextWidth).catch((error) => {
          console.error(error);
          isRenderingRef.current = false;
        });
      }, 250);
    }

    renderMap().catch((error) => {
      console.error(error);
      isRenderingRef.current = false;
    });

    const observer = new ResizeObserver((entries) => {
      const width = Math.round(entries[0]?.contentRect.width ?? 0);
      if (width <= 0) return;
      scheduleRender(width);
    });
    observer.observe(observeTarget);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(resizeTimer);
      lastWidthRef.current = 0;
      isRenderingRef.current = false;
      embed.replaceChildren();
    };
  }, [mapRootId]);

  return (
    <figure className="location_map">
      <div
        ref={embedRef}
        className="location_map_embed"
        aria-label="메타폴리스몰 카카오맵 위치"
      />
    </figure>
  );
}

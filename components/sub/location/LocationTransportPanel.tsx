"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LocationCarCard from "@/components/sub/location/LocationCarCard";
import LocationRouteCard from "@/components/sub/location/LocationRouteCard";
import {
  BUS_ROUTES,
  CAR_ROUTES,
  SUBWAY_ROUTES,
} from "@/data/locationTransport";

type TransportTab = "public" | "car";

function LocationCategory({
  title,
  routes,
}: {
  title: string;
  routes: typeof SUBWAY_ROUTES;
}) {
  return (
    <section className="location_transport_col" aria-labelledby={`location-${title}-title`}>
      <div className="location_category_head">
        <h3 id={`location-${title}-title`} className="location_category_title">
          {title}
        </h3>
        <span className="location_category_line" aria-hidden="true" />
      </div>
      <ul className="location_route_list">
        {routes.map((route) => (
          <LocationRouteCard key={route.id} route={route} />
        ))}
      </ul>
    </section>
  );
}

export default function LocationTransportPanel() {
  const [activeTab, setActiveTab] = useState<TransportTab>("public");
  const [hoverTab, setHoverTab] = useState<TransportTab | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const publicBtnRef = useRef<HTMLButtonElement>(null);
  const carBtnRef = useRef<HTMLButtonElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, transform: "translateX(0px)" });

  const targetTab = hoverTab ?? activeTab;

  const updateIndicator = useCallback(() => {
    const button = targetTab === "public" ? publicBtnRef.current : carBtnRef.current;
    const container = tabsRef.current;

    if (!button || !container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    setIndicatorStyle({
      width: buttonRect.width,
      transform: `translateX(${buttonRect.left - containerRect.left}px)`,
    });
  }, [targetTab]);

  useEffect(() => {
    updateIndicator();

    const container = tabsRef.current;
    if (!container) {
      return;
    }

    const observer = new ResizeObserver(updateIndicator);
    observer.observe(container);

    if (publicBtnRef.current) {
      observer.observe(publicBtnRef.current);
    }

    if (carBtnRef.current) {
      observer.observe(carBtnRef.current);
    }

    window.addEventListener("resize", updateIndicator);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  return (
    <section className="location_transport" aria-label="교통 안내">
      <div className="location_transport_inner content_inner innerBot">
        <div className="location_tabs_wrap">
          <div
            ref={tabsRef}
            className="location_tabs"
            role="tablist"
            aria-label="교통 수단 선택"
            onMouseLeave={() => setHoverTab(null)}
          >
            <span
              className="location_tabs_indicator"
              aria-hidden="true"
              style={{
                width: indicatorStyle.width,
                transform: indicatorStyle.transform,
              }}
            />
            <button
              ref={publicBtnRef}
              type="button"
              role="tab"
              id="location-tab-public"
              aria-selected={activeTab === "public"}
              aria-controls="location-panel-public"
              className={`location_tab${targetTab === "public" ? " is-target" : ""}`}
              onMouseEnter={() => setHoverTab("public")}
              onClick={() => setActiveTab("public")}
            >
              대중교통
            </button>
            <button
              ref={carBtnRef}
              type="button"
              role="tab"
              id="location-tab-car"
              aria-selected={activeTab === "car"}
              aria-controls="location-panel-car"
              className={`location_tab${targetTab === "car" ? " is-target" : ""}`}
              onMouseEnter={() => setHoverTab("car")}
              onClick={() => setActiveTab("car")}
            >
              자가용
            </button>
          </div>
        </div>

        {activeTab === "public" ? (
          <div
            id="location-panel-public"
            role="tabpanel"
            aria-labelledby="location-tab-public"
            className="location_transport_grid location_transport_public"
          >
            <LocationCategory title="Subway" routes={SUBWAY_ROUTES} />
            <LocationCategory title="Bus" routes={BUS_ROUTES} />
          </div>
        ) : (
          <div
            id="location-panel-car"
            role="tabpanel"
            aria-labelledby="location-tab-car"
            className="location_transport_car"
          >
            <div className="location_category_head">
              <h3 className="location_category_title">By car</h3>
              <span className="location_category_line" aria-hidden="true" />
            </div>
            <ul className="location_car_grid">
              {CAR_ROUTES.map((route) => (
                <LocationCarCard key={route.id} route={route} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

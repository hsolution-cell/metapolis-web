"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SubReveal from "@/components/sub/SubReveal";
import FloorsBlockToggle from "@/components/sub/floors/FloorsBlockToggle";
import FloorMapPanel from "@/components/sub/floors/FloorMapPanel";
import FloorStoreCard from "@/components/sub/floors/FloorStoreCard";
import { FLOOR_GUIDE_BLOCKS, getFloorGuideBlock } from "@/data/floorGuide";
import type { BranchBlock } from "@/data/branchStores";

type FloorsSectionProps = {
  initialBlock?: BranchBlock;
  initialFloorId?: string;
};

function resolveInitialFloorId(block: BranchBlock, floorId?: string) {
  const blockData = getFloorGuideBlock(block);
  if (!blockData) return "b2";

  if (floorId && blockData.floors.some((floor) => floor.id === floorId)) {
    return floorId;
  }

  return blockData.floors[0].id;
}

export default function FloorsSection({
  initialBlock = "a",
  initialFloorId,
}: FloorsSectionProps) {
  const [block, setBlock] = useState<BranchBlock>(initialBlock);
  const [floorId, setFloorId] = useState(() =>
    resolveInitialFloorId(initialBlock, initialFloorId)
  );
  const navListRef = useRef<HTMLUListElement>(null);

  const blockData = useMemo(
    () => FLOOR_GUIDE_BLOCKS.find((item) => item.id === block)!,
    [block]
  );

  const floor = useMemo(() => {
    const found = blockData.floors.find((item) => item.id === floorId);
    return found ?? blockData.floors[0];
  }, [blockData, floorId]);

  useEffect(() => {
    const nav = navListRef.current;
    if (!nav) return;

    const activeBtn = nav.querySelector<HTMLButtonElement>(".floors_nav_btn.is-active");
    activeBtn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [block, floorId]);

  const handleBlockChange = (next: BranchBlock) => {
    setBlock(next);
    const firstFloor = FLOOR_GUIDE_BLOCKS.find((item) => item.id === next)?.floors[0];
    if (firstFloor) setFloorId(firstFloor.id);
  };

  return (
    <div className="floors">
      <div className="floors_inner content_inner innerTop innerBot">
        <SubReveal threshold={0.12} rootMargin="0px 0px -8% 0px">
          <div className="floors_layout">
            <aside className="floors_sidebar" aria-label="층별 선택">
              <FloorsBlockToggle block={block} onChange={handleBlockChange} />

              <div className="floors_nav">
                <p className="floors_nav_label">
                  <span className="floors_nav_label_site">METAPOLIS DONGTAN</span>
                  <span className="floors_nav_label_dot" aria-hidden="true">
                    {" · "}
                  </span>
                  <span className="floors_nav_label_block">{blockData.label}</span>
                </p>
                <ul className="floors_nav_list" ref={navListRef}>
                  {blockData.floors.map((item) => {
                    const isActive = item.id === floor.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={`floors_nav_btn${isActive ? " is-active" : ""}`}
                          aria-current={isActive ? "true" : undefined}
                          onClick={() => setFloorId(item.id)}
                        >
                          <span className="floors_nav_floor">{item.label}</span>
                          <span className="floors_nav_summary">{item.summary}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            <div className="floors_content">
              <div className="floors_content_head">
                <div className="floors_content_title">
                  <p className="floors_content_block">{blockData.label}</p>
                  <h2 className="floors_content_floor">{floor.label}</h2>
                </div>
                <p className="floors_content_summary">{floor.summary}</p>
              </div>

              <FloorMapPanel
                src={floor.mapImage}
                alt={`${blockData.label} ${floor.label} 층별 안내 지도`}
                caption={floor.mapCaption}
              />

              <section className="floors_directory" aria-labelledby="floors-directory-title">
                <div className="floors_directory_head">
                  <h3 id="floors-directory-title" className="floors_directory_title">
                    Store Directory
                  </h3>
                </div>
                <ul className="floors_store_grid">
                  {floor.stores.map((store) => (
                    <FloorStoreCard key={store.id} store={store} />
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </SubReveal>
      </div>
    </div>
  );
}

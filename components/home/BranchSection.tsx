"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BRANCH_FLOORS,
  BRANCH_STORES,
  STORE_SLOTS,
  getStoreLabel,
  parseDetailKey,
  type BranchBlock,
} from "@/data/branchStores";

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <li className="main_branch_cell main_branch_cell--back">
      <button type="button" className="main_branch_back_btn" data-branch-back onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none" aria-hidden="true">
          <g clipPath="url(#clip_main_branch_back)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.8335 -0.833262C20.8339 -1.26774 20.6984 -1.69147 20.4461 -2.04516C20.1937 -2.39884 19.8371 -2.66478 19.4261 -2.80575C19.0151 -2.94672 18.5704 -2.95567 18.154 -2.83135C17.7377 -2.70704 17.3707 -2.45567 17.1043 -2.11243L2.52098 16.6376C2.23649 17.0033 2.08203 17.4534 2.08203 17.9167C2.08203 18.3801 2.23649 18.8302 2.52098 19.1959L17.1043 37.9459C17.3707 38.2892 17.7377 38.5405 18.154 38.6648C18.5704 38.7892 19.0151 38.7802 19.4261 38.6392C19.8371 38.4983 20.1937 38.2323 20.4461 37.8786C20.6984 37.525 20.8339 37.1012 20.8335 36.6667V28.3542C32.0397 28.5876 37.4231 30.7147 40.1272 33.0272C42.6981 35.2251 43.1689 37.8105 43.6585 40.5188L43.7856 41.2167C43.879 41.7161 44.1518 42.1642 44.5525 42.4765C44.9532 42.7889 45.4543 42.944 45.9614 42.9128C46.4685 42.8816 46.9467 42.6661 47.3061 42.3069C47.6654 41.9478 47.8811 41.4697 47.9126 40.9626C48.2689 35.2376 47.7335 26.9417 43.6897 20.0022C39.7647 13.2667 32.6981 8.08757 20.8335 7.54591V-0.833262Z"
              fill="#B89968"
            />
          </g>
          <defs>
            <clipPath id="clip_main_branch_back">
              <rect width="50" height="50" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span>돌아가기</span>
      </button>
    </li>
  );
}

function FloorNav({
  block,
  activeFloorId,
  onSelect,
}: {
  block: BranchBlock;
  activeFloorId: string;
  onSelect: (key: string) => void;
}) {
  const floors = BRANCH_FLOORS[block];
  const blockLabel = block.toUpperCase();

  return (
    <>
      <li className="main_branch_cell main_branch_cell--label">
        <span className="main_branch_block_name">
          <strong>{blockLabel}</strong> Block
        </span>
      </li>
      {floors.map((floor) =>
        floor.id === activeFloorId ? (
          <li key={floor.id} className="main_branch_cell main_branch_cell--floor-active">
            <span className="main_branch_floor_active">{floor.label}</span>
          </li>
        ) : (
          <li key={floor.id} className="main_branch_cell">
            <button
              type="button"
              className="main_branch_floor_btn"
              onClick={() => onSelect(`${block}-${floor.id}`)}
            >
              {floor.label}
            </button>
          </li>
        )
      )}
    </>
  );
}

function StoreGrid({
  block,
  floorId,
  onBack,
}: {
  block: BranchBlock;
  floorId: string;
  onBack: () => void;
}) {
  const stores = BRANCH_STORES[block][floorId] ?? [];

  return (
    <>
      <BackButton onClick={onBack} />
      {Array.from({ length: STORE_SLOTS }, (_, i) => {
        const slug = stores[i];
        if (slug) {
          const label = getStoreLabel(slug);
          return (
            <li key={slug} className="main_branch_cell main_branch_cell--store">
              <img className="main_branch_store_img" src={`/img/main_branch_store_${slug}.png`} alt={label} />
            </li>
          );
        }
        return (
          <li key={`empty-${i}`} className="main_branch_cell main_branch_cell--empty" aria-hidden="true" />
        );
      })}
    </>
  );
}

export default function BranchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [decoAnimated, setDecoAnimated] = useState(false);
  const [detailBlock, setDetailBlock] = useState<BranchBlock | null>(null);
  const [activeFloorId, setActiveFloorId] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDecoAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const openDetail = useCallback((key: string) => {
    const parsed = parseDetailKey(key);
    if (!parsed) return;
    const { block, floorId } = parsed;
    if (!BRANCH_STORES[block]?.[floorId]) return;
    setDetailBlock(block);
    setActiveFloorId(floorId);
  }, []);

  const closeDetail = useCallback(() => {
    setDetailBlock(null);
    setActiveFloorId("");
  }, []);

  const sectionClass = [
    "main_branch",
    "page",
    "main_section_pad",
    decoAnimated ? "is-inview is-deco-animate" : "",
    detailBlock === "a" ? "is-detail-a" : "",
    detailBlock === "b" ? "is-detail-b" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const renderMainGrid = (block: BranchBlock) =>
    BRANCH_FLOORS[block].map((floor) => (
      <li key={floor.id} className="main_branch_cell">
        <button type="button" className="main_branch_floor_btn" onClick={() => openDetail(`${block}-${floor.id}`)}>
          {floor.label}
        </button>
      </li>
    ));

  return (
    <section ref={sectionRef} className={sectionClass} aria-label="지점 소개">
      <div className="main_branch_deco main_branch_deco--gift" aria-hidden="true">
        <img src="/img/main_branch_gift.png" alt="" />
      </div>
      <div className="main_branch_deco main_branch_deco--shop" aria-hidden="true">
        <img src="/img/main_branch_shop.png" alt="" />
      </div>
      <div className="main_branch_deco main_branch_deco--popcorn" aria-hidden="true">
        <img src="/img/main_branch_popcorn.png" alt="" />
      </div>
      <div className="main_branch_deco main_branch_deco--design" aria-hidden="true">
        <img src="/img/main_branch_design.png" alt="" />
      </div>
      <div className="main_branch_deco main_branch_deco--b-book" aria-hidden="true">
        <img src="/img/main_branch_b_book.png" alt="" />
      </div>
      <div className="main_branch_deco main_branch_deco--b-kitchen" aria-hidden="true">
        <img src="/img/main_branch_b_kitchen.png" alt="" />
      </div>
      <div className="main_branch_watermark" aria-hidden="true">
        <div className="main_branch_watermark_track">
          <p className="main_branch_watermark_text">METAPOLIS DONGTAN METAPOLIS DONGTAN</p>
          <p className="main_branch_watermark_text" aria-hidden="true">
            METAPOLIS DONGTAN METAPOLIS DONGTAN
          </p>
        </div>
      </div>

      <div className="main_branch_inner content_inner">
        <div className="main_branch_head">
          <h2 className="main_branch_title">메타폴리스 층별 주요 매장 안내</h2>
          <p className="main_branch_desc">층마다 다르게 보여지는 다채로운 즐거움을 지금 한눈에 확인해 보세요</p>
        </div>

        <div className="main_branch_panel">
          <div className="main_branch_blocks">
            <div className="main_branch_block">
              <ul className="main_branch_grid">
                <li className="main_branch_cell main_branch_cell--label">
                  <span className="main_branch_block_name">
                    <strong>A</strong> Block
                  </span>
                </li>
                {renderMainGrid("a")}
              </ul>
            </div>
            <div className="main_branch_divider" aria-hidden="true">
              <img src="/img/main_branch_divider.svg" alt="" />
            </div>
            <div className="main_branch_block">
              <ul className="main_branch_grid">
                <li className="main_branch_cell main_branch_cell--label">
                  <span className="main_branch_block_name">
                    <strong>B</strong> Block
                  </span>
                </li>
                {renderMainGrid("b")}
              </ul>
            </div>
          </div>

          <div className="main_branch_detail" id="branchDetailA" hidden={detailBlock !== "a" ? true : undefined}>
            <div className="main_branch_blocks">
              <div className="main_branch_block">
                <ul className="main_branch_grid">
                  {detailBlock === "a" && (
                    <FloorNav block="a" activeFloorId={activeFloorId} onSelect={openDetail} />
                  )}
                </ul>
              </div>
              <div className="main_branch_divider" aria-hidden="true">
                <img src="/img/main_branch_divider.svg" alt="" />
              </div>
              <div className="main_branch_block">
                <ul className="main_branch_grid">
                  {detailBlock === "a" && (
                    <StoreGrid block="a" floorId={activeFloorId} onBack={closeDetail} />
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="main_branch_detail" id="branchDetailB" hidden={detailBlock !== "b" ? true : undefined}>
            <div className="main_branch_blocks">
              <div className="main_branch_block">
                <ul className="main_branch_grid">
                  {detailBlock === "b" && (
                    <StoreGrid block="b" floorId={activeFloorId} onBack={closeDetail} />
                  )}
                </ul>
              </div>
              <div className="main_branch_divider" aria-hidden="true">
                <img src="/img/main_branch_divider.svg" alt="" />
              </div>
              <div className="main_branch_block">
                <ul className="main_branch_grid">
                  {detailBlock === "b" && (
                    <FloorNav block="b" activeFloorId={activeFloorId} onSelect={openDetail} />
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

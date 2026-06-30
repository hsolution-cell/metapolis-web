"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FLOOR_GUIDE_BLOCKS } from "@/data/floorGuide";
import type { BranchBlock } from "@/data/branchStores";

type FloorsBlockToggleProps = {
  block: BranchBlock;
  onChange: (block: BranchBlock) => void;
};

export default function FloorsBlockToggle({ block, onChange }: FloorsBlockToggleProps) {
  const toggleRef = useRef<HTMLDivElement>(null);
  const [hoverBlock, setHoverBlock] = useState<BranchBlock | null>(null);
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });
  const [ready, setReady] = useState(false);

  const targetBlock = hoverBlock ?? block;

  const updateIndicator = useCallback(() => {
    const toggle = toggleRef.current;
    if (!toggle) return;

    const btn = toggle.querySelector<HTMLButtonElement>(`[data-block-id="${targetBlock}"]`);
    if (!btn) return;

    const toggleRect = toggle.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    setIndicator({
      x: btnRect.left - toggleRect.left,
      width: btnRect.width,
    });
    setReady(true);
  }, [targetBlock]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return (
    <div
      ref={toggleRef}
      className={`floors_block_toggle${hoverBlock ? " is-hovering" : ""}`}
      role="tablist"
      aria-label="블록 선택"
      onMouseLeave={() => setHoverBlock(null)}
    >
      <span
        className={`floors_block_indicator${ready ? " is-ready" : ""}`}
        aria-hidden="true"
        style={{
          width: indicator.width,
          transform: `translateX(${indicator.x}px)`,
        }}
      />
      {FLOOR_GUIDE_BLOCKS.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          data-block-id={item.id}
          className={`floors_block_btn${block === item.id ? " is-active" : ""}${hoverBlock === item.id ? " is-hover" : ""}`}
          aria-selected={block === item.id}
          onClick={() => onChange(item.id)}
          onMouseEnter={() => setHoverBlock(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

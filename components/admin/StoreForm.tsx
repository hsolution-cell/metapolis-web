"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createStore, updateStore, type StoreInput } from "@/app/admin/actions";
import { BRANCH_FLOORS, type BranchBlock } from "@/data/branchStores";
import { STORE_GUIDE_CATEGORIES } from "@/data/storeDirectory";

const ICON_OPTIONS: { value: string; label: string }[] = [
  { value: "fashion", label: "패션" },
  { value: "lingerie", label: "이너웨어" },
  { value: "shoes", label: "신발" },
  { value: "fb", label: "식음료(F&B)" },
  { value: "cafe", label: "카페" },
  { value: "makeup", label: "화장품" },
  { value: "hair_service", label: "미용실" },
  { value: "jewelry", label: "귀금속" },
  { value: "digital", label: "디지털·전자" },
  { value: "culture", label: "영화관" },
  { value: "book", label: "서점" },
  { value: "hospital", label: "병원·의원" },
  { value: "arcade", label: "오락실" },
  { value: "mart", label: "마트" },
  { value: "kids", label: "아동" },
  { value: "living", label: "리빙·인테리어" },
  { value: "service", label: "기타·서비스" },
];

const GUIDE_OPTIONS = STORE_GUIDE_CATEGORIES.filter((c) => c.id !== "all").map((c) => ({
  value: c.id,
  label: c.labelKo,
}));

type StoreFormProps = {
  mode: "new" | "edit";
  storeId?: string;
  initial?: StoreInput;
};

export default function StoreForm({ mode, storeId, initial }: StoreFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [nameEn, setNameEn] = useState(initial?.nameEn ?? "");
  const [block, setBlock] = useState<BranchBlock>((initial?.block as BranchBlock) ?? "a");
  const [floorId, setFloorId] = useState(
    initial?.floorId ?? BRANCH_FLOORS.a[0].id
  );
  const [tel, setTel] = useState(initial?.tel ?? "");
  const [iconCategory, setIconCategory] = useState(initial?.iconCategory ?? "fashion");
  const [guideCategory, setGuideCategory] = useState(initial?.guideCategory ?? "fashion");
  const [isSignature, setIsSignature] = useState(initial?.isSignature ?? false);
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const floorOptions = BRANCH_FLOORS[block] ?? [];

  function handleBlockChange(next: BranchBlock) {
    setBlock(next);
    const floors = BRANCH_FLOORS[next];
    if (!floors.some((f) => f.id === floorId)) {
      setFloorId(floors[0].id);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("매장명을 입력해 주세요.");
      return;
    }

    startTransition(async () => {
      try {
        const input: StoreInput = {
          name,
          nameEn,
          block,
          floorId,
          tel,
          iconCategory,
          guideCategory,
          isSignature,
          sortOrder,
        };
        if (mode === "new") {
          await createStore(input);
        } else {
          await updateStore(storeId!, input);
        }
        router.push("/admin/stores");
        router.refresh();
      } catch {
        setError("저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    });
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div style={{ display: "flex", gap: 16 }}>
        <div className="admin-field" style={{ flex: 1 }}>
          <label htmlFor="name">매장명</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="admin-field" style={{ flex: 1 }}>
          <label htmlFor="nameEn">영문 매장명 (영문 층별안내용, 비우면 매장명 그대로)</label>
          <input
            id="nameEn"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            placeholder="예: STARBUCKS"
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div className="admin-field" style={{ flex: 1 }}>
          <label htmlFor="block">블록</label>
          <select
            id="block"
            value={block}
            onChange={(e) => handleBlockChange(e.target.value as BranchBlock)}
          >
            <option value="a">A Block</option>
            <option value="b">B Block</option>
          </select>
        </div>
        <div className="admin-field" style={{ flex: 1 }}>
          <label htmlFor="floor">층</label>
          <select id="floor" value={floorId} onChange={(e) => setFloorId(e.target.value)}>
            {floorOptions.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field" style={{ width: 130 }}>
          <label htmlFor="sortOrder">순서</label>
          <input
            id="sortOrder"
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="tel">전화번호</label>
        <input id="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="예: 031-8003-0000" />
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div className="admin-field" style={{ flex: 1 }}>
          <label htmlFor="icon">아이콘 분류</label>
          <select id="icon" value={iconCategory} onChange={(e) => setIconCategory(e.target.value)}>
            {ICON_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field" style={{ flex: 1 }}>
          <label htmlFor="guide">카테고리(가이드)</label>
          <select id="guide" value={guideCategory} onChange={(e) => setGuideCategory(e.target.value)}>
            {GUIDE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="admin-check">
        <input
          type="checkbox"
          checked={isSignature}
          onChange={(e) => setIsSignature(e.target.checked)}
        />
        시그니처 매장
      </label>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form__actions">
        <button type="button" className="admin-btn" onClick={() => router.push("/admin/stores")}>
          취소
        </button>
        <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}

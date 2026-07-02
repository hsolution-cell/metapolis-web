"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/admin/RichEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  createStoreEvent,
  updateStoreEvent,
  type StoreEventInput,
} from "@/app/admin/actions";

type StoreOption = { id: string; name: string };

type StoreEventFormProps = {
  mode: "new" | "edit";
  storeEventId?: string;
  stores: StoreOption[];
  initial?: StoreEventInput;
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function StoreEventForm({
  mode,
  storeEventId,
  stores,
  initial,
}: StoreEventFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [brandName, setBrandName] = useState(initial?.brandName ?? "");
  const [storeId, setStoreId] = useState(initial?.storeId ?? "");
  const [startDate, setStartDate] = useState(initial?.startDate ?? todayISO());
  const [endDate, setEndDate] = useState(initial?.endDate ?? todayISO());
  const [thumbnail, setThumbnail] = useState<string | null>(initial?.thumbnail ?? null);
  const [body, setBody] = useState(initial?.body ?? "");
  const [pinned, setPinned] = useState(initial?.pinned ?? false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleStoreChange(id: string) {
    setStoreId(id);
    // 매장 선택 시 브랜드명이 비어 있으면 매장명으로 자동 채움
    if (id && !brandName.trim()) {
      const store = stores.find((s) => s.id === id);
      if (store) setBrandName(store.name);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("제목을 입력해 주세요.");
      return;
    }
    if (endDate < startDate) {
      setError("종료일이 시작일보다 빠를 수 없습니다.");
      return;
    }

    startTransition(async () => {
      try {
        const input: StoreEventInput = {
          title,
          brandName,
          storeId: storeId || null,
          startDate,
          endDate,
          thumbnail,
          body,
          pinned,
        };
        if (mode === "new") {
          await createStoreEvent(input);
        } else {
          await updateStoreEvent(storeEventId!, input);
        }
        router.push("/admin/store-events");
        router.refresh();
      } catch {
        setError("저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    });
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-field">
        <label htmlFor="title">제목</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div className="admin-field" style={{ flex: 1 }}>
          <label htmlFor="store">연결 매장 (선택)</label>
          <select id="store" value={storeId} onChange={(e) => handleStoreChange(e.target.value)}>
            <option value="">— 매장 연결 안 함 —</option>
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field" style={{ flex: 1 }}>
          <label htmlFor="brand">브랜드명 (카드 배지)</label>
          <input id="brand" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div className="admin-field" style={{ flex: 1 }}>
          <label htmlFor="startDate">시작일</label>
          <input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="admin-field" style={{ flex: 1 }}>
          <label htmlFor="endDate">종료일</label>
          <input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>

      <div className="admin-field">
        <label>썸네일 이미지</label>
        <ImageUploadField value={thumbnail} onChange={setThumbnail} />
      </div>

      <label className="admin-check">
        <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} />
        상단 고정
      </label>

      <div className="admin-field">
        <label>본문</label>
        <RichEditor value={body} onChange={setBody} />
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form__actions">
        <button type="button" className="admin-btn" onClick={() => router.push("/admin/store-events")}>
          취소
        </button>
        <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}

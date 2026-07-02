"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { createPopup, updatePopup, type PopupInput } from "@/app/admin/actions";

type PopupFormProps = {
  mode: "new" | "edit";
  popupId?: string;
  initial?: PopupInput;
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function PopupForm({ mode, popupId, initial }: PopupFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [image, setImage] = useState<string | null>(initial?.image ?? null);
  const [linkHref, setLinkHref] = useState(initial?.linkHref ?? "");
  const [startDate, setStartDate] = useState(initial?.startDate ?? todayISO());
  const [endDate, setEndDate] = useState(initial?.endDate ?? todayISO());
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [active, setActive] = useState(initial?.active ?? true);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("제목을 입력해 주세요.");
      return;
    }
    if (!image) {
      setError("팝업 이미지를 등록해 주세요.");
      return;
    }
    if (endDate < startDate) {
      setError("종료일이 시작일보다 빠를 수 없습니다.");
      return;
    }

    startTransition(async () => {
      try {
        const input: PopupInput = {
          title,
          image,
          linkHref: linkHref.trim() || null,
          startDate,
          endDate,
          sortOrder: Number.parseInt(sortOrder, 10) || 0,
          active,
        };
        if (mode === "new") {
          await createPopup(input);
        } else {
          await updatePopup(popupId!, input);
        }
        router.push("/admin/popups");
        router.refresh();
      } catch {
        setError("저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    });
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-field">
        <label htmlFor="title">제목 (관리용)</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="admin-field">
        <label>팝업 이미지</label>
        <ImageUploadField value={image} onChange={setImage} />
      </div>

      <div className="admin-field">
        <label htmlFor="linkHref">클릭 시 이동 링크 (선택)</label>
        <input
          id="linkHref"
          value={linkHref}
          onChange={(e) => setLinkHref(e.target.value)}
          placeholder="예: /events 또는 https://..."
        />
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div className="admin-field" style={{ flex: 1 }}>
          <label htmlFor="startDate">노출 시작일</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="admin-field" style={{ flex: 1 }}>
          <label htmlFor="endDate">노출 종료일</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-field" style={{ maxWidth: 160 }}>
        <label htmlFor="sortOrder">정렬 순서</label>
        <input
          id="sortOrder"
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        />
      </div>

      <label className="admin-check">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        노출 (체크 해제 시 사이트에 표시 안 함)
      </label>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form__actions">
        <button
          type="button"
          className="admin-btn"
          onClick={() => router.push("/admin/popups")}
        >
          취소
        </button>
        <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}

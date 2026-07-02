"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  createHeroBanner,
  updateHeroBanner,
  type HeroBannerInput,
} from "@/app/admin/actions";

type HeroBannerFormProps = {
  mode: "new" | "edit";
  locale: "ko" | "en";
  bannerId?: string;
  initial?: HeroBannerInput;
};

export default function HeroBannerForm({
  mode,
  locale,
  bannerId,
  initial,
}: HeroBannerFormProps) {
  const router = useRouter();
  const listPath =
    locale === "en" ? "/admin/hero-banners?locale=en" : "/admin/hero-banners";
  const [badge, setBadge] = useState(initial?.badge ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [linkHref, setLinkHref] = useState(initial?.linkHref ?? "");
  const [bg, setBg] = useState<string | null>(initial?.bg ?? null);
  const [bgMobile, setBgMobile] = useState<string | null>(initial?.bgMobile ?? null);
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [active, setActive] = useState(initial?.active ?? true);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("메인 문구를 입력해 주세요.");
      return;
    }
    if (!bg) {
      setError("데스크톱 배경 이미지를 등록해 주세요.");
      return;
    }

    startTransition(async () => {
      try {
        const input: HeroBannerInput = {
          locale,
          badge,
          title,
          description,
          linkHref: linkHref.trim() || null,
          bg,
          bgMobile,
          sortOrder: Number.parseInt(sortOrder, 10) || 0,
          active,
        };
        if (mode === "new") {
          await createHeroBanner(input);
        } else {
          await updateHeroBanner(bannerId!, input);
        }
        router.push(listPath);
        router.refresh();
      } catch {
        setError("저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    });
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-field">
        <label htmlFor="badge">라벨 (배지)</label>
        <input
          id="badge"
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          placeholder="예: NOTICE"
        />
      </div>

      <div className="admin-field">
        <label htmlFor="title">메인 문구</label>
        <textarea
          id="title"
          rows={2}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="줄바꿈은 Enter 로 입력합니다."
        />
      </div>

      <div className="admin-field">
        <label htmlFor="description">설명 문구</label>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="admin-field">
        <label htmlFor="linkHref">설명 링크 (선택)</label>
        <input
          id="linkHref"
          value={linkHref}
          onChange={(e) => setLinkHref(e.target.value)}
          placeholder="예: /events 또는 https://..."
        />
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div className="admin-field" style={{ flex: 1 }}>
          <label>데스크톱 배경 이미지</label>
          <ImageUploadField value={bg} onChange={setBg} />
        </div>
        <div className="admin-field" style={{ flex: 1 }}>
          <label>모바일 배경 이미지</label>
          <ImageUploadField value={bgMobile} onChange={setBgMobile} />
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
        노출 (체크 해제 시 메인에서 숨김)
      </label>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form__actions">
        <button
          type="button"
          className="admin-btn"
          onClick={() => router.push(listPath)}
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

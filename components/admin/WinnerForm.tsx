"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/admin/RichEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { createWinner, updateWinner, type WinnerInput } from "@/app/admin/actions";

type WinnerFormProps = {
  mode: "new" | "edit";
  winnerId?: string;
  initial?: WinnerInput;
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function WinnerForm({ mode, winnerId, initial }: WinnerFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [date, setDate] = useState(initial?.date ?? todayISO());
  const [thumbnail, setThumbnail] = useState<string | null>(initial?.thumbnail ?? null);
  const [body, setBody] = useState(initial?.body ?? "");
  const [pinned, setPinned] = useState(initial?.pinned ?? false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("제목을 입력해 주세요.");
      return;
    }

    startTransition(async () => {
      try {
        const input: WinnerInput = { title, date, thumbnail, body, pinned };
        if (mode === "new") {
          await createWinner(input);
        } else {
          await updateWinner(winnerId!, input);
        }
        router.push("/admin/winners");
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

      <div className="admin-field">
        <label htmlFor="date">발표일</label>
        <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className="admin-field">
        <label>썸네일 이미지</label>
        <ImageUploadField value={thumbnail} onChange={setThumbnail} />
      </div>

      <label className="admin-check">
        <input
          type="checkbox"
          checked={pinned}
          onChange={(e) => setPinned(e.target.checked)}
        />
        상단 고정 (목록 맨 위에 표시)
      </label>

      <div className="admin-field">
        <label>본문</label>
        <RichEditor value={body} onChange={setBody} />
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form__actions">
        <button type="button" className="admin-btn" onClick={() => router.push("/admin/winners")}>
          취소
        </button>
        <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}

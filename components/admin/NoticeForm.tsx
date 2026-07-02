"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import { createNotice, updateNotice, type NoticeInput } from "@/app/admin/actions";
import { NOTICE_CATEGORY_OPTIONS } from "@/lib/notices-db";

type NoticeFormProps = {
  mode: "new" | "edit";
  noticeId?: string;
  initial?: NoticeInput;
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// TinyMCE 이미지 업로드 → /api/admin/upload → Supabase Storage
function imagesUploadHandler(blobInfo: { blob: () => Blob; filename: () => string }): Promise<string> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());
    fetch("/api/admin/upload", { method: "POST", body: formData })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("업로드 실패"))))
      .then((json) => resolve(json.location as string))
      .catch((err) => reject(err?.message ?? "업로드 실패"));
  });
}

export default function NoticeForm({ mode, noticeId, initial }: NoticeFormProps) {
  const router = useRouter();
  const [category, setCategory] = useState(initial?.category ?? "info");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [date, setDate] = useState(initial?.date ?? todayISO());
  const [body, setBody] = useState(initial?.body ?? "");
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
        const input: NoticeInput = { category, title, date, body };
        if (mode === "new") {
          await createNotice(input);
        } else {
          await updateNotice(noticeId!, input);
        }
        router.push("/admin/notices");
        router.refresh();
      } catch {
        setError("저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    });
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-field">
        <label htmlFor="category">구분</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {NOTICE_CATEGORY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-field">
        <label htmlFor="title">제목</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="admin-field">
        <label htmlFor="date">등록일</label>
        <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className="admin-field">
        <label>본문</label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          value={body}
          onEditorChange={(content) => setBody(content)}
          init={{
            height: 440,
            menubar: false,
            plugins: "lists link image table code autolink",
            toolbar:
              "undo redo | bold italic underline | bullist numlist | link image table | removeformat code",
            images_upload_handler: imagesUploadHandler,
            branding: false,
          }}
        />
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form__actions">
        <button
          type="button"
          className="admin-btn"
          onClick={() => router.push("/admin/notices")}
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

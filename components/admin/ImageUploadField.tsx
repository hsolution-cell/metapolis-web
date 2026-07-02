"use client";

import { useState } from "react";

export default function ImageUploadField({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("upload failed");
      const json = await res.json();
      onChange(json.location as string);
    } catch {
      setError("이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="admin-imgfield">
      {value ? (
        <div className="admin-imgfield__preview">
          <img src={value} alt="썸네일 미리보기" />
          <button
            type="button"
            className="admin-btn admin-btn--sm admin-btn--danger"
            onClick={() => onChange(null)}
          >
            제거
          </button>
        </div>
      ) : null}

      <label className="admin-btn admin-btn--sm" style={{ cursor: "pointer" }}>
        {uploading ? "업로드 중…" : value ? "이미지 변경" : "이미지 선택"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
          hidden
        />
      </label>

      {error && <p className="admin-error">{error}</p>}
    </div>
  );
}

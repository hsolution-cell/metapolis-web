"use client";

import { Editor } from "@tinymce/tinymce-react";

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

export default function RichEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (content: string) => void;
}) {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      value={value}
      onEditorChange={onChange}
      init={{
        height: 440,
        menubar: false,
        plugins: "lists link image table code autolink",
        toolbar:
          "undo redo | fontsize | bold italic underline | bullist numlist | link image table | removeformat code",
        font_size_formats: "12px 14px 15px 16px 18px 20px 24px 28px 32px",
        images_upload_handler: imagesUploadHandler,
        branding: false,
      }}
    />
  );
}

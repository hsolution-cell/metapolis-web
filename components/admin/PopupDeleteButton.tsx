"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePopup } from "@/app/admin/actions";

export default function PopupDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="admin-btn admin-btn--sm admin-btn--danger"
      disabled={pending}
      onClick={() => {
        if (!confirm("이 팝업을 삭제할까요?")) return;
        startTransition(async () => {
          await deletePopup(id);
          router.refresh();
        });
      }}
    >
      {pending ? "삭제 중…" : "삭제"}
    </button>
  );
}

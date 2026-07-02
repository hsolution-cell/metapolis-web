"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteWinner } from "@/app/admin/actions";

export default function WinnerDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="admin-btn admin-btn--sm admin-btn--danger"
      disabled={pending}
      onClick={() => {
        if (!confirm("이 당첨자 발표를 삭제할까요?")) return;
        startTransition(async () => {
          await deleteWinner(id);
          router.refresh();
        });
      }}
    >
      {pending ? "삭제 중…" : "삭제"}
    </button>
  );
}

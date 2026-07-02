"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteStore } from "@/app/admin/actions";

export default function StoreDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="admin-btn admin-btn--sm admin-btn--danger"
      disabled={pending}
      onClick={() => {
        if (!confirm("이 매장을 삭제할까요?")) return;
        startTransition(async () => {
          await deleteStore(id);
          router.refresh();
        });
      }}
    >
      {pending ? "삭제 중…" : "삭제"}
    </button>
  );
}

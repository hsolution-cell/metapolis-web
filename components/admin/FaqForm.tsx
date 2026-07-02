"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/admin/RichEditor";
import { createFaq, updateFaq, type FaqInput } from "@/app/admin/actions";
import type { FaqCategory } from "@/lib/faq-db";

type FaqFormProps = {
  mode: "new" | "edit";
  faqId?: string;
  categories: FaqCategory[];
  initial?: FaqInput;
};

export default function FaqForm({ mode, faqId, categories, initial }: FaqFormProps) {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? categories[0]?.id ?? "");
  const [question, setQuestion] = useState(initial?.question ?? "");
  const [answer, setAnswer] = useState(initial?.answer ?? "");
  const [pinned, setPinned] = useState(initial?.pinned ?? false);
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!question.trim()) {
      setError("질문을 입력해 주세요.");
      return;
    }

    startTransition(async () => {
      try {
        const input: FaqInput = {
          categoryId: categoryId || null,
          question,
          answer,
          pinned,
          sortOrder,
        };
        if (mode === "new") {
          await createFaq(input);
        } else {
          await updateFaq(faqId!, input);
        }
        router.push("/admin/faq");
        router.refresh();
      } catch {
        setError("저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    });
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div style={{ display: "flex", gap: 16 }}>
        <div className="admin-field" style={{ flex: 1 }}>
          <label htmlFor="category">구분</label>
          <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {categories.length === 0 && <option value="">(구분 없음)</option>}
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field" style={{ width: 140 }}>
          <label htmlFor="sortOrder">순서(작을수록 위)</label>
          <input
            id="sortOrder"
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="question">질문</label>
        <input id="question" value={question} onChange={(e) => setQuestion(e.target.value)} />
      </div>

      <label className="admin-check">
        <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} />
        상단 고정
      </label>

      <div className="admin-field">
        <label>답변</label>
        <RichEditor value={answer} onChange={setAnswer} />
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form__actions">
        <button type="button" className="admin-btn" onClick={() => router.push("/admin/faq")}>
          취소
        </button>
        <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}

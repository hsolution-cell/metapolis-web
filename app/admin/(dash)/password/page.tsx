"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminPasswordPage() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setDone(false);

    if (next.length < 6) {
      setError("새 비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (next !== confirm) {
      setError("새 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }
    if (next === current) {
      setError("현재 비밀번호와 다른 비밀번호를 입력해 주세요.");
      return;
    }

    setPending(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user?.email) {
        setError("로그인 정보를 확인할 수 없습니다. 다시 로그인해 주세요.");
        return;
      }

      // 현재 비밀번호 검증
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: current,
      });
      if (signInError) {
        setError("현재 비밀번호가 올바르지 않습니다.");
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: next,
      });
      if (updateError) {
        setError("비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        return;
      }

      setDone(true);
      setCurrent("");
      setNext("");
      setConfirm("");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>비밀번호 변경</h1>
      </div>

      <form className="admin-form" onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <div className="admin-field">
          <label htmlFor="current">현재 비밀번호</label>
          <input
            id="current"
            type="password"
            autoComplete="current-password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
          />
        </div>

        <div className="admin-field">
          <label htmlFor="next">새 비밀번호 (6자 이상)</label>
          <input
            id="next"
            type="password"
            autoComplete="new-password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
          />
        </div>

        <div className="admin-field">
          <label htmlFor="confirm">새 비밀번호 확인</label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        {error && <p className="admin-error">{error}</p>}
        {done && (
          <p style={{ color: "#1a7f37", fontSize: 14, margin: 0 }}>
            비밀번호가 변경되었습니다.
          </p>
        )}

        <div className="admin-form__actions">
          <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
            {pending ? "변경 중…" : "변경"}
          </button>
        </div>
      </form>
    </>
  );
}

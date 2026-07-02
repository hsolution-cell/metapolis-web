"use client";

/** 관리자 화면 공통 에러 — DB 조회 실패 등 오류 시 복구 UI */
export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="admin-empty" style={{ padding: "60px 20px" }}>
      <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#111" }}>
        문제가 발생했습니다
      </p>
      <p style={{ margin: "0 0 16px" }}>
        데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <button type="button" className="admin-btn admin-btn--primary" onClick={reset}>
        다시 시도
      </button>
    </div>
  );
}

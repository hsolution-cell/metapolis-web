"use client";

/** 공개 페이지 공통 에러 화면 — 데이터 조회 실패 등 예기치 못한 오류 시 표시 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "120px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
        일시적인 오류가 발생했습니다
      </h1>
      <p style={{ color: "#777", margin: 0, fontSize: 15 }}>
        잠시 후 다시 시도해 주세요. 문제가 계속되면 고객센터(031-371-7000)로 문의해
        주세요.
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          marginTop: 8,
          padding: "12px 28px",
          borderRadius: 999,
          border: "1px solid #111",
          background: "#111",
          color: "#fff",
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        다시 시도
      </button>
    </div>
  );
}

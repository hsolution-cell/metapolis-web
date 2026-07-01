"use client";

type EventsPaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  ariaLabel?: string;
};

export default function EventsPagination({
  page,
  totalPages,
  onChange,
  ariaLabel = "이벤트 페이지",
}: EventsPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="events_pagination" aria-label={ariaLabel}>
      <button
        type="button"
        className="events_page_btn events_page_btn--arrow"
        aria-label="이전 페이지"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        ‹
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={`events_page_btn${pageNumber === page ? " is-active" : ""}`}
          aria-label={`${pageNumber}페이지`}
          aria-current={pageNumber === page ? "page" : undefined}
          onClick={() => onChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        className="events_page_btn events_page_btn--arrow"
        aria-label="다음 페이지"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        ›
      </button>
    </nav>
  );
}

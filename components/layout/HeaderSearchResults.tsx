"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  formatStoreLocation,
  getStoreFloorHref,
  getStoreSearchPageHref,
  searchStores,
} from "@/data/storeSearch";
import { useSearchableStores } from "@/lib/use-stores";

type HeaderSearchResultsProps = {
  query: string;
  onSelect: () => void;
};

export default function HeaderSearchResults({
  query,
  onSelect,
}: HeaderSearchResultsProps) {
  const pathname = usePathname();
  const isEn = pathname === "/en" || pathname?.startsWith("/en/");
  const stores = useSearchableStores();
  const results = useMemo(() => searchStores(stores, query), [stores, query]);
  const trimmed = query.trim();

  if (!trimmed) return null;

  if (!results.length) {
    return (
      <p className="header_search_empty">
        {isEn ? "No results found." : "검색 결과가 없습니다."}
      </p>
    );
  }

  const preview = results.slice(0, 5);

  return (
    <div className="header_search_results">
      <p className="header_search_results_label">
        {isEn ? "Store results" : "매장 검색 결과"} <span>{results.length}</span>
      </p>
      <ul className="header_search_results_list">
        {preview.map((store) => (
          <li key={store.id}>
            <Link
              href={getStoreFloorHref(store, isEn)}
              className="header_search_results_link"
              onClick={onSelect}
            >
              <strong>{isEn ? store.nameEn ?? store.name : store.name}</strong>
              <span>{formatStoreLocation(store)}</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* 전체 보기(국문 검색 페이지)는 영문에서 미노출 */}
      {!isEn && results.length > preview.length ? (
        <Link
          href={getStoreSearchPageHref(trimmed)}
          className="header_search_results_more"
          onClick={onSelect}
        >
          전체 {results.length}건 보기
        </Link>
      ) : null}
    </div>
  );
}

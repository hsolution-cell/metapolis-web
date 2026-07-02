"use client";

import Link from "next/link";
import { useMemo } from "react";
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
  const stores = useSearchableStores();
  const results = useMemo(() => searchStores(stores, query), [stores, query]);
  const trimmed = query.trim();

  if (!trimmed) return null;

  if (!results.length) {
    return <p className="header_search_empty">검색 결과가 없습니다.</p>;
  }

  const preview = results.slice(0, 5);

  return (
    <div className="header_search_results">
      <p className="header_search_results_label">
        매장 검색 결과 <span>{results.length}</span>
      </p>
      <ul className="header_search_results_list">
        {preview.map((store) => (
          <li key={store.id}>
            <Link
              href={getStoreFloorHref(store)}
              className="header_search_results_link"
              onClick={onSelect}
            >
              <strong>{store.name}</strong>
              <span>{formatStoreLocation(store)}</span>
            </Link>
          </li>
        ))}
      </ul>
      {results.length > preview.length ? (
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

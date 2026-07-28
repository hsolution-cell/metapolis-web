"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import HeaderSearchResults from "@/components/layout/HeaderSearchResults";
import { resolveStoreSearchDestination } from "@/data/storeSearch";
import { useSearchableStores } from "@/lib/use-stores";
import { useToast } from "@/contexts/ToastContext";

type StoreSearchBarProps = {
  autoFocus?: boolean;
};

/** 층별안내·매장검색 페이지 상단에 배치하는 인페이지 매장 검색창 (모바일 포함 전 해상도 노출) */
export default function StoreSearchBar({ autoFocus }: StoreSearchBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const stores = useSearchableStores();
  const [query, setQuery] = useState("");

  const isEn = pathname === "/en" || pathname?.startsWith("/en/");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const destination = resolveStoreSearchDestination(stores, query, isEn);
    if (destination.type === "empty") {
      showToast(isEn ? "Please enter a search term." : "검색어를 입력해 주세요.");
      return;
    }
    setQuery("");
    router.push(destination.href);
  };

  return (
    <div className="store_searchbar">
      <form className="store_searchbar_form" role="search" onSubmit={handleSubmit}>
        <label className="sr_only" htmlFor="storeSearchBarInput">
          {isEn ? "Store search" : "매장 검색"}
        </label>
        <input
          type="search"
          id="storeSearchBarInput"
          name="q"
          className="store_searchbar_input"
          placeholder={isEn ? "Which store are you looking for?" : "찾으시는 매장이 있으신가요?"}
          autoComplete="off"
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="store_searchbar_submit" aria-label={isEn ? "Search" : "검색"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </form>
      {query.trim() ? (
        <div className="store_searchbar_results">
          <HeaderSearchResults query={query} onSelect={() => setQuery("")} />
        </div>
      ) : null}
    </div>
  );
}

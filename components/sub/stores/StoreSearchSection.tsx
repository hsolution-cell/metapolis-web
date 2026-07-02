"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import SubReveal from "@/components/sub/SubReveal";
import {
  formatStoreLocation,
  getStoreFloorHref,
  searchStores,
} from "@/data/storeSearch";
import { useSearchableStores } from "@/lib/use-stores";

export default function StoreSearchSection() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const stores = useSearchableStores();

  const results = useMemo(() => searchStores(stores, query), [stores, query]);

  return (
    <div className="floors store_search">
      <div className="floors_inner content_inner innerTop innerBot">
        <SubReveal threshold={0.12} rootMargin="0px 0px -8% 0px">
          <header className="store_search_head">
            <p className="store_search_eyebrow">Store Search</p>
            <h2 className="store_search_title">매장 검색</h2>
            {query ? (
              <p className="store_search_lead">
                <strong>&quot;{query}&quot;</strong> 검색 결과{" "}
                <span>{results.length}</span>건
              </p>
            ) : (
              <p className="store_search_lead">헤더 검색창에서 매장명을 입력해 주세요.</p>
            )}
          </header>

          {!query ? (
            <p className="store_search_empty">검색어가 없습니다.</p>
          ) : results.length ? (
            <ul className="store_search_list">
              {results.map((store) => (
                <li key={store.id}>
                  <Link href={getStoreFloorHref(store)} className="store_search_item">
                    <strong className="store_search_item_name">{store.name}</strong>
                    <span className="store_search_item_location">
                      {formatStoreLocation(store)}
                    </span>
                    {store.tel !== "-" ? (
                      <span className="store_search_item_tel">{store.tel}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="store_search_empty">
              <p>검색 결과가 없습니다.</p>
              <p className="store_search_empty_hint">
                매장명을 다시 확인하시거나 추천 검색어를 이용해 주세요.
              </p>
            </div>
          )}

          {query ? (
            <p className="store_search_back">
              <Link href="/stores/floors">층별안내로 이동</Link>
            </p>
          ) : null}
        </SubReveal>
      </div>
    </div>
  );
}

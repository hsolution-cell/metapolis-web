"use client";

import { useEffect, useState } from "react";
import type { StoreRecord } from "@/data/storeDirectory";

// 모듈 캐시 — 세션 내 한 번만 fetch
let cache: StoreRecord[] | null = null;
let inflight: Promise<StoreRecord[]> | null = null;

function loadStores(): Promise<StoreRecord[]> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetch("/api/stores")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: StoreRecord[]) => {
        cache = data;
        return data;
      })
      .catch(() => []);
  }
  return inflight;
}

/** 검색용 전체 매장 목록 (클라이언트, 캐시) */
export function useSearchableStores(): StoreRecord[] {
  const [stores, setStores] = useState<StoreRecord[]>(cache ?? []);

  useEffect(() => {
    if (cache) {
      setStores(cache);
      return;
    }
    let active = true;
    loadStores().then((s) => {
      if (active) setStores(s);
    });
    return () => {
      active = false;
    };
  }, []);

  return stores;
}

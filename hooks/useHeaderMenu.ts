"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getGnbIndex, GNB_GROUPS } from "@/data/navigation";
import { resolveStoreSearchDestination } from "@/data/storeSearch";
import { useSearchableStores } from "@/lib/use-stores";
import { useToast } from "@/contexts/ToastContext";

const DESKTOP_BREAKPOINT = 1280;

function isDesktop() {
  return typeof window !== "undefined" && window.innerWidth > DESKTOP_BREAKPOINT;
}

export function useHeaderMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const searchableStores = useSearchableStores();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeGnbIndex = getGnbIndex(pathname);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  const openSearch = useCallback(() => {
    if (!isDesktop()) return;
    setMegaOpen(false);
    setHoverIndex(null);
    setSearchOpen(true);
  }, []);

  const toggleSearch = useCallback(() => {
    if (!isDesktop()) return;
    if (searchOpen) closeSearch();
    else openSearch();
  }, [searchOpen, closeSearch, openSearch]);

  const openMega = useCallback(() => {
    if (!isDesktop()) return;
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    setMegaOpen(true);
  }, []);

  const closeMega = useCallback(() => {
    megaTimerRef.current = setTimeout(() => {
      setMegaOpen(false);
      setHoverIndex(null);
    }, 120);
  }, []);

  const cancelCloseMega = useCallback(() => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
  }, []);

  const handleGnbEnter = useCallback(
    (index: number) => {
      if (searchOpen) closeSearch();
      openMega();
      setHoverIndex(index);
    },
    [searchOpen, closeSearch, openMega]
  );

  const handleMegaColEnter = useCallback(
    (colIndex: number) => {
      if (searchOpen) closeSearch();
      openMega();
      setHoverIndex(colIndex);
    },
    [searchOpen, closeSearch, openMega]
  );

  const handleMenuEnter = useCallback(() => {
    if (searchOpen) closeSearch();
    openMega();
  }, [searchOpen, closeSearch, openMega]);

  const openMobileMenu = useCallback(() => {
    closeSearch();
    setMobileOpen(true);
    document.body.style.overflow = "hidden";
  }, [closeSearch]);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    setMobileAccordion(null);
    document.body.style.overflow = "";
  }, []);

  const toggleMobileAccordion = useCallback((index: number) => {
    setMobileAccordion((prev) => (prev === index ? null : index));
  }, []);

  const isEnPath = pathname === "/en" || pathname?.startsWith("/en/");

  const navigateStoreSearch = useCallback(
    (query: string) => {
      const destination = resolveStoreSearchDestination(
        searchableStores,
        query,
        isEnPath
      );

      if (destination.type === "empty") {
        showToast(isEnPath ? "Please enter a search term." : "검색어를 입력해 주세요.");
        return;
      }

      router.push(destination.href);
      closeSearch();
    },
    [router, closeSearch, showToast, searchableStores, isEnPath]
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      navigateStoreSearch(searchQuery);
    },
    [navigateStoreSearch, searchQuery]
  );

  const handleSearchTag = useCallback(
    (keyword: string) => {
      setSearchQuery(keyword);
      navigateStoreSearch(keyword);
    },
    [navigateStoreSearch]
  );

  const isCurrentLink = useCallback(
    (href: string) => pathname === href,
    [pathname]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const timer = setTimeout(() => searchInputRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, [searchOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchOpen) closeSearch();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!searchOpen) return;
      const target = e.target as HTMLElement;
      if (target.closest("header")) return;
      closeSearch();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    closeMobileMenu();
    closeSearch();
    setMegaOpen(false);
    setHoverIndex(null);
  }, [pathname, closeMobileMenu, closeSearch]);

  const headerClass = [
    scrolled ? "scroll" : "",
    megaOpen ? "is-mega-open" : "",
    searchOpen ? "is-search-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    GNB_GROUPS,
    pathname,
    activeGnbIndex,
    headerClass,
    mobileOpen,
    mobileAccordion,
    searchOpen,
    hoverIndex,
    searchQuery,
    searchInputRef,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileAccordion,
    toggleSearch,
    closeSearch,
    handleGnbEnter,
    handleMegaColEnter,
    handleMenuEnter,
    openMega,
    closeMega,
    cancelCloseMega,
    handleSearchSubmit,
    handleSearchTag,
    setSearchQuery,
    isCurrentLink,
  };
}

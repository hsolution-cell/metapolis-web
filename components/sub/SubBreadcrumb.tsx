"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavLink } from "@/data/navigation";

type SubBreadcrumbProps = {
  groupLabel: string;
  siblings: NavLink[];
  currentPath: string;
  currentLabel: string;
};

export default function SubBreadcrumb({
  groupLabel,
  siblings,
  currentPath,
  currentLabel,
}: SubBreadcrumbProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        close();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, close]);

  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <ol className="breadcrumb__list">
        <li className="breadcrumb__item breadcrumb__home">
          <Link href="/" aria-label="홈">
            <img
              src="/img/sub/breadcrumb-home.svg"
              alt=""
              width={28}
              height={28}
              className="breadcrumb__home-ico"
            />
          </Link>
        </li>
        <li className="breadcrumb__item breadcrumb__group">
          <span>{groupLabel}</span>
        </li>
        <li className="breadcrumb__item breadcrumb__current">
          <div
            className={`breadcrumb__dropdown${open ? " is-open" : ""}`}
            ref={dropdownRef}
          >
            <button
              type="button"
              className="breadcrumb__dropdown-btn"
              aria-expanded={open}
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
            >
              <span>{currentLabel}</span>
              <span className="breadcrumb__dropdown-ico-wrap">
                <span className="breadcrumb__dropdown-ico" aria-hidden="true">
                  <img
                    src="/img/sub/breadcrumb-dropdown.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="breadcrumb__dropdown-ico-img"
                  />
                </span>
                <div className="breadcrumb__dropdown-panel" hidden={!open} role="menu">
                  <ul className="breadcrumb__dropdown-list">
                    {siblings.map((item) => (
                      <li
                        key={item.href}
                        className={item.href === currentPath ? "active" : undefined}
                      >
                        <Link href={item.href} role="menuitem" onClick={close}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </span>
            </button>
          </div>
        </li>
      </ol>
    </nav>
  );
}

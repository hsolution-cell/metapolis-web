import type { ReactNode } from "react";
import SubTopBanner from "@/components/sub/SubTopBanner";
import type { SubPageContext } from "@/lib/subPageContext";
import { EN_NAV } from "@/data/en/navigation";

type EnSubLayoutProps = {
  currentPath: string;
  label: string;
  bannerImage: string;
  groupLabel?: string;
  className?: string;
  children: ReactNode;
};

/** 영문 서브페이지 공통 레이아웃 — 국문 SubTopBanner/브레드크럼 재사용(EN 컨텍스트 주입) */
export default function EnSubLayout({
  currentPath,
  label,
  bannerImage,
  groupLabel = "",
  className,
  children,
}: EnSubLayoutProps) {
  const ctx: SubPageContext = {
    config: { path: currentPath, label, bannerImage },
    group: { label: groupLabel, href: "/en", items: EN_NAV },
    siblings: EN_NAV,
    currentPath,
  };

  return (
    <>
      <div className="header_container" />
      <div className={`sub_page page${className ? ` ${className}` : ""}`}>
        <SubTopBanner {...ctx} homeHref="/en" />
        <div className="sub_body ">{children}</div>
      </div>
    </>
  );
}

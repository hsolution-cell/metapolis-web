import type { ReactNode } from "react";
import { getSubPageContext } from "@/lib/subPageContext";
import SubTopBanner from "@/components/sub/SubTopBanner";

type SubPageLayoutProps = {
  path: string;
  children: ReactNode;
  className?: string;
};

export default function SubPageLayout({ path, children, className }: SubPageLayoutProps) {
  const ctx = getSubPageContext(path);

  return (
    <>
      <div className="header_container" />
      <div className={`sub_page page${className ? ` ${className}` : ""}`}>
        <SubTopBanner {...ctx} />
        <div className="sub_body ">
          {children}
        </div>
      </div>
    </>
  );
}

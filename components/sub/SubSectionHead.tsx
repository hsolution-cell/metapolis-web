import type { ReactNode } from "react";

type SubSectionHeadProps = {
  eyebrow: string;
  title: ReactNode;
  titleId?: string;
  className?: string;
};

export default function SubSectionHead({
  eyebrow,
  title,
  titleId,
  className,
}: SubSectionHeadProps) {
  return (
    <div className={`sub_section_head${className ? ` ${className}` : ""}`}>
      <p className="sub_section_eyebrow">{eyebrow}</p>
      <h2 id={titleId} className="sub_section_title">
        {title}
      </h2>
    </div>
  );
}

import type { ReactNode } from "react";

/** `<b>강조</b>` 형태의 간단한 인라인 마크업을 React 노드로 변환 */
export function renderInlineMarkup(text: string): ReactNode {
  const parts = text.split(/(<b>.*?<\/b>)/g).filter((part) => part.length > 0);

  return parts.map((part, index) => {
    const match = /^<b>(.*?)<\/b>$/.exec(part);
    if (match) {
      return <b key={index}>{match[1]}</b>;
    }
    return part;
  });
}

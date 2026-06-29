import type { CSSProperties } from "react";
import type { LocationRouteItem } from "@/data/locationTransport";
import { renderInlineMarkup } from "@/lib/renderInlineMarkup";

type LocationRouteCardProps = {
  route: LocationRouteItem;
  revealIndex?: number;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isRouteTagSegment(text: string) {
  return /(?:승차|환승)$/.test(text.trim());
}

function renderHighlightedText(text: string, highlights: string[] = []) {
  const highlight = highlights.find((word) => text.includes(word));

  if (!highlight) {
    return text;
  }

  const segments = text.split(new RegExp(`(${escapeRegExp(highlight)})`));

  return segments.map((segment, index) => {
    if (!segment) return null;

    return (
      <span
        key={`${segment}-${index}`}
        className={segment === highlight ? "location_route_highlight" : undefined}
      >
        {segment}
      </span>
    );
  });
}

function renderRoutePart(part: string, highlights: string[] = []) {
  const trimmed = part.trim();

  if (isRouteTagSegment(trimmed)) {
    return <span className="location_route_tag">{trimmed}</span>;
  }

  return renderHighlightedText(trimmed, highlights);
}

function renderRouteLine(line: string, highlights: string[] = []) {
  const parts = line.split(/\s*>\s*/);

  return parts.map((part, index) => (
    <span key={`${part}-${index}`} className="location_route_segment">
      {index > 0 && (
        <span className="location_route_sep" aria-hidden="true">
          &gt;
        </span>
      )}
      {renderRoutePart(part, highlights)}
    </span>
  ));
}

export default function LocationRouteCard({ route, revealIndex }: LocationRouteCardProps) {
  const badgeClass = `location_route_badge location_route_badge--${route.badge.type}`;

  return (
    <li
      className="location_route_card"
      style={
        revealIndex === undefined
          ? undefined
          : ({ "--sub-reveal-i": revealIndex } as CSSProperties)
      }
    >
      <div className="location_route_card_head">
        <span className={badgeClass} aria-hidden="true">
          {route.badge.label}
        </span>
        <h4 className="location_route_card_title">{renderInlineMarkup(route.title)}</h4>
      </div>
      <ul className="location_route_lines">
        {route.lines.map((line) => (
          <li key={line} className="location_route_line">
            {renderRouteLine(line, route.highlights)}
          </li>
        ))}
      </ul>
    </li>
  );
}

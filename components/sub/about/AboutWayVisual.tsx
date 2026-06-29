type AboutWayVisualProps = {
  shape: "rect" | "circle";
  src: string;
  alt: string;
  deco: string;
  decoClassName?: string;
};

const ARC_CX = 50;
const ARC_CY = 50;
const ARC_R = 55;

function getLeftArcPath() {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const start = 115;
  const end = 245;
  const x1 = ARC_CX + ARC_R * Math.cos(rad(start));
  const y1 = ARC_CY + ARC_R * Math.sin(rad(start));
  const x2 = ARC_CX + ARC_R * Math.cos(rad(end));
  const y2 = ARC_CY + ARC_R * Math.sin(rad(end));
  return `M ${x1} ${y1} A ${ARC_R} ${ARC_R} 0 0 1 ${x2} ${y2}`;
}

function AboutWayDecoArc({ label }: { label: string }) {
  return (
    <svg
      className="about_way_deco about_way_deco--arc"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <defs>
        <path id="about-deco-dining-arc" d={getLeftArcPath()} fill="none" />
      </defs>
      <text className="about_way_deco_text">
        <textPath href="#about-deco-dining-arc" startOffset="50%" textAnchor="middle">
          {label}
        </textPath>
      </text>
    </svg>
  );
}

export default function AboutWayVisual({
  shape,
  src,
  alt,
  deco,
  decoClassName,
}: AboutWayVisualProps) {
  return (
    <div className="about_way_visual">
      <div className={`about_way_frame about_way_frame--${shape}`}>
        <figure className={`about_way_figure about_way_figure--${shape}`}>
          <img src={src} alt={alt} />
        </figure>
        {shape === "circle" ? (
          <AboutWayDecoArc label={deco} />
        ) : (
          <p
            className={`about_way_deco about_way_deco--side${decoClassName ? ` ${decoClassName}` : ""}`}
            aria-hidden="true"
          >
            {deco}
          </p>
        )}
      </div>
    </div>
  );
}

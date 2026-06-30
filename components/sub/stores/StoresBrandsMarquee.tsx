const MARQUEE_TEXT = "Brands at Metapolis";
const MARQUEE_REPEAT = 8;

export default function StoresBrandsMarquee() {
  return (
    <div className="stores_brands_marquee" aria-hidden="true">
      <div className="stores_brands_marquee_track">
        {Array.from({ length: MARQUEE_REPEAT }, (_, index) => (
          <span key={index}>{MARQUEE_TEXT}&nbsp;&nbsp;</span>
        ))}
      </div>
    </div>
  );
}

const MARQUEE_TEXT = "Customer Services  ";
const MARQUEE_REPEAT = 8;

export default function FacilitiesMarquee() {
  return (
    <div className="facilities_cards_marquee" aria-hidden="true">
      <div className="facilities_cards_marquee_track">
        {Array.from({ length: MARQUEE_REPEAT }, (_, index) => (
          <span key={index}>{MARQUEE_TEXT}</span>
        ))}
      </div>
    </div>
  );
}

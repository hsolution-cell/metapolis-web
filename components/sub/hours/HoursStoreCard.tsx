export type HoursScheduleRow = {
  label: string;
  value: string;
  closed?: boolean;
};

export type HoursStoreCardProps = {
  category: string;
  name: string;
  logo?: string;
  logoAlt?: string;
  schedules: HoursScheduleRow[];
  note?: string;
};

export default function HoursStoreCard({
  category,
  name,
  logo,
  logoAlt,
  schedules,
  note,
}: HoursStoreCardProps) {
  return (
    <article className="hours_store_card">
      <div className="hours_store_card_head">
        <div className="hours_store_card_logo">
          {logo ? (
            <img src={logo} alt={logoAlt ?? name} />
          ) : (
            <span className="hours_store_card_logo_fallback" aria-hidden="true">
              {category.slice(0, 1)}
            </span>
          )}
        </div>
        <div className="hours_store_card_meta">
          <p className="hours_store_card_category">{category}</p>
          <h4 className="hours_store_card_name">{name}</h4>
        </div>
      </div>

      <ul className="hours_store_card_schedule">
        {schedules.map((row) => (
          <li key={`${row.label}-${row.value}`}>
            <span className="hours_store_card_label">{row.label}</span>
            <span
              className={`hours_store_card_value${row.closed ? " is-closed" : ""}`}
            >
              {row.value}
            </span>
          </li>
        ))}
      </ul>

      <p className="hours_store_card_note">
        <span className="hours_store_card_note_label">비고사항 :</span>
        {note ?? "—"}
      </p>
    </article>
  );
}

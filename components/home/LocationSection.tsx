import Link from "next/link";

type LocationLink = { href: string; label: string };

type LocationSectionProps = {
  desc?: string;
  addressKo?: string;
  addressEn?: string;
  mapAlt?: string;
  tel?: string;
  telHref?: string;
  hour?: string;
  primary?: LocationLink;
  secondary?: LocationLink;
  ariaLabel?: string;
};

export default function LocationSection({
  desc = "산책하듯 머무는 곳, 메타폴리스몰에서 여유를 즐겨보세요.",
  addressKo = "경기도 화성시 동탄중앙로 220 메타폴리스",
  addressEn = "220, Dongtanjungang-ro, Dongtan-gu, Hwaseong-si, Gyeonggi-do",
  mapAlt = "메타폴리스몰 A Block, B Block 위치 안내 지도",
  tel = "031-371-7000",
  telHref = "tel:0313717000",
  hour = "10:30 - 22:00",
  primary = { href: "/location", label: "오시는 길" },
  secondary = { href: "/parking", label: "주차안내" },
  ariaLabel = "오시는 길",
}: LocationSectionProps = {}) {
  return (
    <section className="main_location page main_section_pad" aria-label={ariaLabel}>
      <div className="main_location_bg" aria-hidden="true" />

      <div className="main_location_inner content_inner">
        <div className="main_location_head">
          <h2 className="main_location_title">LOCATION</h2>
          <p className="main_location_desc">{desc}</p>
        </div>

        <div className="main_location_body">
          <figure className="main_location_map">
            <img src="/img/main_location_map.png" alt={mapAlt} />
          </figure>

          <div className="main_location_info">
            <dl className="main_location_list">
              <div className="main_location_item">
                <dt className="main_location_label">LOCATION</dt>
                <dd className="main_location_value">
                  {addressKo && <p className="main_location_address_ko">{addressKo}</p>}
                  {addressEn && <p className="main_location_address_en">{addressEn}</p>}
                </dd>
              </div>
              <div className="main_location_item">
                <dt className="main_location_label">CALL</dt>
                <dd className="main_location_value">
                  <a href={telHref} className="main_location_tel">
                    {tel}
                  </a>
                </dd>
              </div>
              <div className="main_location_item">
                <dt className="main_location_label">HOUR</dt>
                <dd className="main_location_value">
                  <p className="main_location_hour">{hour}</p>
                </dd>
              </div>
            </dl>

            <div className="main_location_actions">
              <Link href={primary.href} className="main_location_btn">
                {primary.label}
                <span className="main_location_btn_arrow" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                    <path d="M1 9L5 5L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              <Link href={secondary.href} className="main_location_btn">
                {secondary.label}
                <span className="main_location_btn_arrow" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                    <path d="M1 9L5 5L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

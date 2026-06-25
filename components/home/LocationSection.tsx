import Link from "next/link";

export default function LocationSection() {
  return (
    <section className="main_location page main_section_pad" aria-label="오시는 길">
      <div className="main_location_bg" aria-hidden="true" />

      <div className="main_location_inner content_inner">
        <div className="main_location_head">
          <h2 className="main_location_title">LOCATION</h2>
          <p className="main_location_desc">산책하듯 머무는 곳, 메타폴리스에서 여유를 즐겨보세요.</p>
        </div>

        <div className="main_location_body">
          <figure className="main_location_map">
            <img src="/img/main_location_map.png" alt="메타폴리스 A Block, B Block 위치 안내 지도" />
          </figure>

          <div className="main_location_info">
            <dl className="main_location_list">
              <div className="main_location_item">
                <dt className="main_location_label">LOCATION</dt>
                <dd className="main_location_value">
                  <p className="main_location_address_ko">경기도 화성시 동탄중앙로 220 메타폴리스</p>
                  <p className="main_location_address_en">
                    220, Dongtanjungang-ro, Dongtan-gu, Hwaseong-si, Gyeonggi-do
                  </p>
                </dd>
              </div>
              <div className="main_location_item">
                <dt className="main_location_label">CALL</dt>
                <dd className="main_location_value">
                  <a href="tel:0313717000" className="main_location_tel">
                    031-371-7000
                  </a>
                </dd>
              </div>
              <div className="main_location_item">
                <dt className="main_location_label">HOUR</dt>
                <dd className="main_location_value">
                  <p className="main_location_hour">10:30 - 22:00</p>
                </dd>
              </div>
            </dl>

            <div className="main_location_actions">
              <Link href="/location" className="main_location_btn">
                오시는 길
                <span className="main_location_btn_arrow" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                    <path d="M1 9L5 5L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              <Link href="/parking" className="main_location_btn">
                주차안내
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

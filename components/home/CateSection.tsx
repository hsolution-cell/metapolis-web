import Link from "next/link";
import { CATE_CARDS } from "@/data/cateCards";

export default function CateSection() {
  return (
    <section className="main_cate page main_section_pad">
      <div className="main_cate_inner content_inner">
        <div className="main_cate_head">
          <h2 className="main_cate_title">
            일상의 시간을 산책하던 타임테라스의 설렘,
            <br />
            <strong>새로운 이름 메타폴리스몰로 도약합니다.</strong>
          </h2>
          <div className="main_cate_hours">
            OPENING HOURS <br />
            10:30am - 10:00pm · 연중무휴
          </div>
        </div>
      </div>
      <ul className="main_cate_list">
        {CATE_CARDS.map((card) => (
          <li key={card.href} className="main_cate_item">
            <Link href={card.href} className="main_cate_link">
              <div className="main_cate_media">
                <img src={card.image} alt="" />
              </div>
              <div className="main_cate_info">
                <strong className="main_cate_label">{card.label}</strong>
                <p className="main_cate_desc">{card.desc}</p>
                <span className="main_cate_go" aria-hidden="true">
                  <img src="/img/main_cate_arrow.svg" alt="" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

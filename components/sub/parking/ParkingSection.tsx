import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import SubSectionHead from "@/components/sub/SubSectionHead";
import SubReveal from "@/components/sub/SubReveal";
import ParkingIcon, { type ParkingIconType } from "@/components/sub/parking/ParkingIcons";

function ParkingSectionHead({
  label,
  title,
  titleId,
}: {
  label: string;
  title: string;
  titleId?: string;
}) {
  return (
    <div className="parking_section_head">
      <div className="parking_section_label">
        <span className="parking_section_label_en">{label}</span>
        <h3 id={titleId} className="parking_section_title">
          {title}
        </h3>
      </div>
    </div>
  );
}

type ProcessStep = { iconType: ParkingIconType; label: ReactNode };
type FeeDetail = { dt: string; dd: string };
type BenefitRow = { amount: string; time: string };
type SpecialCard = { title: string; iconType: ParkingIconType; time: string; note?: string };

type ParkingSectionProps = {
  eyebrow?: string;
  title?: ReactNode;
  notice1?: ReactNode;
  notice2Href?: string;
  notice2?: ReactNode;
  mapImage?: string;
  mapAlt?: string;
  caption?: string;
  addressText?: string;
  processLabel?: string;
  processTitle?: string;
  processSteps?: ProcessStep[];
  feeLabel?: string;
  feeTitle?: string;
  feeBadge?: string;
  feeHeadline?: ReactNode;
  feeDetails?: FeeDetail[];
  freeLabel?: string;
  freeTitle?: string;
  benefitsHead?: { amount: string; time: string };
  benefitsRows?: BenefitRow[];
  benefitsNote?: string;
  specialCards?: SpecialCard[];
};

const DEFAULT_PROCESS: ProcessStep[] = [
  { iconType: "entry", label: <>입차 차량<br />번호 인식</> },
  { iconType: "confirm", label: <>구매 매장에서<br />주차 확인</> },
  { iconType: "payment", label: <>사전무인 or<br />출구무인정산</> },
];

const DEFAULT_FEE_DETAILS: FeeDetail[] = [
  { dt: "1일 최대 주차요금", dd: "20,000원" },
  { dt: "정산 후 출차 시간", dd: "20분 제공" },
];

const DEFAULT_BENEFITS: BenefitRow[] = [
  { amount: "1만 원 이상", time: "1시간 무료" },
  { amount: "2만 원 이상", time: "2시간 무료" },
  { amount: "3만 원 이상", time: "3시간 무료" },
  { amount: "4만 원 이상", time: "4시간 무료" },
  { amount: "5만 원 이상", time: "5시간 무료" },
];

const DEFAULT_SPECIAL: SpecialCard[] = [
  { title: "클리닉 이용 시", iconType: "clinic", time: "2시간 무료" },
  { title: "CGV 이용 시", iconType: "cgv", time: "3시간 무료", note: "(셀프무인정산기)" },
];

const ArrowIcon = () => (
  <span className="parking_process_arrow" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke="#8A6E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

export default function ParkingSection({
  eyebrow = "Parking Info",
  title = (
    <>
      <strong>주차안내</strong>
    </>
  ),
  notice1 = (
    <>
      <b>매장 결제 시 차량번호를 등록</b>하시면 <b>무료 주차 시간</b>이 적용됩니다
    </>
  ),
  notice2Href = "tel:0313717078",
  notice2 = (
    <>
      <b>031-371-7078</b> (주차관리실)
    </>
  ),
  mapImage = "/img/sub/parking/map.png",
  mapAlt = "메타폴리스몰 A블록·B블록 주차장 입구 안내 지도",
  caption = "지하주차장 진입 후 자동차로는 블록 간 이동할 수 없습니다.",
  addressText,
  processLabel = "Process",
  processTitle = "주차장 이용 절차",
  processSteps = DEFAULT_PROCESS,
  feeLabel = "Fee",
  feeTitle = "주차 요금",
  feeBadge = "20시 ~ 익일 8시 · 50% 할인",
  feeHeadline = <>최초 30분 무료 &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 초과 10분당 500원</>,
  feeDetails = DEFAULT_FEE_DETAILS,
  freeLabel = "Free",
  freeTitle = "무료주차 혜택",
  benefitsHead = { amount: "구매 금액", time: "무료 적용 시간" },
  benefitsRows = DEFAULT_BENEFITS,
  benefitsNote = "*일부 서비스 매장은 무료 주차 적용이 제외됩니다.",
  specialCards = DEFAULT_SPECIAL,
}: ParkingSectionProps = {}) {
  return (
    <div className="parking">
      <section className="parking_main" aria-labelledby="parking-main-title">
        <div className="parking_main_inner content_inner innerTop innerBot">
          <SubReveal
            className="parking_head_group"
            threshold={0.2}
            rootMargin="0px 0px -8% 0px"
          >
            <SubSectionHead
              className="parking_head"
              eyebrow={eyebrow}
              title={title}
              titleId="parking-main-title"
            />

            <div className="parking_notice_bar">
              <p className="parking_notice_item">
                <span className="parking_notice_icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none" aria-hidden="true">
                    <path
                      d="M13.3913 18.3912C13.6304 18.1512 13.75 17.8542 13.75 17.5V12.5C13.75 12.1458 13.63 11.8492 13.39 11.61C13.15 11.3708 12.8533 11.2508 12.5 11.25C12.1467 11.2492 11.85 11.3692 11.61 11.61C11.37 11.8508 11.25 12.1475 11.25 12.5V17.5C11.25 17.8542 11.37 18.1512 11.61 18.3912C11.85 18.6312 12.1467 18.7508 12.5 18.75C12.8533 18.7492 13.1504 18.6304 13.3913 18.3912ZM13.3913 8.39C13.6304 8.15083 13.75 7.85417 13.75 7.5C13.75 7.14583 13.63 6.84917 13.39 6.61C13.15 6.37083 12.8533 6.25083 12.5 6.25C12.1467 6.24917 11.85 6.36917 11.61 6.61C11.37 6.85083 11.25 7.1475 11.25 7.5C11.25 7.8525 11.37 8.14958 11.61 8.39125C11.85 8.63292 12.1467 8.7525 12.5 8.75C12.8533 8.7475 13.1504 8.6275 13.3913 8.39ZM12.5 25C10.7708 25 9.14584 24.6717 7.625 24.015C6.10417 23.3583 4.78125 22.4679 3.65625 21.3438C2.53125 20.2196 1.64084 18.8967 0.985002 17.375C0.329168 15.8533 0.000834916 14.2283 1.58228e-06 12.5C-0.000831751 10.7717 0.327502 9.14667 0.985002 7.625C1.6425 6.10333 2.53292 4.78042 3.65625 3.65625C4.77958 2.53208 6.1025 1.64167 7.625 0.985C9.1475 0.328333 10.7725 0 12.5 0C14.2275 0 15.8525 0.328333 17.375 0.985C18.8975 1.64167 20.2204 2.53208 21.3438 3.65625C22.4671 4.78042 23.3579 6.10333 24.0163 7.625C24.6746 9.14667 25.0025 10.7717 25 12.5C24.9975 14.2283 24.6692 15.8533 24.015 17.375C23.3608 18.8967 22.4704 20.2196 21.3438 21.3438C20.2171 22.4679 18.8942 23.3587 17.375 24.0162C15.8558 24.6737 14.2308 25.0017 12.5 25Z"
                      fill="#B89968"
                    />
                  </svg>
                </span>
                <span>{notice1}</span>
              </p>
              <p className="parking_notice_item">
                <span className="parking_notice_icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                    <path
                      d="M8.41023 2.89628L10.4856 2.27056C11.1705 2.06438 11.9071 2.11441 12.5578 2.41131C13.2086 2.7082 13.7292 3.2317 14.0224 3.88413L15.4774 7.11985C15.7299 7.6812 15.8003 8.30753 15.6786 8.91093C15.557 9.51432 15.2494 10.0645 14.7992 10.4841L12.5845 12.5477C12.2877 12.8295 12.5127 13.9277 13.597 15.807C14.6824 17.6873 15.5213 18.4309 15.9081 18.3152L18.8095 17.4281C19.3976 17.2482 20.0273 17.2568 20.6103 17.4528C21.1932 17.6488 21.7002 18.0223 22.0602 18.5209L24.1281 21.387C24.5458 21.9657 24.7392 22.6764 24.6723 23.387C24.6055 24.0976 24.2831 24.7598 23.7649 25.2506L22.1663 26.7645C21.6502 27.2532 21.0138 27.5963 20.3219 27.7587C19.63 27.9211 18.9073 27.8971 18.2277 27.6891C14.8784 26.6638 11.7767 23.6209 8.88058 18.6034C5.97808 13.5784 4.88201 9.33985 5.64594 5.87699C5.80002 5.17923 6.13739 4.53518 6.62329 4.01124C7.10919 3.48729 7.72603 3.10242 8.41023 2.89628Z"
                      fill="#B89968"
                    />
                  </svg>
                </span>
                <a href={notice2Href}>{notice2}</a>
              </p>
            </div>
          </SubReveal>

          <SubReveal
            as="div"
            className="parking_layout"
            threshold={0.06}
            rootMargin="0px 0px -4% 0px"
          >
            <div className="parking_map_sticky">
              <figure className="parking_map_panel">
                <div className="parking_map_visual">
                  <Image
                    src={mapImage}
                    alt={mapAlt}
                    width={620}
                    height={700}
                    className="parking_map_image"
                    priority
                    unoptimized
                  />
                </div>
                <figcaption className="parking_map_notice">
                  <span className="parking_map_notice_icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 9V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="10" cy="6.2" r="1" fill="currentColor" />
                    </svg>
                  </span>
                  <span>{caption}</span>
                </figcaption>
              </figure>

              {addressText && (
                <div className="parking_map_address">
                  <img
                    src="/img/sub/parking/location.png"
                    alt=""
                    className="parking_map_address_icon"
                    aria-hidden="true"
                  />
                  <span>{addressText}</span>
                </div>
              )}
            </div>

            <div className="parking_info_panel">
              <section
                className="parking_block"
                aria-labelledby="parking-process-title"
                style={{ "--sub-reveal-i": 0 } as CSSProperties}
              >
                <ParkingSectionHead
                  label={processLabel}
                  title={processTitle}
                  titleId="parking-process-title"
                />
                <ol className="parking_process_list">
                  {processSteps.map((step, i) => (
                    <li className="parking_process_item" key={i}>
                      <div className="parking_process_card">
                        <span
                          className={`parking_process_icon parking_process_icon--${
                            i === 0 ? "entry" : "boxed"
                          }`}
                        >
                          <ParkingIcon type={step.iconType} />
                        </span>
                        <p className="parking_process_label">{step.label}</p>
                      </div>
                      {i < processSteps.length - 1 && <ArrowIcon />}
                    </li>
                  ))}
                </ol>
              </section>

              <section
                className="parking_block"
                aria-labelledby="parking-fee-title"
                style={{ "--sub-reveal-i": 1 } as CSSProperties}
              >
                <ParkingSectionHead
                  label={feeLabel}
                  title={feeTitle}
                  titleId="parking-fee-title"
                />
                <div className="parking_fee_card">
                  <span className="parking_fee_badge">{feeBadge}</span>
                  <p className="parking_fee_headline">{feeHeadline}</p>
                  <dl className="parking_fee_details">
                    {feeDetails.map((d, i) => (
                      <div className="parking_fee_detail" key={i}>
                        <dt>{d.dt}</dt>
                        <dd>{d.dd}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </section>

              <section
                className="parking_block"
                aria-labelledby="parking-free-title"
                style={{ "--sub-reveal-i": 2 } as CSSProperties}
              >
                <ParkingSectionHead
                  label={freeLabel}
                  title={freeTitle}
                  titleId="parking-free-title"
                />
                <div className="parking_benefits">
                  <div className="parking_benefits_table_wrap">
                    <table className="parking_benefits_table">
                      <thead>
                        <tr>
                          <th scope="col">{benefitsHead.amount}</th>
                          <th scope="col">{benefitsHead.time}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {benefitsRows.map((row, i) => (
                          <tr key={i}>
                            <td>{row.amount}</td>
                            <td>{row.time}</td>
                          </tr>
                        ))}
                        <tr className="parking_benefits_note_row">
                          <td colSpan={2}>{benefitsNote}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <ul className="parking_special_list">
                    {specialCards.map((card, i) => (
                      <li className="parking_special_card" key={i}>
                        <p className="parking_special_title">{card.title}</p>
                        <span className="parking_special_icon">
                          <ParkingIcon type={card.iconType} />
                        </span>
                        <p className="parking_special_time">{card.time}</p>
                        {card.note && <p className="parking_special_note">{card.note}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </SubReveal>
        </div>
      </section>
    </div>
  );
}

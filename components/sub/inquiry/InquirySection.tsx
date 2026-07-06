"use client";

import type { ReactNode } from "react";
import SubReveal from "@/components/sub/SubReveal";
import {
  INQUIRY_ADDRESS,
  INQUIRY_CONSULT_HOURS,
  INQUIRY_OPERATION_HOURS,
  INQUIRY_PHONE,
  INQUIRY_PHONE_HREF,
} from "@/data/inquiry";

type InquirySectionProps = {
  className?: string;
  eyebrow?: string;
  title?: ReactNode;
  desc?: string;
  addressLabel?: string;
  address?: string;
  cardAriaLabel?: string;
  cardBadge?: string;
  cardLead?: ReactNode;
  phone?: string;
  phoneHref?: string;
  consultLabel?: string;
  consultHours?: ReactNode;
  operationLabel?: string;
  operationHours?: ReactNode;
  watermark?: string;
};

function PhoneIcon() {
  return (
    <svg viewBox="0 0 54 54" fill="none" aria-hidden="true">
      <path
        d="M37.3994 6.53906C39.4024 6.35409 41.4111 6.82741 43.1211 7.88672C44.831 8.94599 46.1495 10.5335 46.876 12.4092C47.6024 14.2849 47.6969 16.3466 47.1465 18.2812C46.596 20.2159 45.4302 21.9185 43.8252 23.1309C42.2201 24.3431 40.2634 24.9996 38.252 25H38.251C36.8222 25.0004 35.4124 24.6698 34.1328 24.0342H34.1318C33.3091 23.6183 32.364 23.5116 31.4688 23.7344L31.4521 23.7383L31.4346 23.7432L29.8291 24.1719L30.2588 22.5674L30.2637 22.5498L30.2676 22.5332C30.4789 21.6841 30.3944 20.7899 30.0303 19.998L29.9541 19.8418C29.0689 18.0471 28.7894 16.0133 29.1582 14.0459C29.5288 12.0688 30.5344 10.2667 32.0215 8.91211C33.5086 7.55754 35.3964 6.72404 37.3994 6.53906Z"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M18.0847 16.461L19.545 19.0778C20.8612 21.4403 20.3325 24.5363 18.258 26.613C18.258 26.613 15.738 29.1308 20.3055 33.696C24.8662 38.2568 27.3862 35.7435 27.3862 35.7435C29.463 33.6668 32.5612 33.138 34.9215 34.4543L37.5382 35.9168C41.1045 37.9058 41.5252 42.9053 38.391 46.0418C36.5077 47.9228 34.1992 49.3898 31.65 49.4843C27.357 49.6485 20.0647 48.5618 12.75 41.2493C5.43749 33.9345 4.35074 26.6423 4.51499 22.3493C4.61174 19.8 6.07649 17.4915 7.95749 15.6083C11.094 12.474 16.0935 12.8948 18.0825 16.4633"
        fill="currentColor"
      />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <g opacity="0.8">
        <path
          d="M20 2.85352C16.2092 2.85352 12.5736 4.35942 9.89309 7.03994C7.21257 9.72046 5.70667 13.356 5.70667 17.1468C2.56 17.1468 0 19.6802 0 22.8535V28.5602C0 31.7335 2.56 34.2935 5.70667 34.2935H8.56V17.1468C8.56 14.1128 9.76528 11.203 11.9107 9.05755C14.0561 6.91213 16.9659 5.70685 20 5.70685C23.04 5.70685 25.9467 6.90685 28.08 9.06685C30.2133 11.2002 31.44 14.1068 31.44 17.1468V34.2935H34.2933C37.44 34.2935 40 31.7335 40 28.5602V22.8535C40 19.6802 37.44 17.1468 34.2933 17.1468C34.2933 13.3602 32.7733 9.73352 30.1067 7.04018C27.4133 4.37352 23.7867 2.85352 20 2.85352ZM20 14.1602C18.2133 14.1602 16.7467 15.6268 16.7467 17.4135C16.7467 19.2002 18.2133 20.6668 20 20.6668C21.7867 20.6668 23.2533 19.2002 23.2533 17.4135C23.2533 15.6268 21.7867 14.1602 20 14.1602ZM22.16 22.8002L15.7067 24.9602V27.0935H17.68L17.84 37.8402H15.7067V40.0002H24.2933V37.8402H22.16V22.8002Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <g opacity="0.8">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.9974 1.6665C9.8724 1.6665 1.66406 9.87484 1.66406 19.9998C1.66406 30.1248 9.8724 38.3332 19.9974 38.3332C30.1224 38.3332 38.3307 30.1248 38.3307 19.9998C38.3307 9.87484 30.1224 1.6665 19.9974 1.6665ZM19.1641 9.99984C18.722 9.99984 18.2981 10.1754 17.9856 10.488C17.673 10.8006 17.4974 11.2245 17.4974 11.6665C17.4974 12.1085 17.673 12.5325 17.9856 12.845C18.2981 13.1576 18.722 13.3332 19.1641 13.3332H19.9974C20.4394 13.3332 20.8633 13.1576 21.1759 12.845C21.4885 12.5325 21.6641 12.1085 21.6641 11.6665C21.6641 11.2245 21.4885 10.8006 21.1759 10.488C20.8633 10.1754 20.4394 9.99984 19.9974 9.99984H19.1641ZM16.6641 16.6665C16.222 16.6665 15.7981 16.8421 15.4856 17.1547C15.173 17.4672 14.9974 17.8911 14.9974 18.3332C14.9974 18.7752 15.173 19.1991 15.4856 19.5117C15.7981 19.8242 16.222 19.9998 16.6641 19.9998H18.3307V24.9998H16.6641C16.222 24.9998 15.7981 25.1754 15.4856 25.488C15.173 25.8006 14.9974 26.2245 14.9974 26.6665C14.9974 27.1085 15.173 27.5325 15.4856 27.845C15.7981 28.1576 16.222 28.3332 16.6641 28.3332H23.3307C23.7728 28.3332 24.1967 28.1576 24.5092 27.845C24.8218 27.5325 24.9974 27.1085 24.9974 26.6665C24.9974 26.2245 24.8218 25.8006 24.5092 25.488C24.1967 25.1754 23.7728 24.9998 23.3307 24.9998H21.6641V18.3332C21.6641 17.8911 21.4885 17.4672 21.1759 17.1547C20.8633 16.8421 20.4394 16.6665 19.9974 16.6665H16.6641Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

export default function InquirySection({
  className,
  eyebrow = "We're Here to Help",
  title = (
    <>
      메타폴리스몰에
      <br />
      무엇이든 문의하세요
    </>
  ),
  desc = "대표 번호로 편하게 연락해 주시면, 서비스 데스크에서 이용 안내 및 입점 · 대관 등의 업무를 친절하게 안내해 드립니다.",
  addressLabel = "ADDRESS",
  address = INQUIRY_ADDRESS,
  cardAriaLabel = "고객센터 연락처",
  cardBadge = "• 고객센터 안내 •",
  cardLead = (
    <>
      메타폴리스몰에 대한 <b>문의 사항은 아래 번호로 연락</b>해 주십시오
    </>
  ),
  phone = INQUIRY_PHONE,
  phoneHref = INQUIRY_PHONE_HREF,
  consultLabel = "상담 시간",
  consultHours = INQUIRY_CONSULT_HOURS,
  operationLabel = "운영 시간",
  operationHours = INQUIRY_OPERATION_HOURS,
  watermark = "CALL",
}: InquirySectionProps = {}) {
  return (
    <section
      className={`inquiry${className ? ` ${className}` : ""}`}
      aria-labelledby="inquiry-main-title"
    >
      <div className="inquiry_inner content_inner innerTop innerBot">
        <SubReveal threshold={0.12} rootMargin="0px 0px -8% 0px">
          <div className="inquiry_layout">
            <div className="inquiry_intro">
              <p className="inquiry_eyebrow">{eyebrow}</p>
              <h2 id="inquiry-main-title" className="inquiry_title">
                {title}
              </h2>
              <p className="inquiry_desc">{desc}</p>

              <div className="inquiry_address">
                <p className="inquiry_address_label">{addressLabel}</p>
                <p className="inquiry_address_text">{address}</p>
              </div>
            </div>

            <aside className="inquiry_card" aria-label={cardAriaLabel}>
              <span className="inquiry_card_badge">{cardBadge}</span>
              <p className="inquiry_card_lead">{cardLead}</p>

              <a href={phoneHref} className="inquiry_card_phone">
                <span className="inquiry_card_phone_icon">
                  <PhoneIcon />
                </span>
                <span className="inquiry_card_phone_num">{phone}</span>
              </a>

              <div className="inquiry_card_divider" aria-hidden="true" />

              <div className="inquiry_card_hours">
                <div className="inquiry_card_hour">
                  <span className="inquiry_card_hour_icon">
                    <HeadsetIcon />
                  </span>
                  <div className="inquiry_card_hour_body">
                    <span className="inquiry_card_hour_label">{consultLabel}</span>
                    <span className="inquiry_card_hour_value">{consultHours}</span>
                  </div>
                </div>

                <div className="inquiry_card_hour">
                  <span className="inquiry_card_hour_icon">
                    <InfoIcon />
                  </span>
                  <div className="inquiry_card_hour_body">
                    <span className="inquiry_card_hour_label">{operationLabel}</span>
                    <span className="inquiry_card_hour_value">{operationHours}</span>
                  </div>
                </div>
              </div>

              <span className="inquiry_card_watermark" aria-hidden="true">
                {watermark}
              </span>
            </aside>
          </div>
        </SubReveal>
      </div>
    </section>
  );
}

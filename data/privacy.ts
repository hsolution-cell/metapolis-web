import { INQUIRY_PHONE } from "@/data/inquiry";
import { LOCATION_ADDRESS } from "@/data/locationTransport";
import type { LegalArticle } from "@/data/legal";

export const PRIVACY_REVISED_AT = "2026년 06월 17일 시행";

export const PRIVACY_ARTICLES: LegalArticle[] = [
  {
    id: "privacy-1",
    title: "1. 안내",
    blocks: [
      {
        type: "paragraph",
        text: '메타폴리스(이하 "회사")는 「개인정보 보호법」에 따라 이용자 정보를 보호하며, 본 방침은 메타폴리스 공식 홈페이지에 적용됩니다.',
      },
      {
        type: "paragraph",
        text: "회사는 홈페이지에서 <strong>회원가입을 운영하지 않으며, 이름·연락처·이메일 등을 입력·저장하는 온라인 양식을 제공하지 않습니다.</strong> 문의하기 페이지는 고객센터 전화번호 안내 목적입니다.",
      },
      {
        type: "paragraph",
        text: "호스팅·지도·글꼴 등 외부 서비스 연동은 페이지를 화면에 보여 주기 위한 기술적 처리이며, 회사가 이용자에게 별도로 개인정보 입력을 요청하거나 회원 정보를 수집·관리하지 않습니다.",
      },
    ],
  },
  {
    id: "privacy-2",
    title: "2. 접속 시 자동 생성되는 정보",
    blocks: [
      {
        type: "paragraph",
        text: "웹사이트를 이용하면 서버 운영상 접속 일시, IP주소, 브라우저 종류 등 <strong>기술적 접속 기록</strong>이 자동으로 생성될 수 있습니다. 이는 일반적인 웹사이트 운영 과정에서 발생하는 것으로, 회사가 이용자 개인을 식별하기 위해 별도로 수집하는 정보가 아닙니다.",
      },
      {
        type: "paragraph",
        text: "해당 기록은 서비스 제공·보안·장애 대응 목적으로만 사용하며, 관련 법령(「통신비밀보호법」 등)에 따른 기간 동안 보관 후 파기합니다.",
      },
    ],
  },
  {
    id: "privacy-3",
    title: "3. 전화·방문 문의 시",
    blocks: [
      {
        type: "paragraph",
        text: "이용자가 고객센터에 전화·방문 등으로 직접 문의하는 경우, 문의 처리에 필요한 범위(예: 연락처, 문의 내용)에서만 정보가 처리됩니다. 이는 홈페이지를 통한 수집이 아니라 이용자의 자발적 제공에 따른 것입니다.",
      },
    ],
  },
  {
    id: "privacy-4",
    title: "4. 문의",
    blocks: [
      {
        type: "unordered-list",
        items: [
          "개인정보 보호책임자: 고객센터 담당",
          `연락처: ${INQUIRY_PHONE}`,
          `주소: ${LOCATION_ADDRESS}`,
          '문의: <a href="/support/inquiry">문의하기</a>',
        ],
      },
      {
        type: "paragraph",
        text: "개인정보 침해 관련 상담·신고: 개인정보침해신고센터(118), 개인정보분쟁조정위원회(1833-6972)",
      },
    ],
  },
  {
    id: "privacy-5",
    title: "5. 방침 변경",
    blocks: [
      {
        type: "paragraph",
        text: "본 방침은 필요 시 수정되며, 변경 내용은 본 페이지에 공지합니다. 회원가입·온라인 문의 등 개인정보를 직접 수집하는 기능을 도입하는 경우, 별도 고지 및 동의 절차를 거칩니다.",
      },
      {
        type: "paragraph",
        text: '관련: <a href="/terms">이용약관</a>',
      },
    ],
  },
];

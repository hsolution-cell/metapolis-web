import type { LegalArticle } from "@/data/legal";
import { LEGAL_COMPANY_NAME } from "@/data/legalContact";

export const TERMS_REVISED_AT = "2026년 06월 17일 시행";

const SITE_NAME = "메타폴리스";
const OPERATOR = LEGAL_COMPANY_NAME.trim() || SITE_NAME;

export const TERMS_ARTICLES: LegalArticle[] = [
  {
    id: "terms-1",
    title: "제1조 (목적)",
    blocks: [
      {
        type: "paragraph",
        text: `이 약관은 ${OPERATOR}가 운영하는 메타폴리스 공식 홈페이지(이하 "홈페이지")에서 제공하는 정보 서비스(이하 "서비스") 이용과 관련하여 ${OPERATOR}와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.`,
      },
    ],
  },
  {
    id: "terms-2",
    title: "제2조 (정의)",
    blocks: [
      {
        type: "paragraph",
        text: `① "홈페이지"란 ${OPERATOR}가 영업·매장·이벤트 등 정보를 제공하기 위해 운영하는 인터넷 웹사이트를 말합니다.`,
      },
      {
        type: "paragraph",
        text: '② "서비스"란 홈페이지를 통해 제공되는 각종 정보 열람·안내 기능을 말합니다.',
      },
      {
        type: "paragraph",
        text: '③ "이용자"란 홈페이지에 접속하여 서비스를 이용하는 자를 말합니다.',
      },
    ],
  },
  {
    id: "terms-3",
    title: "제3조 (약관의 게시 및 개정)",
    blocks: [
      {
        type: "paragraph",
        text: `① ${OPERATOR}는 이 약관의 내용을 홈페이지에 게시합니다.`,
      },
      {
        type: "paragraph",
        text: "② 약관을 개정하는 경우 적용일자 및 개정사유를 명시하여 적용일 7일 전부터 공지합니다. 이용자에게 불리한 변경은 30일 전부터 공지합니다.",
      },
      {
        type: "paragraph",
        text: "③ 이용자가 개정약관 시행일 이후에도 서비스를 계속 이용하는 경우, 변경된 약관에 동의한 것으로 볼 수 있습니다.",
      },
    ],
  },
  {
    id: "terms-4",
    title: "제4조 (서비스의 내용)",
    blocks: [
      {
        type: "paragraph",
        text: `${OPERATOR}는 홈페이지를 통해 다음 정보를 제공합니다.`,
      },
      {
        type: "ordered-list",
        items: [
          "메타폴리스 소개, 영업시간, 오시는 길, 주차 안내",
          "매장·층별·카테고리·편의시설 안내",
          "이벤트·프로모션·당첨자 발표 등 안내",
          "자주 묻는 질문 및 고객센터 연락 안내",
        ],
      },
      {
        type: "paragraph",
        text: "홈페이지는 회원가입·온라인 결제·개인정보 입력 양식을 제공하지 않습니다.",
      },
    ],
  },
  {
    id: "terms-5",
    title: "제5조 (서비스의 중단)",
    blocks: [
      {
        type: "paragraph",
        text: "시스템 점검·장애·천재지변 등 불가피한 사유가 있는 경우 서비스 제공을 일시 중단할 수 있습니다.",
      },
      {
        type: "paragraph",
        text: "중단 사유 및 일정은 홈페이지 공지 등 합리적인 방법으로 안내합니다.",
      },
    ],
  },
  {
    id: "terms-6",
    title: "제6조 (개인정보)",
    blocks: [
      {
        type: "paragraph",
        text: `${OPERATOR}의 개인정보 처리에 관한 사항은 홈페이지 <a href="/privacy">개인정보처리방침</a>에 따릅니다.`,
      },
    ],
  },
  {
    id: "terms-7",
    title: "제7조 (운영자의 의무)",
    blocks: [
      {
        type: "paragraph",
        text: `${OPERATOR}는 관련 법령과 이 약관에 따라 안정적으로 서비스를 제공하기 위해 노력합니다.`,
      },
      {
        type: "paragraph",
        text: "이용자의 개인정보 보호를 위해 합리적인 보안 조치를 취합니다.",
      },
    ],
  },
  {
    id: "terms-8",
    title: "제8조 (이용자의 의무)",
    blocks: [
      {
        type: "paragraph",
        text: "이용자는 다음 행위를 하여서는 안 됩니다.",
      },
      {
        type: "ordered-list",
        items: [
          "홈페이지 운영을 방해하거나 시스템에 부당하게 접근하는 행위",
          "홈페이지의 정보·프로그램을 무단 복제·배포·변경하는 행위",
          "타인의 권리(저작권·명예 등)를 침해하는 행위",
          "법령 또는 공서양속에 반하는 행위",
        ],
      },
    ],
  },
  {
    id: "terms-9",
    title: "제9조 (저작권)",
    blocks: [
      {
        type: "paragraph",
        text: `홈페이지에 게시된 텍스트·이미지·디자인 등에 대한 권리는 ${OPERATOR} 또는 정당한 권리자에게 귀속됩니다.`,
      },
      {
        type: "paragraph",
        text: "이용자는 사전 허락 없이 이를 영리 목적으로 이용하거나 제3자에게 제공할 수 없습니다.",
      },
    ],
  },
  {
    id: "terms-10",
    title: "제10조 (면책)",
    blocks: [
      {
        type: "paragraph",
        text: "매장·이벤트·영업시간 등 홈페이지 정보는 참고용이며, 현장 상황에 따라 변경될 수 있습니다.",
      },
      {
        type: "paragraph",
        text: `${OPERATOR}는 천재지변·통신 장애 등 ${OPERATOR}의 합리적 통제를 벗어난 사유로 서비스를 제공하지 못한 경우, 관련 법령이 허용하는 범위 내에서 책임을 제한할 수 있습니다.`,
      },
    ],
  },
  {
    id: "terms-11",
    title: "제11조 (준거법 및 관할)",
    blocks: [
      {
        type: "paragraph",
        text: "이 약관은 대한민국 법령에 따릅니다.",
      },
      {
        type: "paragraph",
        text: "서비스 이용과 관련한 분쟁은 관련 법령이 정하는 관할 법원에 따릅니다.",
      },
    ],
  },
];

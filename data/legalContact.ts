// TODO(고객확정): 법인명·보호책임자 실제 값 입력. 비워두면 화면에서 해당 줄이 자동 생략됨.

/** 운영 법인 정식 명칭 — 확정 시 입력 (예: "(주)○○") */
export const LEGAL_COMPANY_NAME = "";

/** 개인정보 보호책임자 — 확정 시 입력 */
export const PRIVACY_OFFICER_NAME = "";

/** 보호책임자 이메일 — 확정 시 입력 */
export const PRIVACY_OFFICER_EMAIL = "";

/** 보호책임자 전화 — 비우면 고객센터 번호 사용 */
export const PRIVACY_OFFICER_PHONE = "";

/** 표시용: 비어 있으면 해당 줄 생략 */
export function optionalLegalLine(label: string, value: string): string | null {
  const trimmed = value.trim();
  return trimmed ? `${label}: ${trimmed}` : null;
}

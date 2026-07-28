import SubPageLayout from "@/components/sub/SubPageLayout";
import InquirySection from "@/components/sub/inquiry/InquirySection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/partnership" });

export default function Page() {
  return (
    <SubPageLayout path="/partnership" className="inquiry">
      <InquirySection
        eyebrow="Partnership & Leasing"
        title={
          <>
            메타폴리스몰과 함께
            <br />
            성장할 파트너를 찾습니다
          </>
        }
        desc="입점 상담, 브랜드 제휴, 팝업스토어·대관 등 파트너십에 관한 문의는 대표 번호로 연락해 주시면 담당 부서에서 상세히 안내해 드립니다."
        cardAriaLabel="입점·제휴 문의 연락처"
        cardBadge="• 입점·제휴 안내 •"
        cardLead={
          <>
            입점 및 제휴에 관한 <b>문의 사항은 아래 번호로 연락</b>해 주십시오
          </>
        }
        watermark="PARTNER"
      />
    </SubPageLayout>
  );
}

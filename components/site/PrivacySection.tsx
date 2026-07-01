import LegalDocument from "@/components/site/LegalDocument";
import { PRIVACY_ARTICLES, PRIVACY_REVISED_AT } from "@/data/privacy";

export default function PrivacySection() {
  return (
    <LegalDocument
      title="개인정보처리방침"
      revisedAt={PRIVACY_REVISED_AT}
      articles={PRIVACY_ARTICLES}
    />
  );
}

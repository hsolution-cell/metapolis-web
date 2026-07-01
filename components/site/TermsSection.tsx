import LegalDocument from "@/components/site/LegalDocument";
import { TERMS_ARTICLES, TERMS_REVISED_AT } from "@/data/terms";

export default function TermsSection() {
  return (
    <LegalDocument
      title="이용약관"
      revisedAt={TERMS_REVISED_AT}
      articles={TERMS_ARTICLES}
    />
  );
}

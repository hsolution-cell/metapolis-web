import SubPageLayout from "@/components/sub/SubPageLayout";
import AboutSection from "@/components/sub/about/AboutSection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/about", label: "메타폴리스 소개" });

export default function Page() {
  return (
    <SubPageLayout path="/about" className="about">
      <AboutSection />
    </SubPageLayout>
  );
}

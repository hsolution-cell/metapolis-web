import SubPageLayout from "@/components/sub/SubPageLayout";
import AboutSection from "@/components/sub/about/AboutSection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/about" });

export default function Page() {
  return (
    <SubPageLayout path="/about" className="about">
      <AboutSection />
    </SubPageLayout>
  );
}

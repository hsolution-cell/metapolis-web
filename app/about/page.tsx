import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/about", label: "메타폴리스 소개" });

export default function Page() {
  return <MockupPage path="/about" image="menu1_1" label="메타폴리스 소개" />;
}

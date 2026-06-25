import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/support/inquiry", label: "문의하기" });

export default function Page() {
  return <MockupPage path="/support/inquiry" image="menu4_2" label="문의하기" />;
}

import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/support/faq", label: "자주 묻는 질문" });

export default function Page() {
  return <MockupPage path="/support/faq" image="menu4_1" label="자주 묻는 질문" />;
}

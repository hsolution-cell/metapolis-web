import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/hours", label: "영업시간" });

export default function Page() {
  return <MockupPage path="/hours" image="menu1_2" label="영업시간" />;
}

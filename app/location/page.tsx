import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/location", label: "오시는 길" });

export default function Page() {
  return <MockupPage path="/location" image="menu1_3" label="오시는 길" />;
}

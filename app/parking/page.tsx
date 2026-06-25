import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/parking", label: "주차안내" });

export default function Page() {
  return <MockupPage path="/parking" image="menu1_4" label="주차안내" />;
}

import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/stores", label: "주요매장" });

export default function Page() {
  return <MockupPage path="/stores" image="menu2_1" label="주요매장" />;
}

import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/stores/facilities", label: "편의시설" });

export default function Page() {
  return <MockupPage path="/stores/facilities" image="menu2_4" label="편의시설" />;
}

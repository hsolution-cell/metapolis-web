import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/events/stores", label: "매장 이벤트" });

export default function Page() {
  return <MockupPage path="/events/stores" image="menu3_2" label="매장 이벤트" />;
}

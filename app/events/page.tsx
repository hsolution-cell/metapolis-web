import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/events", label: "메타폴리스 이벤트" });

export default function Page() {
  return <MockupPage path="/events" image="menu3_1" label="메타폴리스 이벤트" />;
}

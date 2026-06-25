import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/support/notices", label: "고객알림" });

export default function Page() {
  return <MockupPage path="/support/notices" image="menu4_3" label="고객알림" />;
}

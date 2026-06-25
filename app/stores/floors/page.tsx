import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/stores/floors", label: "층별안내" });

export default function Page() {
  return <MockupPage path="/stores/floors" image="menu2_2" label="층별안내" />;
}

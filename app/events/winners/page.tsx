import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/events/winners", label: "당첨자 발표" });

export default function Page() {
  return <MockupPage path="/events/winners" image="menu3_3" label="당첨자 발표" />;
}

import MockupPage, { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/stores/categories", label: "카테고리별 안내" });

export default function Page() {
  return <MockupPage path="/stores/categories" image="menu2_3" label="카테고리별 안내" />;
}

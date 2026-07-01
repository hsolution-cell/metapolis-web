import SubPageLayout from "@/components/sub/SubPageLayout";
import FloorsSection from "@/components/sub/floors/FloorsSection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";
import { resolveFloorGuideSelection } from "@/data/floorGuide";

export const metadata = buildMockupMetadata({ path: "/stores/floors", label: "층별안내" });

type PageProps = {
  searchParams: Promise<{ block?: string; floor?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const selection = resolveFloorGuideSelection(params.block, params.floor);

  return (
    <SubPageLayout path="/stores/floors" className="floors">
      <FloorsSection
        key={selection ? `${selection.block}-${selection.floorId}` : "default"}
        initialBlock={selection?.block}
        initialFloorId={selection?.floorId}
      />
    </SubPageLayout>
  );
}

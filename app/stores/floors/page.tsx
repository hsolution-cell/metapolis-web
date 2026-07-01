import SubPageLayout from "@/components/sub/SubPageLayout";
import FloorsSection from "@/components/sub/floors/FloorsSection";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { resolveFloorGuideSelection } from "@/data/floorGuide";

export const metadata = buildPageMetadata({ path: "/stores/floors" });

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

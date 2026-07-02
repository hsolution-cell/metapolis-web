import SubPageLayout from "@/components/sub/SubPageLayout";
import FloorsSection from "@/components/sub/floors/FloorsSection";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { buildFloorGuideBlocksFrom, resolveFloorGuideSelection } from "@/data/floorGuide";
import { listStores } from "@/lib/stores-db";

export const metadata = buildPageMetadata({ path: "/stores/floors" });
export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ block?: string; floor?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const selection = resolveFloorGuideSelection(params.block, params.floor);
  const stores = await listStores();
  const blocks = buildFloorGuideBlocksFrom(stores);

  return (
    <SubPageLayout path="/stores/floors" className="floors">
      <FloorsSection
        key={selection ? `${selection.block}-${selection.floorId}` : "default"}
        blocks={blocks}
        initialBlock={selection?.block}
        initialFloorId={selection?.floorId}
      />
    </SubPageLayout>
  );
}

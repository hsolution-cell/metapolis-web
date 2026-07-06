import type { Metadata } from "next";
import EnSubLayout from "@/components/en/EnSubLayout";
import FloorsSection from "@/components/sub/floors/FloorsSection";
import { buildEnFloorGuideBlocks } from "@/data/en/floors";
import { resolveFloorGuideSelection } from "@/data/floorGuide";
import { listStores } from "@/lib/stores-db";

export const metadata: Metadata = {
  title: "METAPOLIS MALL | Floor Guide",
  description: "METAPOLIS MALL floor-by-floor store directory for Block A and Block B.",
};

type PageProps = {
  searchParams: Promise<{ block?: string; floor?: string }>;
};

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const selection = resolveFloorGuideSelection(params.block, params.floor);
  const stores = await listStores();
  const blocks = buildEnFloorGuideBlocks(stores);

  return (
    <EnSubLayout
      currentPath="/en/floors"
      label="Floor Guide"
      bannerImage="/img/sub/banner/menu1.png"
      className="floors"
    >
      <FloorsSection
        key={selection ? `${selection.block}-${selection.floorId}` : "default"}
        initialBlock={selection?.block}
        initialFloorId={selection?.floorId}
        blocks={blocks}
        ariaLabel="Floor selection"
        mapAltSuffix="floor directory map"
      />
    </EnSubLayout>
  );
}

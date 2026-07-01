import type { Metadata } from "next";
import EnSubLayout from "@/components/en/EnSubLayout";
import FloorsSection from "@/components/sub/floors/FloorsSection";
import { EN_FLOOR_GUIDE_BLOCKS } from "@/data/en/floors";
import { resolveFloorGuideSelection } from "@/data/floorGuide";

export const metadata: Metadata = {
  title: "METAPOLIS | Floor Guide",
  description: "METAPOLIS floor-by-floor store directory for Block A and Block B.",
};

type PageProps = {
  searchParams: Promise<{ block?: string; floor?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const selection = resolveFloorGuideSelection(params.block, params.floor);

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
        blocks={EN_FLOOR_GUIDE_BLOCKS}
        ariaLabel="Floor selection"
        mapAltSuffix="floor directory map"
      />
    </EnSubLayout>
  );
}

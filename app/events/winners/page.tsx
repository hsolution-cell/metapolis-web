import SubPageLayout from "@/components/sub/SubPageLayout";
import WinnersSection from "@/components/sub/winners/WinnersSection";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { listWinners } from "@/lib/winners-db";
import type { WinnerItem } from "@/data/winners";

export const metadata = buildPageMetadata({ path: "/events/winners" });
export const dynamic = "force-dynamic";

export default async function Page() {
  const records = await listWinners();
  const items: WinnerItem[] = records.map((w) => ({
    id: w.id,
    title: w.title,
    thumbnail: w.thumbnail ?? undefined,
    date: w.date,
    pinned: w.pinned,
  }));

  return (
    <SubPageLayout path="/events/winners" className="winners">
      <WinnersSection items={items} />
    </SubPageLayout>
  );
}

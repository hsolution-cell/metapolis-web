import { notFound } from "next/navigation";
import SubPageLayout from "@/components/sub/SubPageLayout";
import WinnerDetailSection from "@/components/sub/winners/WinnerDetailSection";
import { EVENT_DETAIL_BANNER } from "@/data/events";
import { getWinnerById, listWinners } from "@/lib/winners-db";
import { postOpenGraph } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const item = await getWinnerById(id);
  if (!item) {
    return { title: "METAPOLIS MALL | 당첨자 발표" };
  }
  return {
    title: `METAPOLIS MALL | ${item.title}`,
    description: item.title,
    openGraph: postOpenGraph(item.title, item.thumbnail),
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const item = await getWinnerById(id);

  if (!item) {
    notFound();
  }

  const all = await listWinners();
  const index = all.findIndex((w) => w.id === id);
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  return (
    <SubPageLayout
      path="/events/winners"
      className="winners winners--detail events events--detail"
      bannerImage={EVENT_DETAIL_BANNER}
    >
      <WinnerDetailSection
        title={item.title}
        date={item.date}
        bodyHtml={item.body ?? ""}
        nextHref={next ? `/events/winners/${next.id}` : undefined}
      />
    </SubPageLayout>
  );
}

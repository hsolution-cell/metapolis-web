import { notFound } from "next/navigation";
import SubPageLayout from "@/components/sub/SubPageLayout";
import WinnerDetailSection from "@/components/sub/winners/WinnerDetailSection";
import { EVENT_DETAIL_BANNER } from "@/data/events";
import { WINNER_ANNOUNCEMENTS, getWinnerById } from "@/data/winners";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return WINNER_ANNOUNCEMENTS.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const item = getWinnerById(id);

  if (!item) {
    return { title: "METAPOLIS | 당첨자 발표" };
  }

  return {
    title: `METAPOLIS | ${item.title}`,
    description: item.title,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const item = getWinnerById(id);

  if (!item) {
    notFound();
  }

  return (
    <SubPageLayout
      path="/events/winners"
      className="winners winners--detail events events--detail"
      bannerImage={EVENT_DETAIL_BANNER}
    >
      <WinnerDetailSection item={item} />
    </SubPageLayout>
  );
}

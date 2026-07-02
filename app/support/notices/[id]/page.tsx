import { notFound } from "next/navigation";
import SubPageLayout from "@/components/sub/SubPageLayout";
import NoticeDetailSection from "@/components/sub/notices/NoticeDetailSection";
import { getNoticeById, listNotices } from "@/lib/notices-db";
import { firstImageSrc, postOpenGraph } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const item = await getNoticeById(id);

  if (!item) {
    return { title: "METAPOLIS | 고객알림" };
  }

  return {
    title: `METAPOLIS | ${item.title}`,
    description: item.title,
    openGraph: postOpenGraph(item.title, firstImageSrc(item.body)),
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const item = await getNoticeById(id);

  if (!item) {
    notFound();
  }

  // 최신순 목록에서 다음(더 오래된) 글 찾기
  const all = await listNotices();
  const index = all.findIndex((n) => n.id === id);
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  return (
    <SubPageLayout
      path="/support/notices"
      className="notices notices--detail events events--detail"
    >
      <NoticeDetailSection
        item={item}
        nextHref={next ? `/support/notices/${next.id}` : undefined}
      />
    </SubPageLayout>
  );
}

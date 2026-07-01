import { notFound } from "next/navigation";
import SubPageLayout from "@/components/sub/SubPageLayout";
import NoticeDetailSection from "@/components/sub/notices/NoticeDetailSection";
import { NOTICE_ITEMS, getNoticeById } from "@/data/notices";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return NOTICE_ITEMS.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const item = getNoticeById(id);

  if (!item) {
    return { title: "METAPOLIS | 고객알림" };
  }

  return {
    title: `METAPOLIS | ${item.title}`,
    description: item.title,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const item = getNoticeById(id);

  if (!item) {
    notFound();
  }

  return (
    <SubPageLayout
      path="/support/notices"
      className="notices notices--detail events events--detail"
    >
      <NoticeDetailSection item={item} />
    </SubPageLayout>
  );
}

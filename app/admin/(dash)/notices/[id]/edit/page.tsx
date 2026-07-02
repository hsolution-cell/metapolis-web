import { notFound } from "next/navigation";
import NoticeForm from "@/components/admin/NoticeForm";
import { getNoticeById } from "@/lib/notices-db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditNoticePage({ params }: PageProps) {
  const { id } = await params;
  const item = await getNoticeById(id);

  if (!item) {
    notFound();
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>공지 수정</h1>
      </div>
      <NoticeForm
        mode="edit"
        noticeId={item.id}
        initial={{
          category: item.category,
          title: item.title,
          date: item.date,
          body: item.body ?? "",
        }}
      />
    </>
  );
}

import { notFound } from "next/navigation";
import WinnerForm from "@/components/admin/WinnerForm";
import { getWinnerById } from "@/lib/winners-db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditWinnerPage({ params }: PageProps) {
  const { id } = await params;
  const winner = await getWinnerById(id);

  if (!winner) {
    notFound();
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>당첨자 발표 수정</h1>
      </div>
      <WinnerForm
        mode="edit"
        winnerId={winner.id}
        initial={{
          title: winner.title,
          date: winner.date,
          thumbnail: winner.thumbnail,
          body: winner.body ?? "",
          pinned: winner.pinned,
        }}
      />
    </>
  );
}

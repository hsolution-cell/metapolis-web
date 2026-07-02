import { notFound } from "next/navigation";
import PopupForm from "@/components/admin/PopupForm";
import { getPopupById } from "@/lib/popups-db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPopupPage({ params }: PageProps) {
  const { id } = await params;
  const popup = await getPopupById(id);

  if (!popup) {
    notFound();
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>팝업 수정</h1>
      </div>
      <PopupForm
        mode="edit"
        locale={popup.locale}
        popupId={popup.id}
        initial={{
          locale: popup.locale,
          title: popup.title,
          image: popup.image,
          linkHref: popup.linkHref,
          startDate: popup.startDate,
          endDate: popup.endDate,
          sortOrder: popup.sortOrder,
          active: popup.active,
        }}
      />
    </>
  );
}

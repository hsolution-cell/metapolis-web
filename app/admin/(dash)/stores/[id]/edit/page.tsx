import { notFound } from "next/navigation";
import StoreForm from "@/components/admin/StoreForm";
import { getStoreById } from "@/lib/stores-db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditStorePage({ params }: PageProps) {
  const { id } = await params;
  const store = await getStoreById(id);

  if (!store) {
    notFound();
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>매장 수정</h1>
      </div>
      <StoreForm
        mode="edit"
        storeId={store.id}
        initial={{
          name: store.name,
          block: store.block,
          floorId: store.floorId,
          tel: store.tel,
          iconCategory: store.iconCategory,
          guideCategory: store.guideCategory,
          isSignature: store.isSignature ?? false,
          sortOrder: store.sortOrder,
        }}
      />
    </>
  );
}

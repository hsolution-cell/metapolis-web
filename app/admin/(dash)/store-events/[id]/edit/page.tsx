import { notFound } from "next/navigation";
import StoreEventForm from "@/components/admin/StoreEventForm";
import { getStoreEventById } from "@/lib/store-events-db";
import { listStores } from "@/lib/stores-db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditStoreEventPage({ params }: PageProps) {
  const { id } = await params;
  const [event, stores] = await Promise.all([getStoreEventById(id), listStores()]);

  if (!event) {
    notFound();
  }

  const options = stores.map((s) => ({ id: s.id, name: s.name }));

  return (
    <>
      <div className="admin-page-head">
        <h1>매장 이벤트 수정</h1>
      </div>
      <StoreEventForm
        mode="edit"
        storeEventId={event.id}
        stores={options}
        initial={{
          title: event.title,
          brandName: event.brandName ?? "",
          storeId: event.storeId,
          startDate: event.startDate,
          endDate: event.endDate,
          thumbnail: event.thumbnail,
          body: event.body ?? "",
          pinned: event.pinned,
        }}
      />
    </>
  );
}

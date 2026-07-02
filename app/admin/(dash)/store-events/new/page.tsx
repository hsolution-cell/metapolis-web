import StoreEventForm from "@/components/admin/StoreEventForm";
import { listStores } from "@/lib/stores-db";

export const dynamic = "force-dynamic";

export default async function NewStoreEventPage() {
  const stores = await listStores();
  const options = stores.map((s) => ({ id: s.id, name: s.name }));

  return (
    <>
      <div className="admin-page-head">
        <h1>새 매장 이벤트 등록</h1>
      </div>
      <StoreEventForm mode="new" stores={options} />
    </>
  );
}

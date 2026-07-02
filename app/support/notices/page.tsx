import SubPageLayout from "@/components/sub/SubPageLayout";
import NoticesSection from "@/components/sub/notices/NoticesSection";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { listNotices } from "@/lib/notices-db";

export const metadata = buildPageMetadata({ path: "/support/notices" });
export const dynamic = "force-dynamic";

export default async function Page() {
  const notices = await listNotices();
  const items = notices.map((n) => ({
    id: n.id,
    categoryLabel: n.categoryLabel,
    title: n.title,
    date: n.date,
    pinned: n.pinned,
  }));

  return (
    <SubPageLayout path="/support/notices" className="notices">
      <NoticesSection items={items} />
    </SubPageLayout>
  );
}

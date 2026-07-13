import { notFound } from "next/navigation";
import HeroBannerForm from "@/components/admin/HeroBannerForm";
import { getHeroBannerById } from "@/lib/hero-banners-db";
import { buildHeroEventOptions } from "../../event-options";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditHeroBannerPage({ params }: PageProps) {
  const { id } = await params;
  const [banner, eventOptions] = await Promise.all([
    getHeroBannerById(id),
    buildHeroEventOptions(),
  ]);

  if (!banner) {
    notFound();
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>배너 수정</h1>
      </div>
      <HeroBannerForm
        mode="edit"
        locale={banner.locale}
        bannerId={banner.id}
        eventOptions={eventOptions}
        initial={{
          locale: banner.locale,
          badge: banner.badge,
          title: banner.title,
          description: banner.description,
          linkHref: banner.linkHref,
          bg: banner.bg,
          bgMobile: banner.bgMobile,
          sortOrder: banner.sortOrder,
          active: banner.active,
          showArrow: banner.showArrow,
        }}
      />
    </>
  );
}

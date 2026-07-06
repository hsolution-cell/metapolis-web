import HeroBannerForm from "@/components/admin/HeroBannerForm";
import { buildHeroEventOptions } from "../event-options";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ locale?: string }>;
};

export default async function NewHeroBannerPage({ searchParams }: PageProps) {
  const { locale: localeParam } = await searchParams;
  const locale = localeParam === "en" ? "en" : "ko";
  const eventOptions = await buildHeroEventOptions();

  return (
    <>
      <div className="admin-page-head">
        <h1>새 {locale === "en" ? "영문 " : ""}배너 등록</h1>
      </div>
      <HeroBannerForm mode="new" locale={locale} eventOptions={eventOptions} />
    </>
  );
}

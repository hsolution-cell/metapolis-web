import HeroBannerForm from "@/components/admin/HeroBannerForm";

type PageProps = {
  searchParams: Promise<{ locale?: string }>;
};

export default async function NewHeroBannerPage({ searchParams }: PageProps) {
  const { locale: localeParam } = await searchParams;
  const locale = localeParam === "en" ? "en" : "ko";

  return (
    <>
      <div className="admin-page-head">
        <h1>새 {locale === "en" ? "영문 " : ""}배너 등록</h1>
      </div>
      <HeroBannerForm mode="new" locale={locale} />
    </>
  );
}

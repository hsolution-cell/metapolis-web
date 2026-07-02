import PopupForm from "@/components/admin/PopupForm";

type PageProps = {
  searchParams: Promise<{ locale?: string }>;
};

export default async function NewPopupPage({ searchParams }: PageProps) {
  const { locale: localeParam } = await searchParams;
  const locale = localeParam === "en" ? "en" : "ko";

  return (
    <>
      <div className="admin-page-head">
        <h1>새 {locale === "en" ? "영문 " : ""}팝업 등록</h1>
      </div>
      <PopupForm mode="new" locale={locale} />
    </>
  );
}

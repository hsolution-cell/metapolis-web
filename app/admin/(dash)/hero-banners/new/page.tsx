import HeroBannerForm from "@/components/admin/HeroBannerForm";

export default function NewHeroBannerPage() {
  return (
    <>
      <div className="admin-page-head">
        <h1>새 배너 등록</h1>
      </div>
      <HeroBannerForm mode="new" />
    </>
  );
}

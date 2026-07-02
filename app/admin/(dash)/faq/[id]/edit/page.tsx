import { notFound } from "next/navigation";
import FaqForm from "@/components/admin/FaqForm";
import { getFaqById, listFaqCategories } from "@/lib/faq-db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditFaqPage({ params }: PageProps) {
  const { id } = await params;
  const [faq, categories] = await Promise.all([getFaqById(id), listFaqCategories()]);

  if (!faq) {
    notFound();
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>FAQ 수정</h1>
      </div>
      <FaqForm
        mode="edit"
        faqId={faq.id}
        categories={categories}
        initial={{
          categoryId: faq.categoryId,
          question: faq.question,
          answer: faq.answer ?? "",
          pinned: faq.pinned,
          sortOrder: faq.sortOrder,
        }}
      />
    </>
  );
}

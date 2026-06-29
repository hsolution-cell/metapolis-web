import type { Metadata } from "next";
import SubPageLayout from "@/components/sub/SubPageLayout";
import { getPageMeta } from "@/data/siteMeta";

type MockupPageProps = {
  image: string;
  label: string;
  path: string;
};

export function buildMockupMetadata({ path, label }: Pick<MockupPageProps, "path" | "label">): Metadata {
  const meta = getPageMeta(path);
  return {
    title: meta.title,
    description: meta.description,
    ...(meta.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function MockupPage({ image, label, path }: MockupPageProps) {
  return (
    <SubPageLayout path={path} className="sub_page--mockup">
      <div className="sub_mockup">
        <img src={`/img/sub/${image}.png?v=1.0.0`} alt={`${label} 페이지 시안`} />
      </div>
    </SubPageLayout>
  );
}

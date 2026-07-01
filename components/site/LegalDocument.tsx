import type { LegalArticle, LegalBlock } from "@/data/legal";

function LegalBlockView({ block }: { block: LegalBlock }) {
  if (block.type === "paragraph") {
    return (
      <p
        className="site_legal_paragraph"
        dangerouslySetInnerHTML={{ __html: block.text }}
      />
    );
  }

  const ListTag = block.type === "ordered-list" ? "ol" : "ul";

  return (
    <ListTag className="site_legal_list">
      {block.items.map((item, index) => (
        <li key={`${index}-${item}`} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ListTag>
  );
}

type LegalDocumentProps = {
  title: string;
  revisedAt: string;
  articles: LegalArticle[];
};

export default function LegalDocument({ title, revisedAt, articles }: LegalDocumentProps) {
  return (
    <>
      <div className="header_container" />
      <section className="site_page page">
        <div className="content_inner innerTop innerBot">
          <div className="site_legal_head">
            <h2 className="site_page_title">{title}</h2>
            <p className="site_legal_meta">{revisedAt}</p>
          </div>

          <div className="site_legal_doc">
            {articles.map((article) => (
              <article key={article.id} className="site_legal_article">
                <h3 className="site_legal_article_title">{article.title}</h3>
                {article.blocks.map((block, index) => (
                  <LegalBlockView key={`${article.id}-${index}`} block={block} />
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

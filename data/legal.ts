export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "ordered-list"; items: string[] }
  | { type: "unordered-list"; items: string[] };

export type LegalArticle = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

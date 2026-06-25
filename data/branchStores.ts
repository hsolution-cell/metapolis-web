export const STORE_SLOTS = 5;

export const STORE_LABELS: Record<string, string> = {
  cgv: "CGV",
  mad_for_garlic: "Mad for Garlic",
  juno_hair: "JUNO HAIR",
  hanilgwan: "한일관",
  hongsujjimdak: "홍수계찜닭",
  outback: "OUTBACK",
  thai: "Thai",
  jjang_orakil: "짱오락실",
  geogung: "거궁",
  mixxo: "MIXXO",
  shesmiss: "SHESMISS",
  giordano: "GIORDANO",
  crocs: "crocs",
  tokkijung: "토끼정",
  adidas: "adidas",
  discovery: "DISCOVERY",
  newbalance: "New Balance",
  thenorthface: "THE NORTH FACE",
  oliveyoung: "OLIVE YOUNG",
  "8seconds": "8SECONDS",
  ashley: "ASHLEY",
  starbucks: "Starbucks",
  resortlab: "RESORT LAB",
  frisbee: "FRISBEE",
  aladin: "알라딘",
  majipiero: "마지삐에로",
  salon_de_marshall: "Salon de Marshall",
  theblackbelt: "THE BLACK BELT",
  gs25: "GS25",
  mochistory: "MOCHISTORY",
  tiger: "TIGER",
  abcmart: "ABC MART",
  artbox: "artbox",
  zin: "ZIN",
  modernhouse: "MODERN HOUSE",
  topten: "TOP TEN",
  muji: "MUJI",
  etland: "전자랜드",
  designskin: "designskin",
  lloyd: "LLOYD",
  homeplus: "Homeplus",
};

export type BranchBlock = "a" | "b";

export const BRANCH_FLOORS: Record<BranchBlock, { id: string; label: string }[]> = {
  a: [
    { id: "4f", label: "4F" },
    { id: "3f", label: "3F" },
    { id: "2f", label: "2F" },
    { id: "1f", label: "1F" },
    { id: "b2", label: "B2" },
  ],
  b: [
    { id: "4f", label: "4F" },
    { id: "3f", label: "3F" },
    { id: "2f", label: "2F" },
    { id: "1f", label: "1F" },
    { id: "b2b4", label: "B2-B4" },
  ],
};

export const BRANCH_STORES: Record<BranchBlock, Record<string, string[]>> = {
  a: {
    "4f": ["cgv", "mad_for_garlic", "juno_hair", "hanilgwan", "hongsujjimdak"],
    "3f": ["cgv", "outback", "thai", "jjang_orakil", "geogung"],
    "2f": ["mixxo", "shesmiss", "giordano", "crocs", "tokkijung"],
    "1f": ["adidas", "discovery", "newbalance", "thenorthface", "oliveyoung"],
    b2: ["8seconds", "ashley", "starbucks", "resortlab", "frisbee"],
  },
  b: {
    "4f": ["aladin", "majipiero", "salon_de_marshall"],
    "3f": ["theblackbelt", "gs25", "mochistory", "jjang_orakil", "tiger"],
    "2f": ["abcmart", "artbox", "zin", "modernhouse", "topten"],
    "1f": ["muji", "etland", "designskin", "modernhouse", "lloyd"],
    b2b4: ["homeplus"],
  },
};

export function getStoreLabel(slug: string) {
  return STORE_LABELS[slug] ?? slug;
}

export function parseDetailKey(key: string): { block: BranchBlock; floorId: string } | null {
  const dashIndex = key.indexOf("-");
  if (dashIndex === -1) return null;
  const block = key.slice(0, dashIndex) as BranchBlock;
  if (block !== "a" && block !== "b") return null;
  return { block, floorId: key.slice(dashIndex + 1) };
}

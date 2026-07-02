import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * 스토리지 고아 이미지 정리 헬퍼 (서버 전용).
 * 글 삭제/이미지 교체 시 content-images 버킷에서 더는 쓰지 않는 파일을 지운다.
 */

const CONTENT_IMAGE_RE =
  /\/storage\/v1\/object\/public\/content-images\/([^\s"'<>?)]+)/g;

/**
 * URL 또는 HTML 본문 문자열들에서 content-images 버킷 내부 경로를 전부 추출(중복 제거).
 * 로컬 경로(/img/...)나 외부 이미지는 매치되지 않아 안전.
 */
export function extractContentImagePaths(
  ...sources: (string | null | undefined)[]
): string[] {
  const paths = new Set<string>();
  for (const source of sources) {
    if (!source) continue;
    for (const match of source.matchAll(CONTENT_IMAGE_RE)) {
      paths.add(decodeURIComponent(match[1]));
    }
  }
  return [...paths];
}

/**
 * content-images 버킷에서 파일 삭제 — best-effort.
 * 실패해도 throw 하지 않음(글 저장/삭제 자체를 막지 않기 위해).
 */
export async function removeContentImages(
  supabase: SupabaseClient,
  paths: string[]
): Promise<void> {
  if (!paths.length) return;
  try {
    await supabase.storage.from("content-images").remove(paths);
  } catch {
    /* 정리 실패는 무시 */
  }
}

/**
 * 교체/삭제로 "더는 쓰지 않게 된" 이미지만 정리.
 * oldSources 에는 있으나 newSources 에는 없는 경로를 삭제한다.
 * (삭제 시에는 newSources 를 비워서 호출)
 */
export async function cleanupRemovedImages(
  supabase: SupabaseClient,
  oldSources: (string | null | undefined)[],
  newSources: (string | null | undefined)[] = []
): Promise<void> {
  const oldPaths = extractContentImagePaths(...oldSources);
  if (!oldPaths.length) return;
  const keep = new Set(extractContentImagePaths(...newSources));
  const removed = oldPaths.filter((p) => !keep.has(p));
  await removeContentImages(supabase, removed);
}

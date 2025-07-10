import { kv } from "@vercel/kv";
import { customAlphabet } from "nanoid";

export const IS_SHARE_ENABLED = !!process.env.KV_REST_API_TOKEN;

export interface ShareVideoParams {
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: number;
  width: number;
  height: number;
}

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

// Six months in seconds
const SIX_MONTHS = 60 * 60 * 24 * 30 * 6;

export async function shareVideo(params: ShareVideoParams) {
  const id = nanoid();
  await kv.set(
    `share:${id}`,
    {
      id,
      ...params,
      createdAt: Date.now(),
    },
    {
      ex: SIX_MONTHS,
    },
  );
  return id;
}

export async function fetchSharedVideo(id: string) {
  return kv.get<ShareVideoParams>(`share:${id}`);
}

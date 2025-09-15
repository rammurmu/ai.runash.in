import type { MediaItem } from "@/data/schema";
import { getFalClient } from "./fal";
import { resolveMediaUrl } from "./utils";

export async function getMediaMetadata(media: MediaItem) {
  try {
    const fal = getFalClient();
    if (!fal) {
      throw new Error("Fal client not available");
    }
    const { data: mediaMetadata } = await fal.subscribe(
      "fal-ai/ffmpeg-api/metadata",
      {
        input: {
          media_url: resolveMediaUrl(media),
          extract_frames: true,
        },
        mode: "streaming",
      },
    );

    return mediaMetadata;
  } catch (error) {
    console.error(error);
    return {};
  }
}

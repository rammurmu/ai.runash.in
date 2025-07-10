import { VideoProject } from "@/data/schema";
import { fal } from "./fal";
import { extractJson } from "./utils";

const SYSTEM_PROMPT = `
You're a video editor assistant. You will receive a request to create a new short video project.
You need to provide a short title (2-5 words) and a brief description (2-3 sentences) for the project.
This description will help the creator to understand the context and general direction of the video.

## Output example:

\`\`\`json
{
  "title": "Summer Memories",
  "description": "A of clips of a summer vacation, featuring beach, sunsets, beautiful blue ocean waters."
}
\`\`\`

## Important guidelines:

1. The description should be creative and engaging, come up with cool ideas that could fit a 10-30s video.
2. Think of different situations, like product advertisement, casual videos, travel vlog, movie teaser, etc.
3. Last but not least, **always** return the result in JSON format with the keys "title" and "description".
**Do not add any extra content and/or explanation, return plain JSON**.

`;

type ProjectSuggestion = {
  title: string;
  description: string;
};

export async function createProjectSuggestion() {
  const { data } = await fal.subscribe("fal-ai/any-llm", {
    input: {
      system_prompt: SYSTEM_PROMPT,
      prompt: "Create a short video project with a title and description.",
      model: "meta-llama/llama-3.2-1b-instruct",
    },
  });

  return extractJson<ProjectSuggestion>(data.output);
}

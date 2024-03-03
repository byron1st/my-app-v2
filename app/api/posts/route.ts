import { convertMarkdownToHTML } from "@/lib/marked";

type CreatePostBody = {
  text: string; // Markdown text
  tags?: string[];
};

type CreatePostResponse = {
  id: string;
};

export async function POST(req: Request) {
  const data = (await req.json()) as CreatePostBody;

  const { html } = await convertMarkdownToHTML(data.text);

  const res: CreatePostResponse = { id: html };

  return Response.json(res);
}

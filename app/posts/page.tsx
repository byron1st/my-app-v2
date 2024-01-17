import * as fs from "fs";
import { convertMarkdownToHTML } from "@/lib/marked";
import PostContent from "@/lib/components/post/PostContent";
import "@/lib/styles/blog.css";

async function getFile() {
  const content = fs.readFileSync("testdata/index.md", "utf-8");
  return convertMarkdownToHTML(content);
}

export default async function Posts() {
  const { html } = await getFile();

  return (
    <>
      <PostContent html={html} />
    </>
  );
}

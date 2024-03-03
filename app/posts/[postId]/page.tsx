import notion from "@/lib/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Button, Heading, Separator } from "@radix-ui/themes";
import PostContent from "@/lib/components/post/PostContent";
import BackButton from "@/lib/components/post/BackButton";
import { Suspense } from "react";

async function getPost(postId: string) {
  const [page, content] = await Promise.all([
    notion.pages.retrieve({ page_id: postId }),
    notion.blocks.children.list({
      block_id: postId,
      page_size: 100,
    }),
  ]);

  return { post: page as PageObjectResponse, content };
}

export default async function Page({ params }: { params: { postId: string } }) {
  const { post, content } = await getPost(params.postId);
  const postTitle = getTitle(post);

  return (
    <>
      {/*<BackButton />*/}

      <Heading mb="4">{postTitle}</Heading>

      <Separator orientation="horizontal" size="4" mb="4" />

      <PostContent content={content} />
    </>
  );
}

function getTitle(page: PageObjectResponse): string {
  const nameProp = page.properties["Name"];
  if (!nameProp) return "";
  if (nameProp.type !== "title") return "";
  if (nameProp.title.length === 0) return "";

  return nameProp.title[0].plain_text;
}

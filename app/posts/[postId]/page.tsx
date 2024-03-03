import notion from "@/lib/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Heading, Separator } from "@radix-ui/themes";
import PostContent from "@/lib/components/post/PostContent";
import BackButton from "@/lib/components/post/BackButton";
import { getTitle } from "@/lib/utils/posts";
import PostHeaderDescription from "@/lib/components/post/PostHeaderDescription";

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
      <BackButton />

      <Heading trim="end" mb="2">
        {postTitle}
      </Heading>
      <PostHeaderDescription post={post} />

      <Separator orientation="horizontal" size="4" mb="4" />

      <PostContent content={content} />
    </>
  );
}

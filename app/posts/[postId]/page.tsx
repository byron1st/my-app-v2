import { Heading, Separator } from "@radix-ui/themes";
import PostContent from "@/lib/components/post/PostContent";
import BackButton from "@/lib/components/common/BackButton";
import { getTitle } from "@/lib/utils/posts";
import PostHeaderDescription from "@/lib/components/post/PostHeaderDescription";
import { getPost } from "@/lib/notion/api";

export const revalidate = 86400; // 1 day

export default async function Page({ params }: { params: { postId: string } }) {
  const { post, content } = await getPost(params.postId);
  const postTitle = getTitle(post);

  return (
    <>
      <BackButton target="posts" />

      <Heading trim="end" mb="2">
        {postTitle}
      </Heading>
      <PostHeaderDescription post={post} />

      <Separator orientation="horizontal" size="4" mb="4" />

      <PostContent content={content} />
    </>
  );
}

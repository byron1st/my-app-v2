import PostListItem from "@/lib/components/posts/PostListItem";
import { Flex, Heading, Link, Separator, Text } from "@radix-ui/themes";
import TagsListView from "@/lib/components/posts/TagsListView";
import { getPosts, getTagsList } from "@/lib/notion/api";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export const revalidate = 86400; // 1 day

export default async function Posts({
  searchParams,
}: {
  searchParams: { tags: string };
}) {
  const tags = searchParams.tags?.split(",") ?? [];
  const posts = await getPosts(tags);
  const tagsList = await getTagsList();

  return (
    <>
      <Flex justify="between" align="start">
        <Heading mb="4">Posts</Heading>

        <Text size="1">
          <Link href="https://velog.io/@byron1st" target="_blank">
            <Flex align="center" gap="1">
              <ExternalLinkIcon /> Velog (archived)
            </Flex>
          </Link>
        </Text>
      </Flex>

      <TagsListView tagsList={tagsList} tags={tags} />

      <Separator orientation="horizontal" size="4" />

      <Flex direction="column" gap="1">
        {posts.map((post) => (
          <PostListItem page={post} key={post.id} />
        ))}
      </Flex>
    </>
  );
}

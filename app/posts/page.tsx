// https://www.notion.so/hwiahn/208c3636ee604e419401430118b6564a?v=5ccd8a4452af4031b0908717c6c49fdc

import notion from "@/lib/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import PostListItem from "@/lib/components/posts/PostListItem";
import {
  Badge,
  Em,
  Flex,
  Heading,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";
import TagsListView from "@/lib/components/posts/TagsListView";

async function getPosts(tags: string[]): Promise<PageObjectResponse[]> {
  if (!process.env.NOTION_POSTS_DB_ID) return [];

  const response = await notion.databases.query({
    database_id: process.env.NOTION_POSTS_DB_ID,
    filter: {
      or: tags.map((tag) => ({
        property: "Tags",
        multi_select: { contains: tag },
      })),
    },
    sorts: [
      { property: "PublishedDate", direction: "descending" },
      { timestamp: "created_time", direction: "descending" },
    ],
  });

  return response.results as PageObjectResponse[];
}

async function getTagsList() {
  if (!process.env.NOTION_POSTS_DB_ID) return [];

  const response = await notion.databases.retrieve({
    database_id: process.env.NOTION_POSTS_DB_ID,
  });

  const tagsProperty = response.properties["Tags"];
  if (!tagsProperty || tagsProperty.type !== "multi_select") return [];
  return tagsProperty.multi_select.options.map((option) => option.name);
}

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
          <Link href="https://velog.io/@byron1st">Velog (archived)</Link>
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

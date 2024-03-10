import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notionClient } from "@/lib/notion/client";
import { cache } from "react";

export const getPosts = cache(
  async (tags: string[]): Promise<PageObjectResponse[]> => {
    if (!process.env.NOTION_POSTS_DB_ID) return [];

    const response = await notionClient.databases.query({
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
  },
);

export const getTagsList = cache(async () => {
  if (!process.env.NOTION_POSTS_DB_ID) return [];

  const response = await notionClient.databases.retrieve({
    database_id: process.env.NOTION_POSTS_DB_ID,
  });

  const tagsProperty = response.properties["Tags"];
  if (!tagsProperty || tagsProperty.type !== "multi_select") return [];
  return tagsProperty.multi_select.options.map((option) => option.name);
});

export const getPost = cache(async (postId: string) => {
  const [page, content] = await Promise.all([
    notionClient.pages.retrieve({ page_id: postId }),
    notionClient.blocks.children.list({
      block_id: postId,
      page_size: 100,
    }),
  ]);

  return { post: page as PageObjectResponse, content };
});

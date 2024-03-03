"use client";

import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Badge, Flex, Heading, Link, Separator, Text } from "@radix-ui/themes";
import { useMemo } from "react";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NLink from "next/link";
import PostTag from "@/lib/components/common/PostTag";

export default function PostListItem({ page }: { page: PageObjectResponse }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const title = useMemo(() => getTitle(page), [page]);
  const publishedDate = useMemo(() => getPublishedDate(page), [page]);
  const isShortPost = useMemo(() => checkIfShortPost(page), [page]);
  const tags = useMemo(() => getTags(page), [page]);

  const onSelectTag = (tag: string) => {
    const tagsStr = searchParams.get("tags");
    if (tagsStr?.includes(tag)) return;

    router.push(`${pathname}?tags=${tagsStr ? `${tagsStr},${tag}` : tag}`);
  };

  return (
    <>
      <Flex direction="column" py="1">
        <Heading size="3">
          <Link
            color="gray"
            highContrast={true}
            underline="hover"
            href={`/posts/${page.id}`}
          >
            {title}
          </Link>
          {isShortPost ? <Badge ml={"1"}>토막글</Badge> : null}
        </Heading>
        <Text size="1" color="gray" trim="start">
          {publishedDate}
        </Text>
        <Flex direction="row" wrap="wrap">
          {tags.map(({ name, id }) => (
            <PostTag tag={name} select={onSelectTag} key={id} />
          ))}
        </Flex>
      </Flex>
      <Separator size="4" />
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

function getPublishedDate(page: PageObjectResponse): string {
  const publishedDateProp = page.properties["PublishedDate"];
  if (!publishedDateProp) return "";
  if (publishedDateProp.type !== "date") return "";
  if (!publishedDateProp.date?.start) return "";

  return dayjs(publishedDateProp.date.start).format("YYYY/MM/DD");
}

function checkIfShortPost(page: PageObjectResponse): boolean {
  const kindProp = page.properties["Kind"];
  if (!kindProp) return false;
  if (kindProp.type !== "select") return false;
  if (!kindProp.select?.name) return false;

  return kindProp.select.name === "Short";
}

function getTags(page: PageObjectResponse): { name: string; id: string }[] {
  const tagsProp = page.properties["Tags"];
  if (!tagsProp) return [];
  if (tagsProp.type !== "multi_select") return [];
  if (tagsProp.multi_select?.length === 0) return [];

  return tagsProp.multi_select.map((select) => ({
    name: select.name,
    id: select.id,
  }));
}

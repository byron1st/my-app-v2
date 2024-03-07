"use client";

import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Badge, Flex, Heading, Link, Separator, Text } from "@radix-ui/themes";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PostTag from "@/lib/components/common/PostTag";
import {
  checkIfShortPost,
  getPublishedDate,
  getTags,
  getTitle,
} from "@/lib/utils/posts";

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

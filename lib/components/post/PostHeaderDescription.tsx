"use client";

import { Flex, Strong, Text } from "@radix-ui/themes";
import PostTag from "@/lib/components/common/PostTag";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getPublishedDate, getTags } from "@/lib/utils/posts";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function PostHeaderDescription({
  post,
}: {
  post: PageObjectResponse;
}) {
  const router = useRouter();

  const postPublishedDate = useMemo(() => getPublishedDate(post), [post]);
  const tags = useMemo(() => getTags(post), [post]);

  const selectTag = (tag: string) => {
    router.push(`/posts?tags=${tag}`);
  };

  return (
    <Flex direction="column" align="end" mb="4">
      <Text size="1" color="gray">
        Published at <Strong>{postPublishedDate}</Strong>
      </Text>
      <Text size="1" color="gray">
        Tagged by{" "}
        {tags.map(({ name, id }) => (
          <PostTag tag={name} select={selectTag} key={id} />
        ))}
      </Text>
    </Flex>
  );
}

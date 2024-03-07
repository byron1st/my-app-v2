"use client";

import { Em, Flex, Separator, Text } from "@radix-ui/themes";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import PostTag from "@/lib/components/common/PostTag";

export default function TagsListView({
  tagsList,
  tags,
}: {
  tagsList: string[];
  tags: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const filteredTagsList = useMemo(
    () => tagsList.filter((t) => !tags.includes(t)),
    [tags, tagsList],
  );

  const selectTag = (tag: string) => {
    if (tags.includes(tag)) return;

    const newTags: string[] = JSON.parse(JSON.stringify(tags));
    newTags.push(tag);

    router.push(`${pathname}?tags=${newTags.join(",")}`);
  };

  const deselectTag = (tag: string) => {
    if (!tags.includes(tag)) return;

    const newTags: string[] = JSON.parse(JSON.stringify(tags));
    const index = newTags.findIndex((t) => t === tag);
    newTags.splice(index, 1);

    router.push(
      `${pathname}${newTags.length > 0 ? `?tags=${newTags.join(",")}` : ""}`,
    );
  };

  return (
    <Flex direction="column" gap="1" mb="3">
      <Text size="2">
        <Em>Tags</Em>
      </Text>

      <Flex direction="row" wrap="wrap" gap="1" align="center">
        {tags.map((tag) => (
          <PostTag tag={tag} select={deselectTag} variant="primary" key={tag} />
        ))}

        {tags.length > 0 && (
          <Separator orientation="vertical" size="1" mr="1" />
        )}

        {filteredTagsList.map((tag) => (
          <PostTag tag={tag} select={selectTag} key={tag} />
        ))}
      </Flex>
    </Flex>
  );
}

"use client";

import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";
import CalloutBlock from "@/lib/components/post/blocks/CalloutBlock";
import ParagraphBlock from "@/lib/components/post/blocks/ParagraphBlock";
import HeadingBlock from "@/lib/components/post/blocks/HeadingBlock";
import ListItemBlock from "@/lib/components/post/blocks/ListItemBlock";
import React, { useEffect, useRef, useState } from "react";
import CodeBlock from "@/lib/components/post/blocks/CodeBlock";
import ImageBlock from "@/lib/components/post/blocks/ImageBlock";
import { Box, Em, Text } from "@radix-ui/themes";

export default function PostContent({
  content,
}: {
  content: ListBlockChildrenResponse;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (ref.current) setContentWidth(ref.current.offsetWidth);
  }, []);

  return (
    <Box ref={ref}>
      {contentWidth ? (
        getBlockComponents(content, contentWidth)
      ) : (
        <Text color="gray">
          <Em>Loading a post...</Em>
        </Text>
      )}
    </Box>
  );
}

function getBlockComponents(
  content: ListBlockChildrenResponse,
  contentWidth: number,
) {
  const elements: React.JSX.Element[] = [];

  let tempBulletedList: React.JSX.Element[] = [];
  let tempNumberedList: React.JSX.Element[] = [];
  for (const result of content.results) {
    const block = result as BlockObjectResponse;

    if (tempBulletedList.length > 0 && block.type !== "bulleted_list_item") {
      elements.push(<ul key={`${result.id}_ul`}>{tempBulletedList}</ul>);
      tempBulletedList = [];
    }
    if (tempNumberedList.length > 0 && block.type !== "numbered_list_item") {
      elements.push(<ol key={`${result.id}_ol`}>{tempNumberedList}</ol>);
      tempNumberedList = [];
    }

    switch (block.type) {
      case "callout":
        elements.push(<CalloutBlock block={block} key={result.id} />);
        break;
      case "paragraph":
        elements.push(<ParagraphBlock block={block} key={result.id} />);
        break;
      case "heading_1":
      case "heading_2":
      case "heading_3":
        elements.push(<HeadingBlock block={block} key={result.id} />);
        break;
      case "bulleted_list_item":
        tempBulletedList.push(<ListItemBlock block={block} key={result.id} />);
        break;
      case "numbered_list_item":
        tempNumberedList.push(<ListItemBlock block={block} key={result.id} />);
        break;
      case "code":
        elements.push(<CodeBlock block={block} key={result.id} />);
        break;
      case "image":
        elements.push(
          <ImageBlock block={block} width={contentWidth} key={result.id} />,
        );
      default:
        elements.push(<div key={result.id} />);
    }
  }

  return elements;
}

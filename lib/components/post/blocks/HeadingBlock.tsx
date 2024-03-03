import {
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Heading } from "@radix-ui/themes";
import { useMemo } from "react";
import RichTextBlocks from "@/lib/components/post/blocks/RichTextBlocks";

type HeadingBlocks =
  | Heading1BlockObjectResponse
  | Heading2BlockObjectResponse
  | Heading3BlockObjectResponse;

export default function HeadingBlock({ block }: { block: HeadingBlocks }) {
  const { size, richText } = useMemo(() => getSizeAndRichText(block), [block]);

  return (
    <Heading size={size}>
      <RichTextBlocks richTextItems={richText} keyPrefix={block.id} />
    </Heading>
  );
}

function getSizeAndRichText(block: HeadingBlocks): {
  size: "5" | "4" | "3";
  richText: RichTextItemResponse[];
} {
  if (isHeading1(block)) {
    return { size: "5", richText: block.heading_1.rich_text };
  } else if (isHeading2(block)) {
    return { size: "4", richText: block.heading_2.rich_text };
  } else {
    return { size: "3", richText: block.heading_3.rich_text };
  }
}

function isHeading1(
  headingBlock: HeadingBlocks,
): headingBlock is Heading1BlockObjectResponse {
  return headingBlock.type === "heading_1";
}

function isHeading2(
  headingBlock: HeadingBlocks,
): headingBlock is Heading2BlockObjectResponse {
  return headingBlock.type === "heading_2";
}

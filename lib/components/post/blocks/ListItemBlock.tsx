import {
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { useMemo } from "react";
import RichTextBlocks from "@/lib/components/post/blocks/RichTextBlocks";

export default function ListItemBlock({
  block,
}: {
  block:
    | BulletedListItemBlockObjectResponse
    | NumberedListItemBlockObjectResponse;
}) {
  const richText = useMemo(() => getRichText(block), [block]);

  return (
    <li>{<RichTextBlocks richTextItems={richText} keyPrefix={block.id} />}</li>
  );
}

function getRichText(
  block:
    | BulletedListItemBlockObjectResponse
    | NumberedListItemBlockObjectResponse,
): RichTextItemResponse[] {
  if (isBulletedListItem(block)) return block.bulleted_list_item.rich_text;
  else return block.numbered_list_item.rich_text;
}

function isBulletedListItem(
  block:
    | BulletedListItemBlockObjectResponse
    | NumberedListItemBlockObjectResponse,
): block is BulletedListItemBlockObjectResponse {
  return block.type === "bulleted_list_item";
}

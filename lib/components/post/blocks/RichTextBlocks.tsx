import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import TextBlock from "@/lib/components/post/blocks/TextBlock";

export default function RichTextBlocks({
  richTextItems,
  keyPrefix,
}: {
  richTextItems: RichTextItemResponse[];
  keyPrefix: string;
}) {
  return richTextItems.map((richText, index) => (
    <TextBlock {...richText} key={`${keyPrefix}_${index}`} />
  ));
}

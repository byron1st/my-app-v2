import { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import RichTextBlocks from "@/lib/components/post/blocks/RichTextBlocks";

export default function ParagraphBlock({
  block,
}: {
  block: ParagraphBlockObjectResponse;
}) {
  return (
    <p>
      <RichTextBlocks
        richTextItems={block.paragraph.rich_text}
        keyPrefix={block.id}
      />
    </p>
  );
}

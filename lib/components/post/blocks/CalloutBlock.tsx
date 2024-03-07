import { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Callout } from "@radix-ui/themes";
import { useMemo } from "react";
import RichTextBlocks from "@/lib/components/post/blocks/RichTextBlocks";

export default function CalloutBlock({
  block,
}: {
  block: CalloutBlockObjectResponse;
}) {
  const icon = useMemo(() => getCalloutIcon(block), [block]);

  return (
    <Callout.Root>
      {icon && <Callout.Icon>{icon}</Callout.Icon>}
      <Callout.Text>
        <RichTextBlocks
          richTextItems={block.callout.rich_text}
          keyPrefix={block.id}
        />
      </Callout.Text>
    </Callout.Root>
  );
}

function getCalloutIcon(block: CalloutBlockObjectResponse) {
  if (block.callout.icon?.type === "emoji") {
    return block.callout.icon.emoji;
  }
  return "";
}

import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { Code, Em, Link, Strong, Text } from "@radix-ui/themes";

export default function TextBlock(text: RichTextItemResponse) {
  if (text.type !== "text") return text.plain_text;

  if (text.text.link) {
    return <Link href={text.text.link.url}>{text.plain_text}</Link>;
  }

  if (text.annotations.bold) {
    return <Strong>{text.plain_text}</Strong>;
  } else if (text.annotations.italic) {
    return <Em>{text.plain_text}</Em>;
  } else if (text.annotations.code) {
    return <Code>{text.plain_text}</Code>;
  } else if (text.annotations.underline) {
    return (
      <Text style={{ textDecoration: "underline" }}>{text.plain_text}</Text>
    );
  } else if (text.annotations.strikethrough) {
    return (
      <Text style={{ textDecoration: "line-through" }}>{text.plain_text}</Text>
    );
  } else {
    return <Text>{text.plain_text}</Text>;
  }
}

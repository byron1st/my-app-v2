import { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Code } from "@radix-ui/themes";
import {
  atomOneLight,
  nord,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "next-themes";

export default function CodeBlock({
  block,
}: {
  block: CodeBlockObjectResponse;
}) {
  const { theme } = useTheme();

  const language = block.code.language;
  const codeText = block.code.rich_text.map((text) => text.plain_text);

  return (
    <SyntaxHighlighter
      language={language}
      showLineNumbers
      customStyle={{ backgroundColor: "var(--gray-2)" }}
      CodeTag={Code}
      // eslint-disable-next-line
      // @ts-ignore
      codeTagProps={{ variant: "ghost", color: "gray", highContrast: true }}
      style={theme === "dark" ? nord : atomOneLight}
      lineNumberStyle={{ color: "var(--gray-8)" }}
    >
      {codeText[0]}
    </SyntaxHighlighter>
  );
}

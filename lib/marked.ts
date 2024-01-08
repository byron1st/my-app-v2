import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export type ToCItem = {
  level: number;
  text: string;
  anchor: string;
};

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export async function convertMarkdownToHTML(
  text: string,
): Promise<{ html: string; toc: ToCItem[] }> {
  const toc: ToCItem[] = [];
  const parsedText = await marked(toc).parse(text);
  const html = purify.sanitize(parsedText);

  return { html, toc };
}

const extension = markedHighlight({
  langPrefix: "hljs language-",
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
});

function marked(toc: ToCItem[]): Marked {
  if (extension.renderer) {
    extension.renderer.heading = (text, level) => {
      const anchor = `toc-${toc.length}`;

      toc.push({ level, text, anchor });
      return `<h${level} id="${anchor}">${text}</h${level}>`;
    };
  }

  return new Marked(extension);
}

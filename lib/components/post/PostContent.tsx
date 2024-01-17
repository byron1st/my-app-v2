"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import go from "highlight.js/lib/languages/go";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("go", go);

export default function PostContent({ html }: { html: string }) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
  );
}

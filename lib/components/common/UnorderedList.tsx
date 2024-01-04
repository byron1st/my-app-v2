import React from "react";

export default function UnorderedList({
  children,
  paddingInlineStart,
}: {
  children: React.ReactNode;
  paddingInlineStart?: string;
}) {
  return (
    <ul
      style={{
        paddingInlineStart: paddingInlineStart ?? "18px",
        marginBlockStart: "0px",
        marginBlockEnd: "0px",
      }}
    >
      {children}
    </ul>
  );
}

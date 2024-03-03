import { Link } from "@radix-ui/themes";

export default function PostTag({
  tag,
  select,
  variant = "default",
}: {
  tag: string;
  select: (tag: string) => void;
  variant?: "default" | "primary";
}) {
  const onClick = () => select(tag);

  return (
    <Link
      mr="1"
      size="1"
      color={variant === "primary" ? "blue" : "gray"}
      underline="always"
      onClick={onClick}
    >
      #{tag}
    </Link>
  );
}

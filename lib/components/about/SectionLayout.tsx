import { Flex, Heading } from "@radix-ui/themes";

export default function SectionLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column">
      <Heading mb="2">{title}</Heading>
      {children}
    </Flex>
  );
}

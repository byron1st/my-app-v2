import { Flex, Heading } from "@radix-ui/themes";
import Menus from "@/lib/components/home/Menus";

export default function Home() {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      style={{ height: "calc(100vh - 16px - 40px - 32px)" }}
    >
      <Heading mb="4">{`Hwi's Homepage`}</Heading>

      <Menus />
    </Flex>
  );
}

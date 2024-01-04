import { Container, Flex, Heading } from "@radix-ui/themes";
import Menus from "@/lib/components/home/Menus";

export default function Home() {
  return (
    <Container size="1">
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={{ height: "calc(100vh - 16px - 40px)" }}
      >
        <Heading mb="4">{`Hwi's Homepage`}</Heading>

        <Menus />
      </Flex>
    </Container>
  );
}

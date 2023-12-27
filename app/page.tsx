import { Container, Flex, Heading } from "@radix-ui/themes";
import Menus from "@/app/Menus";
import ColorModeSelector from "@/app/ColorModeSelector";

export default function Home() {
  return (
    <Container size="1">
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={{ height: "100vh" }}
      >
        <Heading mb="4">{`Hwi's Homepage`}</Heading>

        <Menus />
      </Flex>

      <ColorModeSelector />
    </Container>
  );
}

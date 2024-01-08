"use client"; // Error components must be Client Components

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      width="100%"
      gap="2"
      style={{ height: "128px" }}
    >
      <Flex align="center" gap="2">
        <ExclamationTriangleIcon width={24} height={24} color="red" />
        <Heading>Failed to load a page</Heading>
      </Flex>

      <Button variant="soft" color="gray" onClick={reset}>
        Try again
      </Button>
    </Flex>
  );
}

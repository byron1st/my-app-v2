import { Flex, Separator, Text } from "@radix-ui/themes";
import styles from "@/lib/styles/typography.module.css";

export default function ProjectDetailItem({
  label,
  value,
  children,
}: {
  label: string;
  value?: string | number;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Flex gap="3">
        <Flex justify="end" shrink="0" my="1" style={{ width: "96px" }}>
          <Text size="2" weight="bold">
            {label}
          </Text>
        </Flex>

        <Flex my="1">
          {children ?? (
            <Text className={styles.keepall} size="2">
              {value}
            </Text>
          )}
        </Flex>
      </Flex>
      <Separator size="4" />
    </>
  );
}

import { Project } from "@/lib/types";
import { Flex, Heading, Text } from "@radix-ui/themes";
import styles from "@/lib/styles/typography.module.css";

export default function ProjectHeader({ project }: { project: Project }) {
  return (
    <Flex direction="column" mb="4">
      <Heading>{project.title}</Heading>
      <Text className={styles.keepall} color="gray" trim="start">
        {project.description}
      </Text>
    </Flex>
  );
}

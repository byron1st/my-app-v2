import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default function ImageBlock({
  block,
  width,
}: {
  block: ImageBlockObjectResponse;
  width: number;
}) {
  return (
    <img
      src={
        block.image.type === "file"
          ? block.image.file.url
          : block.image.external.url
      }
      width={width}
      alt="Image"
    />
  );
}

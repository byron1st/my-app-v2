import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import dayjs from "dayjs";

export function getTitle(page: PageObjectResponse): string {
  const nameProp = page.properties["Name"];
  if (!nameProp) return "";
  if (nameProp.type !== "title") return "";
  if (nameProp.title.length === 0) return "";

  return nameProp.title[0].plain_text;
}

export function getPublishedDate(page: PageObjectResponse): string {
  const publishedDateProp = page.properties["PublishedDate"];
  if (!publishedDateProp) return "";
  if (publishedDateProp.type !== "date") return "";
  if (!publishedDateProp.date?.start) return "";

  return dayjs(publishedDateProp.date.start).format("YYYY/MM/DD");
}

export function checkIfShortPost(page: PageObjectResponse): boolean {
  const kindProp = page.properties["Kind"];
  if (!kindProp) return false;
  if (kindProp.type !== "select") return false;
  if (!kindProp.select?.name) return false;

  return kindProp.select.name === "Short";
}

export function getTags(
  page: PageObjectResponse,
): { name: string; id: string }[] {
  const tagsProp = page.properties["Tags"];
  if (!tagsProp) return [];
  if (tagsProp.type !== "multi_select") return [];
  if (tagsProp.multi_select?.length === 0) return [];

  return tagsProp.multi_select.map((select) => ({
    name: select.name,
    id: select.id,
  }));
}

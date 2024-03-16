'use server'

import { newUuid } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import { getAllFilters } from "@/services/forum/filter/TextFilterService";
import { CreateThread } from "@/services/forum/thread/ThreadService";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function createThread(formData: FormData, forumId: string) {
  'use server'
  
  const session = await getSession();
  const body = formData.get("body")?.toString() || "";
  const image: File | null = formData.get("thumbnail") as unknown as File;
  const title = formData.get("title")?.toString() || "";
  const filters = (await getAllFilters())[0] || [];

  for (let filter of filters) {
    if (body.includes(filter.filter))
      return "Body did not pass filter test";

    if (title.includes(filter.filter))
      return "Title did not pass filter test";
  }

  const bytes = await image.arrayBuffer();

  if (bytes.byteLength > 3*1024*1024)
    return "Image is larger than 3MB"

  const id = newUuid();

  const buffer = Buffer.from(bytes);
  const path = join(process.cwd(), "/public/img/thread/" + id + "." + image.type.split("/")[1]);
  await writeFile(path, buffer);

  const author = session.uuid;

  await CreateThread(id, title, body, forumId, author)
}

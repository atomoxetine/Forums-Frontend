'use server'

import { newUuid } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import { getAllFilters } from "@/services/forum/filter/TextFilterService";
import { GetForum } from "@/services/forum/forum/ForumService";
import { CreateThread } from "@/services/forum/thread/ThreadService";
import { writeFile } from "fs/promises";
import { join } from "path";
import { getAuthorInfo } from "../../Utils";
import { canUseForum } from "@/services/forum/account/AccountService";

export async function createThread(formData: FormData, forumId: string) {
  'use server'

  const session = await getSession();
  if (!session)
    return "Not logged in"
  const forum = (await GetForum(forumId))[0]
  if (!forum)
    return "Forum not found"
  const user = await getAuthorInfo(session.uuid);
  if (forum.locked && !user?.rank?.staff)
    return "Pemission denied"
  if (!(await canUseForum(session.uuid)) && !user?.rank?.staff)
    return "Permission denied"

  const body = formData.get("body")?.toString() || "";
  if (body == "")
    return "Thread body cannot be empty"

  const image: File | null = formData.get("thumbnail") as unknown as File;
  const title = formData.get("title")?.toString() || "";
  if (title == "")
    return "Thread title cannot be empty"

  const filters = (await getAllFilters())[0] || [];

  for (let filter of filters) {
    if (body.includes(filter.filter))
      return "Body did not pass filter test";

    if (title.includes(filter.filter))
      return "Title did not pass filter test";
  }

  const id = newUuid();

  if (image && forum.name == "Announcements") {
    const bytes = await image.arrayBuffer();

    if (bytes.byteLength > 3 * 1024 * 1024)
      return "Image is larger than 3MB"

    if (bytes.byteLength < 2 * 1024)
      return "Image is too small"

    const buffer = Buffer.from(bytes);
    const path = join(process.cwd(), "/public/img/thread/" + id + "." + image.type.split("/")[1]);
    await writeFile(path, buffer);

  }

  const author = session.uuid;
  await CreateThread(id, title, body, forumId, author)
}

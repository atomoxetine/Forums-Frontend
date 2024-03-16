'use server'

import { isResultError, newUuid } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import { getHighestRank } from "@/services/controller/GrantService";
import { DeleteForum, EditForum, GetForum } from "@/services/forum/forum/ForumService";

export async function lockForum(formData: FormData): Promise<string | undefined> {

  const session = await getSession();
  if (!session)
    return "Not logged in";
  const rank = await getHighestRank(session.uuid);
  const isStaff = rank?.staff || false;
  if (!isStaff)
    return "Permission denied";

  const id = formData.get("forumId");
  if (!id)
    return "Forum not selected"

  const forum = (await GetForum(id.toString()))[0]
  if (!forum)
    return "Forum not found"

  forum.locked = true
  const res = await EditForum(forum);

  if (isResultError(res))
    return res[2] || res[1].toFixed();
}


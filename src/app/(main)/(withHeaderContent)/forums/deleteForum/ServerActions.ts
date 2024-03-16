'use server'

import { isResultError, newUuid } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import { getHighestRank } from "@/services/controller/GrantService";
import { DeleteForum } from "@/services/forum/forum/ForumService";
import { DeleteThread, GetForumThreads } from "@/services/forum/thread/ThreadService";

export async function deleteForum(formData: FormData): Promise<string | undefined> {

  const session = await getSession();
  if (!session) return "Not logged in";
  const rank = await getHighestRank(session.uuid);
  const isStaff = rank?.staff || false;

  if (!isStaff) return "Permission denied";

  const id = formData.get("forumId");

  if (!id)
    return "Forum not selected"

  const threads = (await GetForumThreads(id.toString()))[0] || []

  for(let t of threads) {
    await DeleteThread(t._id);
  }

  const res = await DeleteForum(id.toString());

  if (isResultError(res))
    return res[2] || res[1].toFixed();
}


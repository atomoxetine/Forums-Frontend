'use server'

import { isResultError, newUuid } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import { getHighestRank } from "@/services/controller/GrantService";
import { DeleteForum } from "@/services/forum/forum/ForumService";

export async function deleteForum(formData: FormData): Promise<string | undefined> {

  const session = await getSession();
  if (!session) return "Not logged in";
  const rank = await getHighestRank(session.uuid);
  const isStaff = rank?.staff || false;

  if (!isStaff) return "Permission denied";

  const id = formData.get("forumId");

  if (!id)
    return "Forum not selected"

  const res = await DeleteForum(id.toString());

  if (isResultError(res))
    return res[2] || res[1].toFixed();
}


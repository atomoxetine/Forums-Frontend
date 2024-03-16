'use server'

import { isResultError } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import { getHighestRank } from "@/services/controller/GrantService";
import { canUseForum } from "@/services/forum/account/AccountService";
import { DeleteThread, EditThread, GetThread } from "@/services/forum/thread/ThreadService";
import { existsSync } from "fs";
import { rm } from "fs/promises";

export async function deleteThreadHard(threadId: string): Promise<string | undefined> {
  'use server'
  
  const session = await getSession();
  if (!session) return "Not logged in";
  const rank = await getHighestRank(session.uuid);
  const isStaff = rank?.staff || false;

  if (!isStaff && !(await canUseForum(session.uuid))) return "Permission denied";

  const res = await DeleteThread(threadId);

  if (isResultError(res))
    return res[2] || res[1].toFixed();

}



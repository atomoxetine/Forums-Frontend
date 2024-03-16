'use server'

import { isResultError } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import { getHighestRank } from "@/services/controller/GrantService";
import { DeleteThread, EditThread, GetThread } from "@/services/forum/thread/ThreadService";

export async function lockThread(threadId: string): Promise<string | undefined> {
  'use server'

  const thread = (await GetThread(threadId))[0]
  if (!thread) return "Thread not found"
  
  const session = await getSession();
  if (!session) return "Not logged in";
  const rank = await getHighestRank(session.uuid);
  const isStaff = rank?.staff || false;

  if (!isStaff) return "Permission denied";

  thread.locked = true;
  const res = await EditThread(thread);

  if (isResultError(res))
    return res[2] || res[1].toFixed();
}



'use server'

import { isResultError, newUuid } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import { getHighestRank } from "@/services/controller/GrantService";
import { CreateForumCategory, DeleteForumCategory, GetForumCategories } from "@/services/forum/category/CategoryService";
import { DeleteThread, GetForumThreads } from "@/services/forum/thread/ThreadService";

export async function deleteCategory(formData: FormData): Promise<string | undefined> {

  const session = await getSession();
  if (!session) return "Not logged in";
  const rank = await getHighestRank(session.uuid);
  const isStaff = rank?.staff || false;

  if (!isStaff) return "Permission denied";

  const id = formData.get("id");

  if (!id)
    return "Category not selected"

  const categories = (await GetForumCategories())[0] || [];
  const category = categories.find(c => c._id = id.toString());
  if (!category)
    return "Category not found"

  const forums = category.forums;

  for (let f of forums) {
    const threads = (await GetForumThreads(f._id))[0] || []

    for(let t of threads) {
      await DeleteThread(t._id);
    }

  }

  const res = await DeleteForumCategory(id.toString());

  if (isResultError(res))
    return res[2] || res[1].toFixed();
}


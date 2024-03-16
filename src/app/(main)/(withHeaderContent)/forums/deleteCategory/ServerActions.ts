'use server'

import { isResultError, newUuid } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import { getHighestRank } from "@/services/controller/GrantService";
import { CreateForumCategory, DeleteForumCategory } from "@/services/forum/category/CategoryService";

export async function deleteCategory(formData: FormData): Promise<string | undefined> {

  const session = await getSession();
  if (!session) return "Not logged in";
  const rank = await getHighestRank(session.uuid);
  const isStaff = rank?.staff || false;

  if (!isStaff) return "Permission denied";

  const id = formData.get("id");

  if (!id)
    return "Category not selected"

  const res = await DeleteForumCategory(id.toString());

  if (isResultError(res))
    return res[2] || res[1].toFixed();
}


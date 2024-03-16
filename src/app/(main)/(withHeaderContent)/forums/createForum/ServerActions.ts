'use server'

import { isResultError, newUuid } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import Forum from "@/libs/types/entities/Forum";
import { getHighestRank } from "@/services/controller/GrantService";
import { CreateForumCategory, GetForumCategories } from "@/services/forum/category/CategoryService";
import { CreateForum } from "@/services/forum/forum/ForumService";

export async function createForum(formData: FormData): Promise<string | undefined> {

  const session = await getSession();
  if (!session) return "Not logged in";
  const rank = await getHighestRank(session.uuid);
  const isStaff = rank?.staff || false;

  if (!isStaff) return "Permission denied";

  const nameEntry = formData.get("name");
  const descEntry = formData.get("description");
  const weightEntry = formData.get("weight");
  const locked = formData.get("locked")?.toString() == "on" || false;
  const categoryEntry = formData.get("category");

  if (!nameEntry)
    return "Name cannot be empty"

  if (!weightEntry)
    return "Weight cannot be empty"

  if (!descEntry)
    return "Description cannot be empty"

  if (!categoryEntry)
    return "Category is not selected"

  const categoryId = categoryEntry.toString();

  const category = ((await GetForumCategories())[0] || []).find(c => c._id == categoryId)!;

  const req: Forum = {
    _id: newUuid(),
    name: nameEntry.toString(),
    description: descEntry.toString(),
    weight: Number(weightEntry.toString()),
    locked: locked,
    category: categoryId,
    categoryName: category.name,
    categoryWeight: category.weight,
    threadAmount: 0,
  }

  const res = await CreateForum(req);

  if (isResultError(res))
    return res[2] || res[1].toFixed();
}


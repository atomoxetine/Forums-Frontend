'use server'

import { isResultError, newUuid } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import { getHighestRank } from "@/services/controller/GrantService";
import { CreateForumCategory } from "@/services/forum/category/CategoryService";

export async function createCategory(formData: FormData): Promise<string | undefined> {

  const session = await getSession();
  if (!session) return "Not logged in";
  const rank = await getHighestRank(session.uuid);
  const isStaff = rank?.staff || false;

  if (!isStaff) return "Permission denied";

  const nameEntry = formData.get("name");
  const weightEntry = formData.get("weight");

  if (!nameEntry)
    return "Name cannot be empty"

  if (!weightEntry)
    return "Weight cannot be empty"

  const name = nameEntry.toString();
  const weight = Number(weightEntry.toString());
  const id = newUuid();

  const res = await CreateForumCategory(id, name, weight);

  if (isResultError(res))
    return res[2] || res[1].toFixed();
}

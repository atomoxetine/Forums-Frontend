import getSession from "@/libs/session/getSession";
import { getHighestRank } from "@/services/controller/GrantService";
import { redirect } from "next/navigation";
import { GetForumCategories } from "@/services/forum/category/CategoryService";
import DeleteForumForm from "./DeleteForumForm";


export default async function Page() {
  const session = await getSession();
  const rank = await getHighestRank(session.uuid);
  if (!rank?.staff) {
    redirect("/forums");
  }

  const categories = (await GetForumCategories())[0] || [];

  return <div className="bg-base-200 flex flex-col gap-2 py-4 px-6 rounded-lg w-[40%]">
    <h1>Delete Forum</h1>
    <hr />
    <DeleteForumForm categories={categories} />
  </div>
}


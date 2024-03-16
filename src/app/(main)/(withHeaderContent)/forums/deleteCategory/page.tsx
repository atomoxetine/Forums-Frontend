import getSession from "@/libs/session/getSession";
import { getHighestRank } from "@/services/controller/GrantService";
import { redirect } from "next/navigation";
import DeleteCategoryForm from "./DeleteCategoryForm";
import { GetForumCategories } from "@/services/forum/category/CategoryService";


export default async function Page() {
  const session = await getSession();
  const rank = await getHighestRank(session.uuid);
  if (!rank?.staff) {
    redirect("/forums");
  }

  const categories = (await GetForumCategories())[0] || [];

  return <div className="bg-base-200 flex flex-col gap-2 py-4 px-6 rounded-lg w-[40%]">
    <h1>Delete Category</h1>
    <hr />
    <DeleteCategoryForm categories={categories} />
  </div>
}

import getSession from "@/libs/session/getSession";
import { getHighestRank } from "@/services/controller/GrantService";
import { redirect } from "next/navigation";
import CreateCategoryForm from "./CreateCategoryForm";


export default async function Page() {
  const session = await getSession();
  const rank = await getHighestRank(session.uuid);
  if (!rank?.staff) {
    redirect("/forums");
  }

  return <div className="bg-base-200 flex flex-col gap-2 py-4 px-6 rounded-lg w-[40%]">
    <h1>Create Category</h1>
    <hr />
    <CreateCategoryForm />
  </div>
}

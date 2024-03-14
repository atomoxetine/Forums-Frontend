import getSession from "@/libs/session/getSession";
import { GetActiveRanks } from "@/services/controller/GrantService";
import { redirect } from "next/navigation";


export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession();
  if (!((await GetActiveRanks(session.uuid))[0] || []).find(r => r.staff)) {
    redirect("/");
  }

  return <>{children}</>
}

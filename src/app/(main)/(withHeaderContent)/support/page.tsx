import getSession from "@/libs/session/getSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return redirect("/auth/login");
  }

  redirect('/support/1');
}


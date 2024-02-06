import { redirect } from "next/navigation";
import getSession from "@/libs/session/getSession";

export default async function Redirect() {
  const session = await getSession();
  redirect(`/u/${session.username}`);
}
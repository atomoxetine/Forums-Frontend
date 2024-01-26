import { redirect } from "next/navigation";
import getSession from "@/libs/session/getSession";

/**
  Hooks into the session variable via getSession, checking if the user is logged in.
  If user is logged in, it redirects the user to their respective URL '/u/username'.
  If not, it simply navigates to homepage ('/').
*/
export default async function UserPageRedirect() {
  const session =  await getSession();
  redirect('/' + (session?.isLoggedIn ? `u/${session.username}` : ''));
}
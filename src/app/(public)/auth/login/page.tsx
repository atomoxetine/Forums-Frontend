import { getSession } from "@/libs/session/iron";
import { Input, SubmitButton } from "./input";
import { Login } from "@/services/forum/account/AccountService";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();
  if (session.isLoggedIn) redirect('/');

  return (
    <form action={Login}>
      <label className="block text-lg">
        <span>User</span>
        <Input isUsername={true}/>
      </label>
      <label className="block text-lg">
        <span>Password</span>
        <Input />
      </label>
      <div>
        <SubmitButton value="Login" />
      </div>
    </form>
  );
}
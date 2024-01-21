import { getSession } from "../../../libs/session/iron";
import { Input, SubmitButton } from "./input";
import { Login } from "@/services/GeneralService";

export default async function AppRouter() {
  const session = await getSession();

  if (session.isLoggedIn) {
    return <>
      <p className="text-lg">
        Logged in user: <strong>{session.username}</strong>
      </p>
      <form action={async () => { "use server"; (await getSession()).destroy() }}>
        <div>
          <SubmitButton value="Logout" />
        </div>
      </form>
    </>;
  }

  return (
    <form action={Login}>
      <label className="block text-lg">
        <span>Username</span>
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
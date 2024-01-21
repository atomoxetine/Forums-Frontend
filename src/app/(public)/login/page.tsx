import React from "react";
import { revalidatePath } from "next/cache";
import { getSession } from "../../../libs/session/iron";
import HTTPClient from "../../../libs/HTTPClient";
import { Input, SubmitButton } from "./input";
import { redirect } from "next/navigation";

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
    <form action={login}>
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

export async function login(formData: FormData) {
  "use server";

  // Gets form data
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const uri = `/forum/account/login/${username}?` + new URLSearchParams({ password: password });

  // Authenticates with the API
  let response: {[key: string]: string} = {};
  try {
    const client = new HTTPClient(process.env.API_URL!);
    const res = await client.GetAsync(uri);
    if (res.ok)
      response = await (res).json();
    else
      throw new Error();
  } catch {
    return "An error has occurred while contacting the server. Please, try again later.";
  }
  if (!response.passwordCorrect)
    return "Wrong password";
  
  // Caches session
  const session = await getSession();
  session.username = username;
  session.uuid = response.uuid;
  session.email = response.email;
  session.isLoggedIn = true;
  await session.save();

  // Returns
  revalidatePath("/login");
  redirect(`/`);
}
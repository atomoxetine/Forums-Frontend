'use server';

import HTTPClient from "@/libs/HTTPClient";
import { getSession } from "@/libs/session/iron";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const IsApiWorking = async () => {
  const client = new HTTPClient(process.env.API_URL!);
  return (await (await client.GetAsync('/istheapiworking')).json())['message'] === 'yes!';
}

export const Login = async (formData: FormData) => {
  "use server";

  // Gets form data
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const uri = `/forum/account/login/${username}?` + new URLSearchParams({ password: password });

  // Authenticates with the API
  let response: {[key: string]: string} = {};
  try {
    const client = new HTTPClient(process.env.API_URL!);
    response = await (await client.GetAsync(uri)).json();
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
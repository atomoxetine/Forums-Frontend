'use server';

import HTTPClient from "@/libs/HTTPClient";
import { getSession } from "@/libs/session/iron";
import Account from "@/libs/types/Account";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GetProfileFromUuid } from "./ProfileService"

export const Login = async (formData: FormData, client?: HTTPClient) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const uri = `/forum/account/login/${username}?` + new URLSearchParams({ password: password });

  client ??= new HTTPClient(process.env.API_URL!);
  const response = await (await client.GetAsync(uri)).json();

  if (!response.passwordCorrect)
    return "Wrong password";
  
  const session = await getSession();
  session.username = username;
  session.uuid = response.uuid;
  session.email = response.email;
  session.isLoggedIn = true;
  await session.save();

  revalidatePath("/login");
  redirect(`/`);
}

export const GetUserFromEmail = async (email: string, client?: HTTPClient): Promise<[Account | null, string]> => {
  const uri = `/forum/account/email/${email}`;

  client ??= new HTTPClient(process.env.API_URL!);
  const response = await (await client.GetAsync(uri)).json();
  if (!response._id)
    return [null, 'User not found'];
  
  return [response as unknown as Account, 'Success'];
}

export const Register = async (formData: FormData): Promise<[boolean, string]> => {
  const token = formData.get("token") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const uri = `/forum/account/register`;

  const client = new HTTPClient(process.env.API_URL!);
  const response = await client.PostAsync(uri, { token, password });
  if (response.status === 404)
    return [false, (await response.json()).message];
  else if (response.status !== 201) {
    const message = (await response.json()).message;
    console.warn(`Error when registering user: HTTP ${response.status} - ${message}`);
    return [false, 'An unexpected error has occurred while contacting the server'];
  }
  
  const [user] = await GetUserFromEmail(email, client);
  if (user) {
    const [profile] = await GetProfileFromUuid(user._id, client);
    if (profile) {
      const session = await getSession();
      session.username = profile.name;
      session.uuid = user._id;
      session.email = email;
      session.isLoggedIn = true;
      await session.save();
      
      revalidatePath("/login");
      redirect(`/`);
    }
  }

  return [true, 'Success (but failed to log user in)'];
}
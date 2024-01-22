'use server';

import HTTPClient from "@/libs/HTTPClient";
import { getSession } from "@/libs/session/iron";
import Account from "@/libs/types/Account";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GetProfileFromUuid } from "../../controller/ProfileService"

/**
 * Endpoint for retrieving forum threads associated with a player.
 *
 * @param uuid The UUID of the player.
 * @return ResponseEntity containing a JSON array of forum threads.
 */
// In the API: @GetMapping(path = "/forum/account/threads/{uuid}")


/**
 * Endpoint for retrieving Account data from Email.
 *
 * @param email The Email of the player.
 * @return ResponseEntity containing the user's Account data.
 */
// In the API: @GetMapping(path = "/forum/account/threads/{uuid}")
export const GetAccountFromEmail = async (email: string, client?: HTTPClient): Promise<[Account | null, string]> => {
  const uri = `/forum/account/email/${email}`;

  client ??= new HTTPClient(process.env.API_URL!);
  const response = await (await client.GetAsync(uri)).json();
  if (!response._id)
    return [null, 'User not found'];
  
  return [response as unknown as Account, 'Success'];
}

/**
 * Endpoint for completing the registration process by setting the account password.
 *
 * @param body The JSON object containing the password and token.
 * @return ResponseEntity indicating the result of the registration completion.
 */
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
  
  const [user] = await GetAccountFromEmail(email, client);
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

/**
 * Endpoint for handling login requests.
 *
 * @param username The username or email for login.
 * @return ResponseEntity containing the account information for successful logins.
 */
// In the API: @GetMapping(path = "/forum/account/login/{username}")
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

/**
 * Endpoint for updating account settings.
 *
 * @param body (type: any) The JSON object containing updated settings.
 * @param uuid The UUID of the player.
 * @return ResponseEntity containing the updated account information.
 */
// In the API: @PutMapping(path = "/forum/account/setting/{uuid}")


/**
 * Endpoint for forgot password.
 *
 * @param email The email of the player.
 * @return ResponseEntity containing the updated account information or an error message.
 */
// In the API: @PostMapping(path = "/forum/account/forgotPassword/{email}")


/**
 * Endpoint for updating account password.
 *
 * @param body (type: { password: string, currentPassword: string }) The JSON object containing the current and new password.
 * @param uuid The UUID of the player.
 * @return ResponseEntity containing the updated account information or an error message.
 */
// In the API: @PutMapping(path = "/forum/account/password/{uuid}")
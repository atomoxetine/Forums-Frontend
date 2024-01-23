'use server';

import HTTPClient from "@/libs/HTTPClient";
import getSession from "@/libs/session/getSession";
import Account from "@/libs/types/entities/Account";
import { GetProfileFromUuid } from "../../controller/ProfileService"
import { SessionData } from "@/libs/session/iron";

/**
 * Endpoint for retrieving forum threads associated with a player.
 *
 * @param uuid The UUID of the player.
 * @return ResponseEntity containing a JSON array of forum threads.
 */
// In the API: @GetMapping(path = "/forum/account/threads/{uuid}")
// TODO

/**
 * Endpoint for retrieving Account data from Email.
 *
 * @param email The Email of the player.
 * @return ResponseEntity containing the user's Account data.
 */
// In the API: @GetMapping(path = "/forum/account/threads/{uuid}")
export const GetAccountFromEmail = async (email: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Account>(`/forum/account/email/${email}`);

/**
 * Endpoint for updating account settings.
 *
 * @param body (type: any) The JSON object containing updated settings.
 * @param uuid The UUID of the player.
 * @return ResponseEntity containing the updated account information.
 */
// In the API: @PutMapping(path = "/forum/account/setting/{uuid}")
export const UpdateAccountSettings = async (formData: FormData, client: HTTPClient = new HTTPClient(process.env.API_URL!)) => {
  const uuid = formData.get("uuid") as string;
  const jso = formData.toJSO(); delete jso['uuid'];
  const uri = `/forum/account/setting/${uuid}`;

  return await client.PutAsync<Account>(uri, jso);
}


/**
 * Endpoint for forgot password.
 *
 * @param email The email of the player.
 * @return ResponseEntity containing the updated account information or an error message.
 */
// In the API: @PostMapping(path = "/forum/account/forgotPassword/{email}")
export const ForgotPassword = async (email: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) => 
  await client.PostAsync(`/forum/account/forgotPassword/${email}`);

/**
 * Endpoint for updating account password.
 *
 * @param body (type: { password: string, currentPassword: string }) The JSON object containing the current and new password.
 * @param uuid The UUID of the player.
 * @return ResponseEntity containing the updated account information or an error message.
 */
// In the API: @PutMapping(path = "/forum/account/password/{uuid}")
export const UpdateAccountPassword = async (formData: FormData, client: HTTPClient = new HTTPClient(process.env.API_URL!)) => {
  const uuid = formData.get("uuid") as string;
  const jso = formData.toJSO(); delete jso['uuid'];
  const uri = `/forum/account/password/${uuid}`;

  return await client.PutAsync<Account>(uri, jso);
}

/**
 * Endpoint for completing the registration process by setting the account password.
 *
 * @param body The JSON object containing the password and token.
 * @return ResponseEntity indicating the result of the registration completion.
 */
export const Register = async (formData: FormData, client: HTTPClient = new HTTPClient(process.env.API_URL!)): Promise<[SessionData | null, number, string | null]> => {
  const token = formData.get("token") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const uri = `/forum/account/register`;

  const response = await client.PostAsync(uri, { token, password });
  if (!response[0])
    return response;
  
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
      
      return [{
        username: session.username,
        uuid: session.uuid,
        email: session.email,
        isLoggedIn: session.isLoggedIn
      }, response[1], response[2]];
    }
  }

  return [null, response[1], 'Success (but failed to log user in)'];
}

/**
 * Endpoint for handling login requests.
 *
 * @param username The username or email for login.
 * @return ResponseEntity containing the account information for successful logins.
 */
// In the API: @GetMapping(path = "/forum/account/login/{username}")
export const Login = async (formData: FormData, client: HTTPClient = new HTTPClient(process.env.API_URL!)): Promise<[SessionData, number, string | null]> => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const uri = `/forum/account/login/${username}?` + new URLSearchParams({ password: password });

  const response = await client.GetAsync(uri);
  if (!response[0])
    return response;
  
  const data = response[0];
  if (data.passwordCorrect) {
    const session = await getSession();
    const uuid = data.uuid;

    const [profile] = await GetProfileFromUuid(uuid, client);
    session.username = profile ? profile.name : username;
    session.uuid = uuid;
    session.email = data.email;
    session.isLoggedIn = true;
    await session.save();

    return [{
      username: session.username,
      uuid: session.uuid,
      email: session.email,
      isLoggedIn: session.isLoggedIn
    }, response[1], response[2]];
  }

  return [data, response[1], "Passwords don't match"];
}
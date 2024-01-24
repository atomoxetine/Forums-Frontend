'use server';

import HTTPClient from "@/libs/HTTPClient";
import getSession from "@/libs/session/getSession";
import Account from "@/libs/types/entities/Account";
import { SessionData } from "@/libs/session/iron";

// Variables
const baseEndpoint = "/forum/account";
const interceptSession = 
  (method: any): (body: any) => Promise<[SessionData | null, number, string | null]> =>
    async (body: any) => {
      const result = await method(body);

      if (!result[0]) return result;

      const session = await getSession();
      session.username = result[0].username;
      session.uuid = result[0].uuid;
      session.email = result[0].email;
      session.isLoggedIn = true;
      await session.save();
      
      return [{
        ...result[0],
        isLoggedIn: session.isLoggedIn
      }, result[1], result[2]];
    };

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
 * @param client
 * @return ResponseEntity containing the user's Account data.
 */
// In the API: @GetMapping(path = "/forum/account/threads/{uuid}")
export const GetAccountFromEmail = async (email: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Account>(`${baseEndpoint}/email/${email}`);

/**
 * Endpoint for updating account settings.
 *
 * @return ResponseEntity containing the updated account information.
 * @param data
 * @param client
 */
// In the API: @PutMapping(path = "/forum/account/setting/{uuid}")
export const UpdateAccountSettings = async (
  data: { uuid?: string, body: any },
  client: HTTPClient = new HTTPClient(process.env.API_URL!)
) => await client.PutAsync<Account>(`${baseEndpoint}/setting/${data.uuid}`, data.body);

/**
 * Endpoint for forgot password.
 *
 * @param email The email of the player.
 * @param client
 * @return ResponseEntity containing the updated account information or an error message.
 */
// In the API: @PostMapping(path = "/forum/account/forgotPassword/{email}")
export const ForgotPassword = async (email: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) => 
  await client.PostAsync(`${baseEndpoint}/forgotPassword/${email}`);

/**
 * Endpoint for updating account password.
 *
 * @return ResponseEntity containing the updated account information or an error message.
 * @param data
 * @param client
 */
// In the API: @PutMapping(path = "/forum/account/password/{uuid}")
export const UpdateAccountPassword = async (
  data: { uuid?: string, body: { password: string, currentPassword: string } },
  client: HTTPClient = new HTTPClient(process.env.API_URL!)
) => await client.PutAsync<Account>(`${baseEndpoint}/password/${data.uuid}`, data.body);

/**
 * Endpoint for completing the registration process by setting the account password.
 *
 * @param body The JSON object containing the password and token.
 * @return ResponseEntity indicating the result of the registration completion.
 */
export const Register = interceptSession(async (
  data: { token: string, password: string },
  client: HTTPClient = new HTTPClient(process.env.API_URL!)
): Promise<[SessionData | null, number, string | null]> =>
  await client.PostAsync(`${baseEndpoint}/register`, data)
);

/**
 * Endpoint for completing the registration process by setting the account password.
 *
 * @param body The JSON object containing the password and token.
 * @return ResponseEntity indicating the result of the registration completion.
 */
export const Reset = interceptSession(async (
  data: { token: string, newPassword: string },
  client: HTTPClient = new HTTPClient(process.env.API_URL!)
): Promise<[SessionData | null, number, string | null]> =>
  await client.PutAsync(`${baseEndpoint}/resetPassword`, data)
);

/**
 * Endpoint for handling login requests.
 *
 * @param username The username or email for login.
 * @return ResponseEntity containing the account information for successful logins.
 */
// In the API: @GetMapping(path = "/forum/account/login/{username}")
export const Login = interceptSession(async (
  data: { username: string, password: string },
  client: HTTPClient = new HTTPClient(process.env.API_URL!)
): Promise<[SessionData | null, number, string | null]> =>
  await client.GetAsync(`${baseEndpoint}/login/${data.username}?` + new URLSearchParams({ password: data.password }))
);
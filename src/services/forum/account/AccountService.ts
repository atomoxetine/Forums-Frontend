'use server';

import HTTPClient from "@/libs/HTTPClient";
import getSession from "@/libs/session/getSession";
import Account from "@/libs/types/entities/Account";
import { SessionData } from "@/libs/session/iron";
import { getPunishments } from "../punishment/PunishmentService";

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

export const UpdateAccountEmail = async (
  data: { uuid?: string, body: { password: string, email: string } },
  client: HTTPClient = new HTTPClient(process.env.API_URL!)
) => await client.PutAsync<Account>(`${baseEndpoint}/email/${data.uuid}`, data.body);

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


/**
  * Endpoint for retrieving a list of the user's friends
  * @param uuid The user's UUID
  * @return An array of the friends' accounts
  */
export const GetFriends = async (uuid: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Account[]>(`${baseEndpoint}/friends/${uuid}`);


/**
  * Endpoint for retrieving all staff users
  *
  * @return An array of objects containing player and rank uuids
  */
export const getStaffUsers = async (client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<{ playerUuid: string, rankUuid: string }[]>(`/staff/users`);


export const getAccountFromUuid = async (uuid: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Account>(`/forum/account/uuid/${uuid}`);


/**
  * Gets player uuid from username from mojang api or playerdb api
  * @param username The user name
  * @return the uuid or null
  */
export const getUuid = async (username: string) => {
  let uuid = null;

  // Mojang API disabled because it was returing trimmed UUIDs

  try {
    uuid = await fetch(`https://playerdb.co/api/player/minecraft/${username}`)
      .then(res => res?.json())
      .then(res => res?.data?.player?.id);
  } catch { /* Do nothing */ }

  return uuid;
}

export const getUsernameFromUuid = async (uuid: string): Promise<string | null> => {
  let username = null;
  try {
    username = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
      .then(res => res?.json())
      .then(res => res?.name);
  } catch { /* Do nothing */ }

  if (!username) {
    try {
      uuid = await fetch(`https://playerdb.co/api/player/minecraft/${uuid}`)
        .then(res => res?.json())
        .then(res => res?.data?.username);
    } catch { /* Do nothing */ }
  }

  return username;
}

export const getCurrentServer = async (uuid: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)): Promise<string | undefined> =>
  await client.GetAsync<any>(`/profile/server/${uuid}`).then(res => res[0]?.displayName);


export const canUseForum = async (uuid: string) => {
  const account = (await getAccountFromUuid(uuid))[0];
  if (!account)
    return false;

  const punishments = (await getPunishments(uuid))[0] || [];
  if (punishments.filter(p => p.active).find(p =>
    p.punishmentType == "BLACKLIST"
    || p.punishmentType == "MUTE"
    || p.punishmentType == "BAN"))
    return false;

  console.log(punishments);

  return true;
}

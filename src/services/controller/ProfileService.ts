'use server';

import HTTPClient from "@/libs/HTTPClient";
import Profile from "@/libs/types/entities/Profile";

/**
 * Endpoint to retrieve information about all user profiles.
 *
 * @return ResponseEntity containing a list of Profile objects representing all profiles.
 */
// In the API: @GetMapping("/profile/all")
export const GetAllProfiles = async (client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Profile[]>(`/profile/all`);

/**
 * Endpoint to retrieve a user profile based on their UUID.
 *
 * @param uuid The UUID of the user.
 * @return ResponseEntity containing the Profile or not found status if the profile is not available.
 */
// In the API: @GetMapping("/profile/{uuid}")
export const GetProfileFromUuid = async (uuid: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Profile>(`/profile/${uuid}`);

/**
 * Endpoint to retrieve the server data for a user based on their UUID.
 *
 * @param uuid The UUID of the user.
 * @return ResponseEntity containing the ServerData or not found status if the server data is not available.
 */
// In the API: @GetMapping("/profile/server/{uuid}")
export const GetServerData = async (uuid: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync(`/profile/server/${uuid}`);

/**
 * Endpoint to retrieve the proxy information for a user based on their UUID.
 *
 * @param uuid The UUID of the user.
 * @return ResponseEntity containing the proxy information or not found status if the information is not available.
 */
// In the API: @GetMapping("/profile/proxy/{uuid}")
export const GetProxyData = async (uuid: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync(`/profile/proxy/${uuid}`);
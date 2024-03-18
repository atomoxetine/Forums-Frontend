'use server';

import HTTPClient from "@/libs/HTTPClient";
import Grant from "@/libs/types/entities/Grant";
import Rank from "@/libs/types/entities/Rank";
/**
* Asynchronous endpoint to retrieve a single rank by its UUID.
*
* @param id The UUID of the rank to be retrieved.
* @return Rank or not found status if not available.
*/
// In the API: @GetMapping("/rank/{id}")
export const GetRank = async (uuid: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Rank>(`/rank/${uuid}`);


export const getRankColor = async (uuid: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)): Promise<string> =>
  (await client.GetAsync<any>(`/rank/color/${uuid}`))[0]?.color || "#FFFFFF";


export const getGrants = async (uuid: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Grant[]>(`/grants/${uuid}`);

///**
// * Endpoint to retrieve a single grant by its UUID and convert it to a simplified form for the site.
// *
// * @param id The UUID of the grant to be retrieved.
// * @return ResponseEntity containing the GrantToSend or not found status if not available.
// */
//// In the API: @GetMapping("/grants/id/site/{id}")
//export const GetGrantToSend = async (id: string, client?: HTTPClient) => {
//    const uri = `/grants/id/site/${id}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
///**
// * Endpoint to retrieve all grants for a player based on their UUID.
// *
// * @param uuid The UUID of the player for whom grants are requested.
// * @return ResponseEntity containing a list of Grants.
// */
//// In the API: @GetMapping("/grants/{uuid}")
//export const GetGrants = async (uuid: string, client?: HTTPClient) => {
//    const uri = `/grants/${uuid}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
///**
// * Endpoint to retrieve all grants for a player and convert them to a simplified form for the site.
// *
// * @param uuid The UUID of the player for whom grants are requested.
// * @return ResponseEntity containing a list of GrantToSend objects.
// */
//// In the API: @GetMapping("/grants/site/{uuid}")
//export const GetGrantsToSend = async (uuid: string, client?: HTTPClient) => {
//    const uri = `/grants/site/${uuid}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
///**
// * Endpoint to retrieve all active grants for a player based on their UUID.
// *
// * @param uuid The UUID of the player for whom active grants are requested.
// * @return ResponseEntity containing a list of active Grants.
// */
//// In the API: @GetMapping("/grants/active/{uuid}")
//export const GetActiveGrants = async (uuid: string, client?: HTTPClient) => {
//    const uri = `/grants/active/${uuid}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
//
///**
// * Endpoint to retrieve all active grants for a player and convert them to a simplified form for the site.
// *
// * @param uuid The UUID of the player for whom active grants are requested.
// * @return ResponseEntity containing a list of active GrantToSend objects.
// */
//// In the API: @GetMapping("/grants/active/site/{uuid}")
//export const GetActiveGrantsToSend = async (uuid: string, client?: HTTPClient) => {
//    const uri = `/grants/active/site/${uuid}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//

/**
* Endpoint to retrieve all active ranks for a player based on their UUID.
*
* @param uuid The UUID of the player for whom active ranks are requested.
* @return ResponseEntity containing a list of active Ranks.
*/
// In the API: @GetMapping("/grants/active/ranks/{uuid}")
export const GetActiveRanks = async (uuid: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Rank[]>(`/grants/active/ranks/${uuid}`);

export const getHighestRank = async (uuid: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) => {
  const rank = ((await GetActiveRanks(uuid, client))[0] || [])
    .reduce<Rank>((h, crr) => crr.priority > h.priority ? crr : h, { priority: -1 } as Rank)
  
  if (rank.priority == -1)
    return undefined;

  return rank;
}

export const getRankFromName = async (name: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Rank>(`/rank/name/${name}`);

///**
// * Asynchronous endpoint to retrieve all grants issued by a player based on their UUID.
// *
// * @param uuid The UUID of the player who issued the grants.
// * @return ResponseEntity containing a list of Grants.
// */
//// In the API: @GetMapping("/grants/issuedBy/{uuid}")
//
//export const GetIssuedGrants = async (uuid: string, client?: HTTPClient) => {
//    const uri = `/grants/issuedBy/${uuid}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
///**
// * Asynchronous endpoint to retrieve all grants issued by a player and convert them to a simplified form for the site.
// *
// * @param uuid The UUID of the player who issued the grants.
// * @return ResponseEntity containing a list of GrantToSend objects.
// */
//// In the API: @GetMapping("/grants/site/issuedBy/{uuid}")
//export const GetIssuedGrantsToSend = async (uuid: string, client?: HTTPClient) => {
//    const uri = `/grants/site/issuedBy/${uuid}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
//
///**
// * Endpoint to update a grant in the database and trigger a GrantsUpdatePacket.
// *
// * @param grant The Grant object to be updated.
// * @return ResponseEntity indicating the success of the update.
// */
//// In the API: @PostMapping("/grants/update")
//export const UpdateGrant = async (formData: FormData, client?: HTTPClient) => {
//    const uri = `/grants/update`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.PostAsync(uri, formData)).json();
//
//    return response;
//    }

'use server';

import HTTPClient from "@/libs/HTTPClient";
import Profile from "@/libs/types/Profile"

export const GetProfileFromUuid = async (uuid: string, client?: HTTPClient): Promise<[Profile | null, string]> => {
  const uri = `/profile/${uuid}`;

  client ??= new HTTPClient(process.env.API_URL!);
  const response = await (await client.GetAsync(uri)).json();
  if (!response._id)
    return [null, 'Profile not found'];
  
  return [response as unknown as Profile, 'Success'] 
}
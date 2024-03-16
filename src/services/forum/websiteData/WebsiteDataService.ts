import HTTPClient from "@/libs/HTTPClient";
import WebEntry from "@/libs/types/entities/WebEntry";


export const getEntry = async (id: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  (await client.GetAsync<WebEntry>(`/websiteData/${id}`))[0]?.value;

export const getAllEntries = async(client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  (await client.GetAsync<WebEntry[]>("/websiteData"))[0] || [];

export const updateEntry = async (entry: WebEntry, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.PostAsync<void>(`/websiteData`, entry, true);

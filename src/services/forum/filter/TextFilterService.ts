import HTTPClient from "@/libs/HTTPClient";
import { TextFilter } from "@/libs/types/entities/TextFilter";


export const getAllFilters = async (client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<TextFilter[]>(`/forum/filter`);

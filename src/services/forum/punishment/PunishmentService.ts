import HTTPClient from "@/libs/HTTPClient";
import Punishment from "@/libs/types/entities/Punishment";


export const getPunishments = async (uuid: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Punishment[]>(`/punishments/${uuid}`);

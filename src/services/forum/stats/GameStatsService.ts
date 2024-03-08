import HTTPClient from "@/libs/HTTPClient";
import SkywarsStats from "@/libs/types/entities/SkywarsStats";


export const getSkywarsStats = async (uuid: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<SkywarsStats>(`/leaderboards/stats/skywars/${uuid}`);

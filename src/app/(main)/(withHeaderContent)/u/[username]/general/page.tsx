import { getUuid } from "@/services/forum/account/AccountService";
import { getSkywarsStats } from "@/services/forum/stats/GameStatsService";
import StatsWidget from "./StatsWidget";
import { SKYWARS_NICENAME } from "@/libs/types/entities/SkywarsStats";

interface Params {
  params: {
    username: string
  }
}

export default async function Page(parameters: Params) {
  const { params: { username } } = parameters;
  const uuid = await getUuid(username);

  const skywarsStats = (await getSkywarsStats(uuid))[0]!;
  const skywarsStatsArr = Object.keys(skywarsStats).reduce<string[]>(
    (acc, key) => 
      { acc.push(`${(SKYWARS_NICENAME as any)[key]}: ${(skywarsStats as any)[key]}`); return acc }, 
    []);

  return <div className="flex flex-row flex-wrap gap-5 justify-center">
    <StatsWidget title="Skywars" entries={skywarsStatsArr} backgroundImage={"/img/skywars-bg.webp"} />
    <StatsWidget title="Bedwars" entries={["No Data"]} backgroundImage={"/img/skywars-bg.webp"} />
    <StatsWidget title="Duels" entries={["No Data"]} backgroundImage={"/img/skywars-bg.webp"} />
  </div>;
}

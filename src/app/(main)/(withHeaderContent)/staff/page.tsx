import HeaderContext from "@/components/HeaderContext";
import { ServerMCHead } from "@/components/Minecraft/Server";
import { GetRank, getRankColor } from "@/services/controller/GrantService";
import { getStaffUsers, getUsernameFromUuid } from "@/services/forum/account/AccountService";
import Link from "next/link";
import React from "react";

export default async function Staff() {
  const staffUuids = (await getStaffUsers())[0]!;

  let staff = [];
  let aux = [];
  let crr = "";

  for (let entry of staffUuids) {
    if (crr != entry.rankUuid) {
      if (aux.length > 0)
        staff.push(aux);

      crr = entry.rankUuid;
      aux = [];
    }

    const rank = (await GetRank(entry.rankUuid))[0]!;
    aux.push({
      username: (await getUsernameFromUuid(entry.playerUuid)),
      rank: rank.name,
      color: await getRankColor(entry.rankUuid) || "#FFFFFF"
    })
  }

  if (aux.length > 0)
    staff.push(aux);
  
  const headerContent: [string, string] = ["Staff", `Running the show!`];
  return <>
    <HeaderContext setTo={headerContent}/>

    {staff.map((listPerRank) => (
    <div className="window flex flex-row flex-wrap h-min w-screen max-w-full bg-base-300 rounded-xl p-2 gap-2">
      {listPerRank.map((d, i) => (
        <div key={i} className="flex-[1_0_32%] flex flex-col justify-center items-center rounded-lg overflow-hidden bg-base-100 py-4">
          <Link href={`/u/${d.username}`}>
            <div className="w-[45px] h-[49px] relative">
              <ServerMCHead shadowColor={d.color} className="scale-[.675] absolute left-[-11px] top-[-12px]" username={d.username} />
            </div>
          </Link>
          <Link href={`/u/${d.username}`}>
            <span className="text-center inline-flex flex-col">
              <h5 className="font-bold">{d.username}</h5>
              <small style={{color: d.color}} className="smaller font-bold uppercase tracking-wider">{d.rank}</small>
            </span>
          </Link>
        </div>
      ))}
    </div>
    ))}
  </>;
}

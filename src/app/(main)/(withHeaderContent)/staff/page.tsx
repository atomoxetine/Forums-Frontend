import HeaderContext from "@/components/HeaderContext";
import { ServerMCHead } from "@/components/Minecraft/Server";
import React from "react";

export default function Staff() {
  const staff = [
    {username: "Oestradiol", rank: "developer"},
    {username: "Oestradiol", rank: "developer"},
    {username: "OhEmilyy", rank: "owner"},
    {username: "OhEmilyy", rank: "owner"},
    {username: "OhEmilyy", rank: "owner"}
  ].sort((a, b) => {
    const getVal = (a: string) => ({
      "owner": 0,
      "developer": 1,
    }[a]);
    return getVal(a.rank)! - getVal(b.rank)!;
  });
  const getRankColor = (rank: string) => ({
    owner: "#9F000C",
    developer: "#ff4141"
  }[rank] ?? "#ffffff");
  
  const headerContent: [string, string] = ["Staff", `Running the show!`];
  return <>
    <HeaderContext setTo={headerContent}/>

    <div className="window flex flex-row flex-wrap h-min w-screen max-w-full bg-base-300 rounded-xl p-2 gap-2">
      {staff.map((d, i) => (
        <div key={i} className="flex-[1_0_32%] flex flex-col justify-center items-center rounded-lg overflow-hidden bg-base-100 py-4">
          <div className="w-[45px] h-[49px] relative">
            <ServerMCHead shadowColor={getRankColor(d.rank)} className="scale-[.675] absolute left-[-11px] top-[-12px]" username={d.username} />
          </div>
          <span className="text-center inline-flex flex-col">
            <h5 className="font-bold">{d.username}</h5>
            <small style={{color: getRankColor(d.rank)}} className="smaller font-bold uppercase tracking-wider">{d.rank}</small>
          </span>
        </div>
      ))}
    </div>
  </>;
}
'use client'

import Grant from "@/libs/types/entities/Grant";
import Rank from "@/libs/types/entities/Rank";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { getPlayerGrantsInfo } from "./ServerActions";
import { FaBars } from "react-icons/fa6";

interface Params {
  params: {
    username: string
  }
}

export default function Page(params: Params) {
  const { username } = params.params;

  const [uuid, setUuid] = useState<string>("");
  const [uuidToName, setUuidToName] = useState<{ [key: string]: string }>({});
  const [rankIdToRank, setRankIdToRank] = useState<{ [key: string]: Rank }>({});
  const [rankIdToColor, setRankIdToColor] = useState<{ [key: string]: string }>({});
  const [uuidToRank, setUuidToRank] = useState<{ [key: string]: Rank }>({});
  const [grants, setGrants] = useState<Grant[]>([]);

  useEffect(() => {
    getPlayerGrantsInfo(username).then(res => {
      const { uuid, uuidToName, rankIdToRank, rankIdToColor, uuidToRank, grants } = res; 

      setUuid(uuid);
      setUuidToName(uuidToName);
      setRankIdToRank(rankIdToRank);
      setRankIdToColor(rankIdToColor);
      setUuidToRank(uuidToRank);
      setGrants(grants);
    });
  }, [username]);

  const toggleDropdown = (i: number) => {
    const div = document.getElementById(`dropdownDiv${i}`);
    const name = document.getElementById(`dropdownName${i}`);

    if (!div) return;
    if (!name) return;

    if (div.hidden) {
      div.hidden = false;
      name.innerHTML = "Show Less";
    } else {
      div.hidden = true;
      name.innerHTML = "Show More";
    }
  }

  const yes = (msg = "Yes") => <span className="text-emerald-300">{msg}</span>
  const no = (msg = "No") => <span className="text-red-600">{msg}</span>
  const bold = (msg: string) => <span className="font-bold">{msg}</span>

  return <div className="flex flex-col gap-2 overflow-y-scroll p-2 h-full max-h-[400px]">
    {grants.map((g, i) =>
      <div key={i} className="flex flex-col gap-2 p-3 bg-base-300 rounded-md">
        <h4 className="text-xl font-bold">
          <span style={{ color: rankIdToColor[uuidToRank[g.issuedBy]._id] }}>
            {uuidToName[g.issuedBy]}
          </span>
          &nbsp;granted&nbsp;
          <span style={{ color: rankIdToColor[g.rankId] }}>
            {rankIdToRank[g.rankId].name}
          </span>
          &nbsp;to&nbsp;
          <span style={{ color: rankIdToColor[uuidToRank[uuid]._id] }}>
            {username}
          </span>
        </h4>
        <button className="w-fit h-fit" onClick={() => toggleDropdown(i)}>
          <FaBars className="inline-block h-5 w-5 mb-1" />
          &nbsp;
          <span id={`dropdownName${i}`} className="text-lg">Show More</span>
        </button>
        <div id={`dropdownDiv${i}`} hidden>
          <div className="flex flex-row flex-wrap gap-2">
            <div>
              {bold("Active:")} {g.active
                ? yes()
                : no()}
            </div>
            <div>
              {bold("Permanent:")} {g.permanent
                ? yes()
                : no()}
            </div>
            <div>
              {bold("Duration:")} {
                g.permanent
                  ? yes("Permanent")
                  : (g.duration || no("null"))}
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-3 mt-2">
            <div className="">
              <div>
                <div>
                  {bold("Issued Reason:")} {g.reason || no("null")}
                </div>
                <div>
                  {bold("Issued By:")} {uuidToName[g.issuedBy] || no("Unknown")}
                </div>
                <div>
                  {bold("Issued At:")} {
                    g.issuedAt != "0"
                      ? new Date(Number(g.issuedAt)).toLocaleString() || no("Unknown")
                      : no("Unknown")}
                </div>
                <div>
                  {bold("Issued On:")} {g.issuedOn || no("Unknown")}
                </div>
              </div>
            </div>
            <div className="">
              <div>
                {bold("Removed Reason:")} {g.removedReason || no("Unknown")}
              </div>
              <div>
                {bold("Removed By:")} {uuidToName[g.removedBy] || no("Unknown")}
              </div>
              <div>
                {bold("Removed At:")} {
                  g.removedAt != "0"
                    ? new Date(Number(g.removedAt)).toLocaleString() || no("Unknown")
                    : no("Unknown")}
              </div>
              <div>
                {bold("Removed On:")} {g.removedOn || no("Unknown")}
              </div>
            </div>
          </div>
          <div className="mt-2">
            {bold("Scopes:")}
            {g.scopes.map((s, i) =>
              <>&nbsp;<span className="px-2 py-[2px] bg-base-100 rounded-xl">
                {s.scope}
              </span></>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
}



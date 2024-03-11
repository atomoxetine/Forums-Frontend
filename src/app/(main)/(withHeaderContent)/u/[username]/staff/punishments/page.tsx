'use client'

import Punishment from "@/libs/types/entities/Punishment";
import { useEffect, useState } from "react";
import { getPunishmentsInfo } from "./ServerActions";

interface Params {
  params: {
    username: string
  }
}

export default function Page(params: Params) {
  const { username } = params.params;

  const [activeType, setActiveType] = useState<string>("ALL");
  const [punishments, setPunishments] = useState<Punishment[]>([]);
  const [uuidToName, setUuidToName] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    getPunishmentsInfo(username).then(res => {
      const { uuidToName, punishments } = res;

      setUuidToName(uuidToName);
      setPunishments(punishments);
    });
  }, [username]);

  const getFiltered = (type: string) => (
    type == "ALL"
      ? punishments
      : punishments.filter(p => p.punishmentType == type));

  const TYPE_COLOR: { [key: string]: string } = Object.freeze({
    ALL: "rgb(243 244 246)",
    WARNING: "rgb(234 179 8)",
    MUTE: "rgb(249 115 22)",
    KICK: "rgb(239 68 68)",
    BAN: "rgb(185 28 28)",
    BLACKLIST: "rgb(99 25 25)",
  });

  const TYPES = Object.freeze(["ALL", "WARNING", "MUTE", "KICK", "BAN", "BLACKLIST"]);

  const yes = (msg = "Yes") => <span className="text-emerald-300">{msg}</span>
  const no = (msg = "No") => <span className="text-red-600">{msg}</span>
  const bold = (msg: string) => <span className="font-bold">{msg}</span>

  return <div className="flex flex-wrap gap-2 w-full">
    <div className="flex flex-col gap-2 mx-4 w-fit">
      {TYPES.map((type, i) =>
        <button
          key={i}
          className={`btn p-2 min-w-[200px] bg-base-300 hover:bg-base-100 border-2 ${activeType == type ? 'active' : ''}`}
          style={{ borderColor: TYPE_COLOR[type] }}
          onClick={() => setActiveType(type)}>
          {type[0] + type.slice(1).toLowerCase() + (type != "ALL" ? "s" : "")}: {getFiltered(type).length}
        </button>
      )}
    </div>
    <div className="flex flex-col gap-2 overflow-y-scroll max-h-[400px] w-full lg:w-fit lg:min-w-[750px] px-2">
      {getFiltered(activeType).map((p, i) =>
        <div key={i} className="p-3 rounded-lg bg-base-300 border-base-100 max-w-[720px]">
          <span className={`font-bold text-xl`} style={{ color: TYPE_COLOR[p.punishmentType] }}>
            {p.punishmentType}
          </span>
          <div
            className="flex flex-row flex-wrap gap-2 mb-4">
            <div>
              {bold("Active:")} {p.active
                ? yes()
                : no()}
            </div>
            <div>
              {bold("IP:")} {p.ip
                ? yes()
                : no()}
            </div>
            <div>
              {bold("Shadow:")} {p.shadow
                ? yes()
                : no()}
            </div>
            <div>
              {bold("Voided:")} {p.voided
                ? yes()
                : no()}
            </div>
            <div>
              {bold("Permanent:")} {p.permanent
                ? yes()
                : no()}
            </div>
          </div>
          <div className="mt-2 flex flex-row flex-wrap gap-3">
            <div className="">
              <div>
                {bold("Issued Reason:")} {p.reason || no("null")}
              </div>
              <div>
                {bold("Issued By:")} {uuidToName[p.issuedBy] || no("Unknown")}
              </div>
              <div>
                {bold("Issued At:")} {
                  p.issuedAt != "0"
                    ? new Date(Number(p.issuedAt)).toLocaleString() || no("Unknown")
                    : no("Unknown")}
              </div>
              <div>
                {bold("Issued On:")} {p.issuedOn || no("Unknown")}
              </div>
              <div>
                {bold("Issued Silent:")} {p.silent
                  ? yes()
                  : no()}
              </div>
            </div>
            <div className="">
              <div>
                {bold("Removed Reason:")} {p.removedReason || no("Unknown")}
              </div>
              <div>
                {bold("Removed By:")} {uuidToName[p.removedBy] || no("Unknown")}
              </div>
              <div>
                {bold("Removed At:")} {
                  p.removedAt != "0"
                    ? new Date(Number(p.removedAt)).toLocaleString() || no("Unknown")
                    : no("Unknown")}
              </div>
              <div>
                {bold("Removed On:")} {p.removedOn || no("Unknown")}
              </div>
              <div>
                {bold("Removed Silent:")} {p.removedSilent
                  ? yes()
                  : no()}
              </div>
            </div>
          </div>
          <div className="mt-2">
            {bold("Punishment ID:")} {p.punishmentID}
          </div>
          <div>
            {bold("Duration:")} {
              p.permanent
                ? yes("Permanent")
                : (p.duration || no("null"))}
          </div>
          <div className="mt-2">
            {bold("Proofs:")} {p.proof.length == 0 ? no("None") : ""}
            <div className="flex flex-row flex-wrap gap-1 mt-1">
              {p.proof.map((pr, i) =>
                <div key={i} className="p-2 bg-base-200 rounded-md">
                  <div>
                    {bold("Type:")} {pr.type || no("null")}
                  </div>
                  <div>
                    {bold("Proof:")} {pr.proof || no("null")}
                  </div>
                  <div>
                    {bold("Added By:")} {uuidToName[pr.addedBy] || no("Unknown")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
}

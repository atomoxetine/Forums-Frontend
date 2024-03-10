'use client'

import { useState } from "react";

interface Params {
  params: {
    username: string
  }
}

export default function Page({ params: { username } }: Params) {
  const [type, setType] = useState<string>("all");

  return <div className="flex flex-wrap gap-2">
    <div className="flex flex-col gap-2 mx-4">
      <button
        className={`btn p-2 min-w-[200px] bg-base-300 hover:bg-base-100 border-2 border-gray-200 ${type == "all" ? 'active' : ''}`}
        onClick={() => setType("all")}>
        All: 0
      </button>
      <button
        className={`btn p-2 min-w-[200px] bg-base-300 hover:bg-base-100 border-2 border-yellow-500 ${type == "warning" ? 'active' : ''}`}
        onClick={() => setType("warning")}>
        Warnings: 0
      </button>
      <button
        className={`btn p-2 min-w-[200px] bg-base-300 hover:bg-base-100 border-2 border-orange-500 ${type == "mute" ? 'active' : ''}`}
        onClick={() => setType("mute")}>
        Mutes: 0
      </button>
      <button
        className={`btn p-2 min-w-[200px] bg-base-300 hover:bg-base-100 border-2 border-red-500 ${type == "kick" ? 'active' : ''}`}
        onClick={() => setType("kick")}>
        Kicks: 0
      </button>
      <button
        className={`btn p-2 min-w-[200px] bg-base-300 hover:bg-base-100 border-2 border-red-700 ${type == "ban" ? 'active' : ''}`}
        onClick={() => setType("ban")}>
        Bans: 0
      </button>
      <button
        className={`btn p-2 min-w-[200px] bg-base-300 hover:bg-base-100 border-2 border-red-950 ${type == "blacklist" ? 'active' : ''}`}
        onClick={() => setType("blacklist")}>
        Blacklists: 0
      </button>
    </div>
  </div>
}

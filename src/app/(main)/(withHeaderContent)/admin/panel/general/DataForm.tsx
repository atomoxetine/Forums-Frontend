'use client'

import WebEntry from "@/libs/types/entities/WebEntry";
import { useState } from "react";
import { updateDataAction } from "./ServerActions";
import Thread from "@/libs/types/entities/Thread";

export interface Props {
  dataMap: { [key: string]: string },
  announcements: Thread[],
}

const HIGHLIGHT_CNT = 3;

export default function DataForm(props: Props) {
  const { dataMap, announcements } = props;

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function onSubmit(formData: FormData) {
    setLoading(true);
    const entries: WebEntry[] = [];
    formData.forEach((value, key) => {
      if (dataMap[key] == value.toString()) return;
      entries.push({ _id: key, value: value.toString() });
    });

    updateDataAction(entries).then(res => {
      if (res) {
        setLoading(false);
        setError(res);
      }
      else window.location.reload();
    });
  }

  const headline = dataMap["headline"];
  const headlineColor = dataMap["headlineColor"];

  return <form action={onSubmit} className="flex flex-col gap-3 p-3">
    <div className="flex flex-row flex-wrap gap-2 w-full">
      <div className="flex flex-col flex-initial px-3 gap-1">
        <label className="text-xl" htmlFor="headlineColor">Headline Color</label>
        <input className="text-lg rounded-lg" type="color" name="headlineColor" id="headlineColor" disabled={loading} defaultValue={headlineColor} />
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <label className="text-xl" htmlFor="headline">Headline Text</label>
        <input className="text-lg rounded-lg" name="headline" id="headline" disabled={loading} defaultValue={headline} />
      </div>
    </div>
    <div className="flex flex-row flex-wrap gap-2 w-full">
      <div className="flex flex-col gap-1 px-3">
        <label className="text-xl" htmlFor="highlightThreadMain">Main Highlight Thread</label>
        <ThreadSelect selectedId="highlightThreadMain" announcements={announcements} dataMap={dataMap} />
      </div>
      {Array(HIGHLIGHT_CNT).fill(0).map((_, i) =>
        <div key={i} className="flex flex-col gap-1 px-3">
          <label className="text-xl" htmlFor={`highlightThread${i}`}>Highlight Thread #{i}</label>
          <ThreadSelect selectedId={`highlightThread${i}`} announcements={announcements} dataMap={dataMap} />
        </div>
      )}
    </div>
    <div className="mt-4 font-bold text-xl text-red-500">
      {error}
    </div>
    <button type="submit" className="btn bg-emerald-600 hover:bg-emerald-700 px-5 font-bolder text-white mt-4 w-fit ms-3 mb-3" disabled={loading}>
      {loading ? "Saving.." : "SAVE"}
    </button>
  </form>
}

interface ThreadSelectProps {
  selectedId: string,
  announcements: Thread[],
  dataMap: { [key: string]: string },
}

const ThreadSelect = (props: ThreadSelectProps) => {
  const { selectedId, announcements, dataMap } = props;

  return <select className="text-lg rounded-lg p-2" id={selectedId} name={selectedId} defaultValue={dataMap[selectedId]}>
    <option value="None">None</option>
    {announcements.map((a, i) =>
      <option key={i} value={a._id}>{a.title}</option>
    )}
  </select>
}

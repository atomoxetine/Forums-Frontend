'use client'

import { useState } from "react";
import { deleteThreadHard } from "./ServerActions";

interface Props {
  params: {
    forumId: string;
    threadId: string;
  },
}

export default function Page(props: Props) {
  const { forumId, threadId } = props.params;

  const [loading, setLoading] = useState<boolean>(false);

  function onSubmit() {
    setLoading(true);
    deleteThreadHard(threadId).then(() =>
      window.location.assign(`/forums/${forumId}`))
  }

  return <div className="bg-base-200 flex flex-col gap-2 py-4 px-6 rounded-lg w-[40%]">
    <h2>Delete Thread</h2>
    <div className="text-lg">Are you sure you want to delete this threads completely? This action cannot be undone.</div>
    <button
      className="p-3 bg-red-700 hover:bg-red-800 text-white font-bold text-lg rounded-lg"
      onClick={onSubmit}
      disabled={loading}>
      {loading ? "Deleting.." : "DELETE"}
    </button>
  </div>
}

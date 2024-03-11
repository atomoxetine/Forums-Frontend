'use client';

import './styles.css'
import useSession from "@/hooks/useSession";
import { FormEvent, LegacyRef, MutableRefObject, useRef, useState } from "react";
import { isResultError, newUuid } from "@/libs/Utils";
import { CreateReply } from '@/services/forum/thread/ThreadService';
import useGlobal from "@/hooks/useGlobal";
import Thread from "@/libs/types/entities/Thread";
import { getAllFilters } from '@/services/forum/filter/TextFilterService';

export interface WriteReplyData {
  forumId: string;
  threadId: string;
}
const WriteReply = (props: WriteReplyData) => {
  const { forumId, threadId } = props
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSession();
  const [latestReply, updateReplies] = useGlobal<{isAdd: boolean, value: Thread}>("latestReply")
  const input = useRef<HTMLInputElement>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
 
    try {
      const formData = new FormData(event.currentTarget);

      const author = session?.uuid
      if (!author) throw new Error("You're not logged in.")

      const body = formData.get("reply")!.toString()
      if (!body) throw new Error("Please write a reply.")

      const filters = (await getAllFilters())[0] || [];

      for (let filter of filters) {
        if (body.includes(filter.filter))
          throw new Error("Body did not pass filter test");
      }

      const parentId = threadId
      const id = newUuid()

      if (latestReply) {
        const thisPost = getReplyTemplate('', body, forumId, author, parentId, session.username)
        latestReply.value._id = ''
        latestReply.value.createdAt = '';
        if (JSON.stringify(thisPost) == JSON.stringify(latestReply.value)) throw new Error("You just posted that!")
      }


      const res = await CreateReply(id, '', body, forumId, author, parentId);
      if (isResultError(res, true)) {
        throw new Error(res[2] ?? "Unknown error");
      }
      
      input.current!.value = ""

      const newReply: any = getReplyTemplate(id, body, forumId, author, parentId, session.username)
      newReply.createdAt = new Date().getTime().toString();
      updateReplies({isAdd: true, value: newReply})
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return <>
    <form onSubmit={onSubmit} className="flex items-center w-full bg-base-100 rounded-lg h-[34px]">
      <div className="relative flex flex-col flex-1 mr-1 h-min">
        <span className="absolute mt-[-26px] bg-base-300 px-2">{error && <p className="text-error mb-1">{error}</p>}</span>
        <input ref={input} type="text" name="reply" placeholder="Type a reply..." className="input h-min w-full content-color" required/>
      </div>
      <button className="btn btn-primary flex px-2 min-h-fit h-full rounded-l-none items-center px-2 py-1" disabled={isLoading} type="submit">
        <p className="font-semibold">{isLoading ? "On it…" : "Send"}</p>
      </button>
    </form>
  </>;
}
export default WriteReply;

const getReplyTemplate = (id: string, body: string, forumId: string, author: string, parentId: string, username: string) => ({
  _id: id,
  title: "",
  body: body,
  forum: forumId,
  author: author,
  createdAt: '',
  lastEditedBy: null,
  lastEditedAt: "-1",
  lastReplyAt: "-1",
  pinned: false,
  locked: false,
  parentThreadId: parentId,
  authorName: username,
  authorWebColor: "",
  forumName: "",
  replies: []
})

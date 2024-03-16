'use client';

import './styles.css'
import useSession from "@/hooks/useSession";
import { FormEvent, LegacyRef, MutableRefObject, useRef, useState } from "react";
import { isResultError, newUuid } from "@/libs/Utils";
import { CreateReply } from '@/services/forum/thread/ThreadService';
import useGlobal from "@/hooks/useGlobal";
import Thread from "@/libs/types/entities/Thread";
import { getAllFilters } from '@/services/forum/filter/TextFilterService';
import { canUseForum } from '@/services/forum/account/AccountService';

export interface WriteReplyData {
  forumId: string;
  threadId: string;
  locked: boolean;
  blocked: boolean;
}
const WriteReply = (props: WriteReplyData) => {
  const { forumId, threadId, locked, blocked } = props
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSession();
  const [latestReply, updateReplies] = useGlobal<{isAdd: boolean, value: Thread}>("latestReply")
  const input = useRef<HTMLTextAreaElement>(null)

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

      if (!(await canUseForum(session.uuid)))
        throw new Error("Permission denied");

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
    <form onSubmit={onSubmit} className="flex flex-col w-full bg-base-100 rounded-lg min-h-[34px]">
      <div className="relative flex flex-col flex-1 mr-1 h-min w-full p-1">
        <span className="absolute mt-[-26px] bg-base-300 px-2">{error && <p className="text-error mb-1">{error}</p>}</span>
        <textarea ref={input} name="reply" placeholder={locked ? "This thread is locked" : blocked ? "You do not have permissions to post here" : `Type a reply...`} className="input h-min w-full content-color" required disabled={isLoading || locked || blocked} />
      </div>
      <button className="btn bg-emerald-600 hover:bg-emerald-700 font-bold text-white flex min-h-fit h-full w-fit items-center p-3 m-2 inline-block" disabled={isLoading || locked || blocked} type="submit">
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

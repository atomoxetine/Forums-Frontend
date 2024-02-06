'use client';

import { isResultError, stringToDate, toLocaleString } from "@/libs/Utils";
import { ClientMCHead } from "@/components/Minecraft/Client";
import Reply from '@/libs/types/entities/Thread'
import { getAuthorInfo } from "../Utils";
import HashLink from "@/components/HashLink";
import { IoTrash } from "react-icons/io5";
import { DeleteReply, GetThread } from "@/services/forum/thread/ThreadService";
import { useCallback, useEffect, useState } from "react";
import useGlobal from "@/hooks/useGlobal";
import Thread from "@/libs/types/entities/Thread";
import Rank from "@/libs/types/entities/Rank";
import { IoIosArrowDown } from "react-icons/io";
import useSession from "@/hooks/useSession";

export interface RepliesData {
  replies: Reply[];
  threadId: string;
}
const Replies = (props: RepliesData) => {
  const { replies, threadId } = props
  const [currReplies, setCurrReplies] = useState(replies)
  const [latestReply, _] = useGlobal<{isAdd?: boolean, value: Thread}>("latestReply")

  const defaultN = 5;
  const [n, setN] = useState(defaultN)

  const updateReplies = useCallback(async () => {
    let res0 = await GetThread(threadId);

    const isError = isResultError(res0);
    if (isError) {
      console.error("Error fetching thread: HTTP " + res0[1]);
      return;
    }
    
    setCurrReplies(res0[0]!.replies)
  }, [threadId])

  useEffect(() => {
    const intervalId = setInterval(updateReplies, 5000);
    return () => clearInterval(intervalId);
  }, [updateReplies])

  useEffect(() => {
    if (!latestReply?.value) return;

    setCurrReplies(c => {
      const value = latestReply?.isAdd;
      if (value) {
        c.push(latestReply.value)
        latestReply.isAdd = undefined;
      }
      else if (value == false) {
        const idx = c.findIndex(e => e._id == latestReply.value._id)
        if (idx > -1)
          c.splice(idx, 1);
      }

      return [...c]
    })
  }, [latestReply])
  return (
    <div className="flex flex-col min-h-full gap-4 bg-base-200 py-4 px-6 w-full rounded-b-xl justify-center">
      {(() => {
        const len = currReplies.length;
        return !len ?
          <small className="mx-auto">0 replies in this thread. Be the first!</small> :
          <>
            {currReplies.slice(Math.max(len - n, 0), len).toReversed()
              .map(r => <Reply key={r._id} id={r._id} authorId={r.author} createdAt={r.createdAt} content={r.body} fullReplyId={r._id}/>)
            }

            {len > n ?
              <h5 onClick={() => setN(n + 5)} className="flex flex-col items-center cursor-pointer hover:text-primary">
                Read more
                <IoIosArrowDown
                  className="h-8"
                />
              </h5> : len > defaultN ?
                <h5 onClick={() => setN(5)} className="flex flex-col items-center cursor-pointer hover:text-primary">
                  Collapse all
                  <IoIosArrowDown
                    className="h-8 rotate-180"
                  />
                </h5> : <></>
            }
          </>;
      })()}
    </div>
  );
}
export default Replies;

interface ReplyData {
  id: string;
  authorId: string;
  createdAt?: string;
  content: string;
  fullReplyId: string;
}

const Reply = (params: ReplyData) => {
  const {authorId, createdAt, content, fullReplyId } = params;
  const createdAtDate = stringToDate(createdAt);
  const [author, setAuthor] = useState<{username: string, rank?: Rank | undefined}>()
  const {session} = useSession()
  const [_, updateReplies] = useGlobal<{isAdd: boolean, value: Thread}>("latestReply")

  useEffect(() => {
    (async () => {
      setAuthor(await getAuthorInfo(authorId));
    })()
  }, [authorId])  

  const getRankColor = (r?: string) => ({ // TODO: Properly get rank color
    Owner: "#9F000C",
    Developer: "#ff4141"
  }[r ?? '']) ?? "#ffffff"
  return (
    <div className="flex items-center w-full gap-2">
      <div className="w-[39px] h-[37px] relative">
        <ClientMCHead shadowColor={getRankColor(author?.rank?.name)} className="scale-[.5] absolute left-[-16px] top-[-18px]" username={author?.username} />
      </div>
      <div className="flex rounded-lg w-full">
        <div className="flex-1 bg-base-100 rounded-l-lg px-2 py-1">
          <span className="flex flex-col">
            <p className="content-color">{content}</p>                  
            <small className="inline-flex gap-1 items-end">
              <HashLink href={`/u/${author?.username}`} style={{color: getRankColor(author?.rank?.name)}}>{author?.username}</HashLink>
              <small className="smaller">{toLocaleString(createdAtDate)}</small>
            </small>                  
          </span>
        </div>
        {session && author && session?.username == author?.username ?
          <div className="flex-none flex bg-base-300 rounded-r-lg items-center px-2 py-1 text-neutral cursor-pointer hover:text-primary" onClick={
            () => {
              const split = fullReplyId.split('.')
              split.pop()
              DeleteReply(split.join('.'), fullReplyId).then(() => {
                updateReplies({isAdd: false, value: {_id: fullReplyId}} as any)
              })
            }
          }><IoTrash className="h-5 w-5"/></div> : <></>
        }
      </div>
    </div>
  );
}
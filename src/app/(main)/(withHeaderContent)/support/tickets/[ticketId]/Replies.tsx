'use client';

import { stringToDate, toLocaleString } from "@/libs/Utils";
import { ClientMCHead } from "@/components/Minecraft/Client";
import Ticket from '@/libs/types/entities/Ticket'
import { getAuthorInfo } from "../../Utils";
import HashLink from "@/components/HashLink";
import { IoTrash } from "react-icons/io5";
import { useEffect, useState } from "react";
import Rank from "@/libs/types/entities/Rank";
import { IoIosArrowDown } from "react-icons/io";
import useSession from "@/hooks/useSession";
import { DeleteTicket } from "@/services/forum/ticket/TicketService";
import { getRankColor } from "@/services/controller/GrantService";
import Link from "next/link";

export interface RepliesData {
  replies: Ticket[];
}
const Replies = (props: RepliesData) => {
  const { replies } = props
  // const [currReplies, setCurrReplies] = useState(replies)
  // const [latestReply, _] = useGlobal<{isAdd?: boolean, value: Thread}>("latestReply")

  const defaultN = 5;
  const [n, setN] = useState(defaultN)

  return (
    <div className="flex flex-col min-h-full gap-4 bg-base-200 py-4 px-6 w-full rounded-xl justify-center">
      {(() => {
        const len = replies.length;
        return !len ?
          <small className="mx-auto">0 replies in this ticket</small> :
          <>
            {replies.slice(Math.max(len - n, 0), len)
              .map(r => <Ticket key={r._id} id={r._id} authorId={r.author} createdAt={r.createdAt} content={r.body} isDeleted={r.status=="deleted"} fullReplyId={r._id}/>)
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
  isDeleted: boolean;
  fullReplyId: string;
}


const Ticket = (params: ReplyData) => {
  let {authorId, createdAt, content, fullReplyId, isDeleted } = params;
  const createdAtDate = stringToDate(createdAt);
  const [author, setAuthor] = useState<{username: string, rank?: Rank | undefined}>();
  const [rankColor, setRankColor] = useState<string>("#FFFFFF");
  const {session} = useSession()

  if (isDeleted)
    content = "This message was deleted";

  useEffect(() => {
    (async () => {
      const newAuthor = await getAuthorInfo(authorId);
      setAuthor(newAuthor);
      setRankColor(await getRankColor(newAuthor?.rank?._id || "") || "#FFFFFF")
    })()
  }, [authorId])  

  return (
    <div className="flex items-center w-full gap-2">
      <div className="w-[39px] h-[37px] relative">
        <ClientMCHead shadowColor={rankColor} className="scale-[.5] absolute left-[-16px] top-[-18px]" username={author?.username} />
      </div>
      <div className="flex rounded-lg w-full">
        <div className="flex-1 bg-base-100 rounded-l-lg px-2 py-1">
          <span className="flex flex-col">
            <p className="content-color ticket-content">{content}</p>                  
            <small className="inline-flex gap-1 items-end">
              <Link href={`/u/${author?.username}`} style={{color: rankColor}}>{author?.username}</Link>
              <small className="smaller">{toLocaleString(createdAtDate)}</small>
            </small>                  
          </span>
        </div>
        {!isDeleted && session && author && session?.username == author?.username ?
          <div className="flex-none flex bg-base-300 rounded-r-lg items-center px-2 py-1 text-neutral cursor-pointer hover:text-primary" onClick={
            () => {
              DeleteTicket(fullReplyId).then(() => {
                window.location.reload();
              })
            }
          }><IoTrash className="h-5 w-5"/></div> : <></>
        }
      </div>
    </div>
  );
}

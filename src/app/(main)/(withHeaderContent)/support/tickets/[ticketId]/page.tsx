import './styles.css'
import { ServerMCBust, ServerMCHead } from "@/components/Minecraft/Server";
import { GetThread } from '@/services/forum/thread/ThreadService';
import { isResultError, stringToDate, toLocaleString } from "@/libs/Utils";
import HashLink from '@/components/HashLink';
import getSession from '@/libs/session/getSession';
import { getAuthorInfo } from '../../Utils'
import ReplyForm from './ReplyForm';
import Replies from './Replies';
import React from "react";
import Navigation from "@/app/(main)/(withHeaderContent)/support/(components)/Navigation";
import { GetTicket } from '@/services/forum/ticket/TicketService';
import Ticket from '@/libs/types/entities/Ticket';
import { GetAllTicketCategories } from '@/services/forum/ticket/TicketCategoryService';
import TicketCategory from '@/libs/types/entities/TicketCategory';

interface Params {
  params: {
    ticketId: string;
  }
}
export default async function Page({ params: { ticketId } }: Params) {
  let res0 = await GetTicket(ticketId);

  const isError = isResultError(res0);
  if (isError)
    console.error("Error fetching thread: HTTP " + res0[1]);
  const ticket = res0[0];

  if (!ticket) return <>
    <div className="flex flex-col gap-4 p-8 rounded-lg h-fit w-screen max-w-[996px] items-center">
      <h4>{isError && res0[1] !== 404 ? "An Error has occurred while fetching this thread." : "This ticket was not found. Perhaps it got deleted?"}</h4>
    </div>
  </>;

  const categories: TicketCategory[] = (await GetAllTicketCategories())[0]!;

  const authorPromise = getAuthorInfo(ticket.author);
  
  const session = await getSession();
  const currentUser = await getAuthorInfo(session?.uuid);

  const author = await authorPromise;
  
  const lastEdited = stringToDate(ticket.lastUpdatedAt);
  const createdAt = stringToDate(ticket.createdAt);
  let replies: Ticket[] = [];

  for (const replyId of ticket.replies) {
    replies.push((await GetTicket(replyId))[0]!);
  }

  const getRankColor = (r?: string) => ({ // TODO: Properly get rank color
    Owner: "#9F000C",
    Developer: "#ff4141"
  }[r ?? '']) ?? "#ffffff";

  return <>
    <Navigation>
      <div className="flex flex-col gap-4 p-2 rounded-lg h-fit w-screen max-w-[996px]">
        <div className="flex bg-base-200 rounded-xl">
          <div className="flex flex-col items-center py-8">
            <ServerMCBust className="mx-8 mb-4" username={author?.username}/>
            <span className="text-center inline-flex flex-col">
            <HashLink href={`/u/${author?.username}`}><h5
              className="font-bold">{author?.username ?? "Unknown"}</h5></HashLink>
            <small style={{color: getRankColor(author?.rank?.name)}}
                   className="smaller font-bold uppercase tracking-wider">{author?.rank?.name}</small>
          </span>
          </div>
          <div className="flex flex-col min-h-full w-full bg-base-100 p-4 rounded-r-lg">
            <h3 className="text-neutral"><b>{ticket.title}</b></h3>
            <span className="flex-1">
            {ticket.body}
          </span>
            <small className="smaller flex flex-col">
              <span>Last edited: {toLocaleString(lastEdited)}</span>
              <span>Posted: {toLocaleString(createdAt)}</span>
            </small>
          </div>
        </div>

        <div className="flex flex-col items-center rounded-xl border-[1px] border-base-200">
          <Replies replies={replies} />
          <div className="flex py-3 px-2 w-full gap-2">
            {session?.isLoggedIn ?
              <>
                <div className="w-[39px] h-[37px] relative inline-block">
                  <ServerMCHead shadowColor={getRankColor(currentUser?.rank?.name)}
                                className="scale-[.5]"
                                username={currentUser?.username}/>
                </div>
                <div className="inline-block ms-3 w-full">
                  <ReplyForm parentId={ticket._id} categories={categories} />
                </div>
              </> :
              <h6 className="font-bold w-full">You are not logged in.</h6>
            }
          </div>
        </div>
      </div>
    </Navigation>
  </>;
}

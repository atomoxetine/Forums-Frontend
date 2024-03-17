import './styles.css'
import { ServerMCBust, ServerMCHead } from "@/components/Minecraft/Server";
import { DeleteThread, EditThread, GetThread } from '@/services/forum/thread/ThreadService';
import { isResultError, stringToDate, toLocaleString } from "@/libs/Utils";
import HashLink from '@/components/HashLink';
import getSession from '@/libs/session/getSession';
import { getAuthorInfo } from '../../Utils'
import ReplyForm from './ReplyForm';
import Replies from './Replies';
import React, { PropsWithChildren, ReactNode } from "react";
import Navigation from "@/app/(main)/(withHeaderContent)/forums/(components)/Navigation";
import Link from 'next/link';
import SideOptions, { SideOption } from '../../(components)/SideOptions';
import { getHighestRank } from '@/services/controller/GrantService';
import { GetForum } from '@/services/forum/forum/ForumService';
import { redirect } from 'next/navigation';
import { canUseForum } from '@/services/forum/account/AccountService';
import { marked } from "marked"
import DOMPurify from 'isomorphic-dompurify';

interface Props {
  params: {
    forumId: string;
    threadId: string;
  },
}
export default async function Page(props: Props) {
  const { forumId, threadId } = props.params;

  const thisThreadId = threadId;

  let res0 = await GetThread(thisThreadId);
  const isError = isResultError(res0);
  if (isError)
    console.error("Error fetching thread: HTTP " + res0[1]);
  const thread = res0[0];

  if (!thread) return <>
    <div className="flex flex-col gap-4 p-8 rounded-lg h-fit w-screen max-w-[996px] items-center">
      <h4>{isError && res0[1] !== 404 ? "An Error has occurred while fetching this thread." : "This thread was not found. Perhaps it got deleted?"}</h4>
    </div>
  </>;

  const authorPromise = getAuthorInfo(thread.author);

  const session = await getSession();
  const currentUser = await getAuthorInfo(session?.uuid);

  const author = await authorPromise;

  const lastEdited = stringToDate(thread.lastEditedAt);
  const createdAt = stringToDate(thread.createdAt);
  const replies = thread.replies;

  const getRankColor = (r?: string) => ({ // TODO: Properly get rank color
    OWNER: "#9F000C",
    DEVELOPER: "#ff4141"
  }[r ?? '']) ?? "#ffffff";

  const forum = (await GetForum(forumId))[0]
  if (!forum) redirect("/forums");

  const bodyMarkdownUNSAFE = marked.parse(thread.body) as string;
  const bodyMarkdown = DOMPurify.sanitize(bodyMarkdownUNSAFE);
  

  const locked = thread.locked || forum?.locked
  const blocked = !(await canUseForum(session.uuid))

  const sideOptions: SideOption[] = [];

  if (author?.username == currentUser?.username && !locked && !blocked) {
    sideOptions.push({
      name: "Delete Thread Post",
      color: "red",
      disabled: false,
      href: `/forums/${forumId}/${threadId}/deleteSoft`
    });
  }

  if (currentUser?.rank?.staff) {
    sideOptions.push({
      name: "[ADM] Delete Thread",
      color: "red",
      disabled: false,
      href: `/forums/${forumId}/${threadId}/deleteHard`
    })

    if (!thread.locked) {
      sideOptions.push({
        name: "[ADM] Lock Thread",
        color: "red",
        disabled: false,
        href: `/forums/${forumId}/${threadId}/lock`
      })
    } else if (!forum.locked) {
      sideOptions.push({
        name: "[ADM] Unlock Thread",
        color: "red",
        disabled: false,
        href: `/forums/${forumId}/${threadId}/unlock`
      })
    }
  }



  return <div className="flex flex-row flex-wrap justify-center w-[80%]">
    <Navigation>
      <div className="flex flex-col gap-4 p-2 rounded-lg h-fit w-screen max-w-[996px]">
        {thread.locked || forum.locked
          ? <span className="px-3 text-lg text-red-500">{forum.locked ? "This thread's forum is locked" : "This thread is locked"}</span>
          : <></>}
        <div className="flex bg-base-200 rounded-xl">
          <div className="flex flex-col items-center py-8">
            <ServerMCBust className="mx-8 mb-4" username={author?.username} />
            <span className="text-center inline-flex flex-col">
              <Link href={`/u/${author?.username}`}><h5
                className="font-bold">{author?.username ?? "Unknown"}</h5></Link>
              <small style={{ color: getRankColor(author?.rank?.name) }}
                className="smaller font-bold uppercase tracking-wider">{author?.rank?.name}</small>
            </span>
          </div>
          <div className="flex flex-col min-h-full w-full bg-base-100 p-4 rounded-r-lg">
            <h3 className="text-neutral"><b>{thread.title}</b></h3>
            <div className="flex-1 whitespace-pre-line break-normal markdown"
              dangerouslySetInnerHTML={{__html: bodyMarkdown}}>
            </div>
            <small className="smaller flex flex-col">
              <span>Last edited: {toLocaleString(lastEdited)}</span>
              <span>Posted: {toLocaleString(createdAt)}</span>
            </small>
          </div>
        </div>

        <div className="flex flex-col items-center rounded-xl border-[1px] border-base-200">
          <div className="flex items-center py-3 px-6 w-full gap-2">
            {session?.isLoggedIn ?
              <>
                <div className="w-[39px] h-[37px] relative">
                  <ServerMCHead shadowColor={getRankColor(currentUser?.rank?.name)}
                    className="scale-[.5] absolute left-[-16px] top-[-18px]"
                    username={currentUser?.username} />
                </div>
                <ReplyForm forumId={forumId} threadId={threadId} locked={(thread.locked || forum.locked) && !currentUser?.rank?.staff} blocked={blocked} />
              </> :
              <h6 className="font-bold w-full">You are not logged in.</h6>
            }
          </div>

          <Replies replies={replies} threadId={thisThreadId} />
        </div>
      </div>
    </Navigation>
    <SideOptions options={sideOptions} />
  </div>;
}

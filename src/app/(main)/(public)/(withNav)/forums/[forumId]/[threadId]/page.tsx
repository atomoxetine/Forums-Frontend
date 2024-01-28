import './styles.css'
import { ServerMCBust, ServerMCHead } from "@/components/Minecraft/Server";
import { GetThread } from '@/services/forum/thread/ThreadService';
import { IoTrash } from "react-icons/io5";
import { isResultError, stringToDate, toLocaleString } from "@/libs/Utils";
import HashLink from '@/components/HashLink';
import getSession from '@/libs/session/getSession';
import { getAuthorInfo } from '../../Utils'

interface Params {
  params: {
    forumId: string;
    threadId: string;
  }
}
export default async function Page({ params: { forumId, threadId } }: Params) {
  const thisThreadId = forumId + '.' + threadId;

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

  const author = await getAuthorInfo(thread.author);

  const session = await getSession();
  const currentUser = await getAuthorInfo(session?.uuid);
  
  const lastEdited = stringToDate(thread.lastEditedAt);
  const createdAt = stringToDate(thread.createdAt);
  const replies = thread.replies;

  const getRankColor = (r?: string) => ({ // TODO: Properly get rank color
    Owner: "#9F000C",
    Developer: "#ff4141"
  }[r ?? '']) ?? "#ffffff";

  return (
    <div className="flex flex-col gap-4 p-2 rounded-lg h-fit w-screen max-w-[996px]">
      <div className="flex bg-base-200 rounded-xl">
        <div className="flex flex-col items-center py-8">
          <ServerMCBust className="mx-8 mb-4" username={author?.username}/>
          <span className="text-center inline-flex flex-col">
            <HashLink href={`/u/${author?.username}`}><h5 className="font-bold">{author?.username ?? "Unknown"}</h5></HashLink>
            <small style={{color: getRankColor(author?.rank?.name)}} className="smaller font-bold uppercase tracking-wider">{author?.rank?.name}</small>
          </span>
        </div>
        <div className="flex flex-col min-h-full w-full bg-base-100 p-4 rounded-r-lg">
          <h3 className="text-secondary"><b>{thread.title}</b></h3>
          <span className="flex-1">
            {thread.body}
          </span>
          <small className="smaller flex flex-col">
            <span>Last edited: {toLocaleString(lastEdited)}</span>
            <span>Posted: {toLocaleString(createdAt)}</span>
          </small>
        </div>
      </div>

      <div className="flex flex-col items-center rounded-xl border-[1px] border-base-200">
        <div className="flex items-center py-3 px-6 w-full gap-2">
          <div className="w-[39px] h-[37px] relative">
            <ServerMCHead shadowColor={getRankColor(currentUser?.rank?.name)} className="scale-[.5] absolute left-[-16px] top-[-18px]" username={currentUser?.username} />
          </div>
          <input className="w-full rounded-lg placeholder-base-content" placeholder="Type a reply..."/>
        </div>
        <div className="flex flex-col min-h-full gap-4 bg-base-200 py-4 px-6 w-full rounded-b-xl">
          {!replies || !replies.length ?
            <small className="mx-auto">0 replies in this thread. Be the first!</small> :
            replies.map(r => <Reply key={r._id} id={r._id} authorId={r.author} createdAt={r.createdAt} content={r.body}/>)
          }
        </div>
      </div>
    </div>
  );
}

interface ReplyData {
  id: string;
  authorId: string;
  createdAt?: string;
  content: string;
}
const Reply = async (params: ReplyData) => {
  const { authorId, createdAt, content } = params;
  const createdAtDate = stringToDate(createdAt);

  const author = await getAuthorInfo(authorId);

  const getRankColor = (r?: string) => ({ // TODO: Properly get rank color
    Owner: "#9F000C",
    Developer: "#ff4141"
  }[r ?? '']) ?? "#ffffff"
  return (
    <div className="flex items-center w-full gap-2">
      <div className="w-[39px] h-[37px] relative">
        <ServerMCHead shadowColor={getRankColor(author?.rank?.name)} className="scale-[.5] absolute left-[-16px] top-[-18px]" username={author?.username} />
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
        <div className="flex-none flex bg-base-300 rounded-r-lg items-center px-2 py-1 text-neutral"><IoTrash className="h-5 w-5"/></div>
      </div>
    </div>
  );
}
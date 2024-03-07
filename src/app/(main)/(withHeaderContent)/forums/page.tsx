import './styles.css'
import ThreadInfo from './(components)/ThreadInfo';
import { awaitAll, isResultError, stringToDate, toLocaleString } from '@/libs/Utils';
import { getAuthorInfo, getThreadShortId, threadSorter } from './Utils';
import ForumCategory from '@/libs/types/entities/ForumCategory';
import { GetForumCategories } from '@/services/forum/category/CategoryService';
import Category from './(components)/Category';
import AsideInfo from './(components)/AsideInfo';
import Thread from '@/libs/types/entities/Thread';
import { GetThread } from '@/services/forum/thread/ThreadService';
import HashLink from '@/components/HashLink';
import Navigation from "@/app/(main)/(withHeaderContent)/forums/(components)/Navigation";
import Link from 'next/link';

interface UserParams {
}
export default async function Page({ }: UserParams) {
  const res = await GetForumCategories();
  const isError = isResultError(res);
  if (isError)
    console.error("Error fetching categories: HTTP " + res[1]);
  const categories: ForumCategory[] | null = res[0];

  const getRankColor = (r?: string) => ({ // TODO: Properly get rank color
    Owner: "#9F000C",
    Developer: "#ff4141"
  }[r ?? '']) ?? "#ffffff"

  const latestThreads = await awaitAll(
    categories
      ?.flatMap(c => c.forums.map(f => f.lastThread))
      .filter(t => !!t)
      .sort(threadSorter)
      .map(async t => ({
        thread: t!,
        item: <ThreadInfo id={getThreadShortId(t!._id)} forumId={t!.forum} title={t!.title} threadAuthor={await getAuthorInfo(t!.author)} createdAt={t!.createdAt}/>,
      }))
  );
  const latestReplies: {thread: Thread, item: JSX.Element}[] = (
    await awaitAll(
      latestThreads
        .map(t => t.thread)
        .map(async t => {
          let res0 = await GetThread(t._id);
          if (isResultError(res0)) {
            console.error("Error fetching thread: HTTP " + res0[1]);
            return undefined;
          }
          return {reply: res0[0]!.replies.sort(threadSorter)[0], parent: t};
        })
        .map(async (r) => {
          const res = await r;
          const reply = res?.reply;
          if (!reply) return;
          const author = await getAuthorInfo(reply.author);
          const authorName = author!.username;
          const threadUrl = `/forums/${reply.forum}/${getThreadShortId(res.parent._id)}`;
          return {
            thread: reply,
            item: (
              <small key={reply._id} className="flex flex-col items-end text-end">
                <span className="inline-flex gap-1 flex-nowrap whitespace-nowrap">
                  <Link href={`/u/${authorName}`} style={{ color: getRankColor(author!.rank?.name) }}>{authorName}</Link> replied to
                  <Link href={threadUrl} className="flex flex-col text-neutral">"{res.parent.title}"</Link>
                </span>
                <Link href={threadUrl} className="flex flex-col">
                  <small className="smaller">{toLocaleString(stringToDate(res.reply.createdAt))}</small>
                </Link>
              </small>
            ),
          };
        })
  )).filter(t => !!t) as any;
  const aside = [
    {
      title: 'Latest Threads',
      content: latestThreads,
    },
    {
      title: 'Latest Replies',
      content: latestReplies,
    },
  ]
  return <>
    <Navigation>
      <div className="flex flex-wrap-reverse h-full w-full gap-4">
        <div
          className="flex flex-col overflow-y-scroll overflow-x-hidden gap-3 rounded-lg min-h-[522px] h-[522px] w-full categories content">
          {!categories || !categories.length ?
            <span className="col-span-full w-full max-w-[996px] text-center my-4">{isError ?
              <h4>Error while fetching categories.</h4> : <small>0 categories in this forum.</small>}</span> :
            categories.map(c => <Category key={c._id} name={c.name} forums={c.forums}/>)
          }
        </div>
        <aside className="aside-container gap-3 w-full self-end">
          {aside.map((a, i) => <AsideInfo key={i} title={a.title} content={a.content}/>)}
        </aside>
      </div>
    </Navigation>
  </>;
}

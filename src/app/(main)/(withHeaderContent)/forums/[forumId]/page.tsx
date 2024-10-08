import Table from '@/components/Table/Table';
import ThreadComponent from './Thread';
import { GetForumThreads, GetThread } from '@/services/forum/thread/ThreadService';
import { GetForum } from '@/services/forum/forum/ForumService';
import { isResultError } from '@/libs/Utils';
import { getThreadShortId, threadSorter } from '../Utils';
import Navigation from "@/app/(main)/(withHeaderContent)/forums/(components)/Navigation";

interface Params {
  params: {
    forumId: string;
  }
}
export default async function Page({ params: { forumId } }: Params) {
  const res0 = await GetForumThreads(forumId);
  const isError = isResultError(res0);
  if (isError)
    console.error("Error while fetching threads from Id: HTTP " + res0[1]);
  const threads = res0[0];
  for (let t = 0; t < (threads?.length ?? 0); t++) {
    const res = await GetThread(threads![t]._id);
    const isError = isResultError(res);
    if (isError)
      console.error("Error while fetching thread replies: HTTP " + res[1]);
    threads![t].replies = res[0]?.replies ?? [];
  }

  const res1 = await GetForum(forumId);
  if (isResultError(res1))
    console.error("Error while fetching Forum: HTTP " + res1[1]);
  const forumDisplayName = res1[0]?.name;
  const header = [
    <small key={0} className="flex justify-start text-start smaller tracking-wider uppercase">{forumDisplayName}</small>,
    <small key={1} className="flex justify-center text-center smaller tracking-wider uppercase">Replies</small>,
    <small key={2} className="flex justify-end text-end smaller tracking-wider uppercase">Latest reply</small>
  ];
  const locked = res1[0]?.locked;
  return (
    <Navigation>
      <div
        className="flex flex-col overflow-y-scroll overflow-x-hidden gap-4 rounded-lg min-h-[579px] h-[579px] w-full categories">
        <Table headerContent={header}>
          {locked
            ? <span className="text-lg text-red-500 px-3">This Forum is Locked</span>
            : <></>}
          {!threads || !threads.length ?
            <span className="col-span-full text-center my-4">{isError ?
              <h4>Error while fetching threads for forum.</h4> :
              <small>0 threads in this forum. Be the first!</small>}</span> :
            threads.sort(threadSorter).map(t =>
              <ThreadComponent key={t._id} id={getThreadShortId(t._id)!}
                               authorId={t.author} title={t.title} createdAt={t.createdAt} replies={t.replies}
                               forumId={t.forum}/>
            )}
        </Table>
      </div>
    </Navigation>
  );
}

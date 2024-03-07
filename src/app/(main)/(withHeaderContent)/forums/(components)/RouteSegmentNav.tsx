import {GetForum} from "@/services/forum/forum/ForumService";
import {isResultError} from "@/libs/Utils";
import {GetThread} from "@/services/forum/thread/ThreadService";
import {IoHome} from "react-icons/io5";
import HashLink from "@/components/HashLink";
import {headers} from "next/headers";
import CreateThread from "@/app/(main)/(withHeaderContent)/forums/(components)/CreateThread/component";
import Link from "next/link";

interface Route { route: string, routeTitle: string, idx: number }
const RouteSegmentNav = async () => {
  const currPath = new URL(headers().get('x-url')!).pathname;
  const [forumId, threadId] = currPath?.split('/').slice(2);
  const routes: (Route | null)[] = [{route: '/forums', routeTitle: 'Forums', idx: 0}, null, null];

  if (!forumId) {
    routes[1] = null;
  } else {
    const r = await GetForum(forumId);
    if (isResultError(r)) {
      console.error("Error while fetching Forum: HTTP " + r[1]);
    } else {
      let title = r[0]!.name;
      if (title.length > 23)
        title = title.substring(0, 20) + "...";
      routes[1] = {route: `/forums/${forumId}`, routeTitle: title, idx: 1};
    }
  }

  if (!forumId || !threadId) {
    routes[2] = null;
  } else {
    const r = await GetThread(forumId + '.' + threadId);
    if (isResultError(r)) {
      console.error("Error while fetching Thread: HTTP " + r[1]);
    } else {
      let title = r[0]!.title;
      if (title.length > 23)
        title = title.substring(0, 20) + "...";
      routes[2] = {route: `/forums/${forumId}/${threadId}`, routeTitle: title, idx: 2};
    }
  }

  return <>
    <div className="flex w-full rounded-t-xl overflow-hidden border-[1px] border-base-300">
      <div className="flex-1 flex min-h-full text-base-200 font-semibold">
        <Link href="/" className="overflow-hidden ml-[-17px]">
          <div className="relative capitalize bg-neutral w-fit h-fit flex mr-[17px]">
            <span className="z-[2] py-1 pl-6 w-full"><IoHome className="mr-1 h-[21px] w-[21px]"/></span>
            <div className="z-[1] h-[23px] w-[23px] rotate-45 bg-neutral
                absolute top-[3px] right-[-12.5px] border-t-2 border-r-2 border-base-100"></div>
          </div>
        </Link>

        {routes.filter(r => !!r).map((r, i) =>
          <Link key={i} href={r!.route || '/'} className="overflow-hidden ml-[-17px]">
            <div className="relative capitalize bg-secondary w-fit h-fit flex mr-[17px]">
              <span className="z-[2] py-1 pl-6 w-full whitespace-nowrap">{r!.routeTitle}</span>
              <div className="z-[1] h-[23px] w-[23px] rotate-45 bg-secondary
                absolute top-[3px] right-[-12.5px] border-t-2 border-r-2 border-base-100"></div>
            </div>
          </Link>
        )}
      </div>
      {!!forumId && !threadId ?
        <div className="flex-none flex items-center">
          <CreateThread />
        </div> : <></>
      }
    </div>
  </>;
};

export default RouteSegmentNav;

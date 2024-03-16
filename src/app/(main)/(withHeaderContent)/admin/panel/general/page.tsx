import { getAllEntries } from "@/services/forum/websiteData/WebsiteDataService"
import DataForm from "./DataForm";
import { GetForum } from "@/services/forum/forum/ForumService";
import { GetForumThreads } from "@/services/forum/thread/ThreadService";
import Thread from "@/libs/types/entities/Thread";

export default async function Page() {

  const websiteData = await getAllEntries();
  const dataMap = websiteData.reduce<{[key:string]: string}>((acc,crr) => {
    acc[crr._id] = crr.value; return acc;}, {});

  const announcementsForum = (await GetForum("Announcements"))[0]

  let threads: Thread[];

  if (!announcementsForum) {
    threads = [];
  } else {
    threads = (await GetForumThreads(announcementsForum._id))[0] || [];
  }

  return <div className="flex flex-col gap-3 py-2 px-3">
    <div className="rounded-lg p-2 w-full bg-base-200">
      <h2 className="text-center font-bolder">Website Data</h2>
      <DataForm dataMap={dataMap} announcements={threads} />
    </div>
  </div>
}

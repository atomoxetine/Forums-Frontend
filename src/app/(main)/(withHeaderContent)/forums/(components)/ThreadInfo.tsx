
import { ServerMCHead } from '@/components/Minecraft/Server';
import HashLink from '@/components/HashLink';
import Rank from '@/libs/types/entities/Rank';
import { stringToDate, toLocaleString } from '@/libs/Utils';

interface ThreadInfoProps {
  id?: string
  forumId?: string;
  title?: string;
  createdAt?: string;
  threadAuthor?: {
    username?: string;
    rank?: Rank;
  };
}
const ThreadInfo = (props: ThreadInfoProps) => {
  const {id, forumId, title, threadAuthor, createdAt} = props;

  const getRankColor = (r?: string) => ({ // TODO: Properly get rank color
    Owner: "#9F000C",
    Developer: "#ff4141"
  }[r ?? '']) ?? "#ffffff"

  return (
    <small className="flex flex-col items-end text-end">
      <span className="inline-flex items-center">
        <span className="flex flex-col">
          <HashLink href={`/forums/${forumId}/${id}`} className="text-neutral">"{title}"</HashLink>
          <HashLink href={`/u/${threadAuthor?.username}`}>
            <span style={{color: getRankColor(threadAuthor?.rank?.name)}}>{threadAuthor?.username}</span>
          </HashLink>
        </span>
        <HashLink href={`/u/${threadAuthor?.username}`} className="w-[35px] h-[37px] ml-1 relative">
          <ServerMCHead shadowColor={getRankColor(threadAuthor?.rank?.name)} className="scale-y-50 scale-x-[-.5] absolute left-[-15px] top-[-18px]" username={threadAuthor?.username} />
        </HashLink>
      </span>
      <HashLink href={`/forums/${forumId}/${id}`}><small className="smaller">{toLocaleString(stringToDate(createdAt))}</small></HashLink>
    </small>
  );
}
export default ThreadInfo;
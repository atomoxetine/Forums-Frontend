import '../styles.css'
import TableEntry from '@/components/Table/TableEntry';
import HashLink from '@/components/HashLink';
import Thread from '@/libs/types/entities/Thread';
import Rank from '@/libs/types/entities/Rank';
import ThreadInfo from './ThreadInfo';

export interface ActivityData {
  thread: {
    id: string;
    title: string;
  };
  author: {
    username: string;
    rank: string;
  };
  time: string;
}

export interface ForumData {
  id: string;
  name: string;
  description: string;
  category: number;
  categoryName: string;
  threadAmount: number;
  lastThread?: Thread;
  lastThreadAuthor?: {username: string, rank?: Rank};
}
const Forum = async (props: ForumData) => {
  const {id, name, description, threadAmount, lastThread, lastThreadAuthor} = props;
  const lastThreadId = lastThread?._id;

  return (
    <TableEntry>
      <HashLink href={`/forums/${id}`} className="h-fit w-fit">
        <small className="flex flex-col items-start text-start text-neutral">
          {name}
          <small className="smaller">
            {description}
          </small>
        </small>
      </HashLink>

      <small className="flex justify-center text-center">{threadAmount}</small>
      
      <span className="h-fit w-fit justify-self-end">
        {lastThread ?
          <ThreadInfo id={lastThreadId} forumId={id} threadAuthor={lastThreadAuthor!} title={lastThread.title} createdAt={lastThread.createdAt}/> : (
            <span className="flex flex-col items-end text-end">
              <small className="smaller">None.</small>
            </span>
        )}
      </span>
    </TableEntry>
  );
}
export default Forum;
import './styles.css'
import TableEntry from './Table/TableEntry';
import HashLink from '@/components/HashLink';

export interface ActivityData {
  thread: {
    id: string;
    title: string;
  };
  user: string;
  time: string;
}
export interface SubforumData {
  id: string;
  title: string;
  description: string;
  threadN: number;
  lastActivity: ActivityData;
}
const Subforum = (props: SubforumData) => {
  const {
    id, title, description, threadN,
    lastActivity: {
      thread,
      user,
      time
    }
  } = props;

  return (
    <TableEntry>
      <HashLink href={`/forums/${id}`} className="h-fit w-fit">
        <small className="flex flex-col items-start text-start text-neutral">
          {title}
          <small className="smaller">
            {description}
          </small>
        </small>
      </HashLink>

      <small className="flex justify-center text-center">{threadN}</small>
      
      <HashLink href={`/forums/${id}/${thread.id}`} className="h-fit w-fit justify-self-end">
        <small className="flex flex-col items-end text-end">
          <span className="text-neutral">{thread.title}</span>
          <span className="text-primary">{user}</span>
          <small className="smaller">{time}</small>
        </small>
      </HashLink>
    </TableEntry>
  );
}
export default Subforum;
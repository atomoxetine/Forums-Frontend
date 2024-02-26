import TableEntry from './/Table/TableEntry';
import NavLink from '@/components/NavLink/component';
import { stringToDate, toLocaleString } from '@/libs/Utils';
import {getAuthorInfo} from '../Utils';

export interface ThreadData {
  id: string;
  authorId: string; // UUID
  createdAt: string;
  lastUpdatedAt: string;
  category: string;
  message: string;
  status: string;
  classname?: string;
}
const TicketComponent = async (props: ThreadData) => {
  const {
    id,
    authorId,
    createdAt,
    lastUpdatedAt,
    category,
    message,
    status,
    classname
  } = props;
  const author = await getAuthorInfo(authorId);

  const getRankColor = (r?: string) => ({ // TODO: Properly get rank color
    Owner: "#9F000C",
    Developer: "#ff4141"
  }[r ?? '']) ?? "#ffffff"

  return (
    <TableEntry className={classname}>
      <small className="w-[85%] text-center inline-flex items-center justify-center bg-secondary text-secondary-content p-0.5 rounded-xl border-2 border-primary whitespace-nowrap">{status}</small>

      <NavLink href={`/support/${id}`} className="col-span-3 h-fit w-fit">
        <small>{message}</small>
      </NavLink>

      <small className="flex justify-start text-center">{category}</small>
      <small className="flex justify-start text-center">{toLocaleString(stringToDate(lastUpdatedAt))}</small>
      <small className="flex justify-start text-center">{toLocaleString(stringToDate(createdAt))}</small>


      <small className="flex flex-col items-end text-end">
        <NavLink href={`/u/${author?.username}`}
                 style={{color: getRankColor(author?.rank?.name)}}>{author?.username}</NavLink>
      </small>
    </TableEntry>
  );
}
export default TicketComponent;

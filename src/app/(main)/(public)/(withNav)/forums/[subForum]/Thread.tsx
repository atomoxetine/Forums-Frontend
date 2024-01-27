import MCHead from '@/components/Minecraft/MCHead';
import TableEntry from '../(components)/Table/TableEntry';

export interface ThreadData {
  id: string;
  author: {
    username: string;
    rank: string;
  };
  title: string;
  time: string;
  replyN: number;
  lastReply: {
    author: string;
    time: string;
  }
  subForum: string;
}
const Thread = (props: ThreadData) => {
  const {
    id,
    author,
    title,
    time,
    replyN,
    lastReply,
    subForum,
  } = props;

  const rankColor: string = {
    owner: "#9F000C",
    developer: "#ff4141"
  }[author.rank] ?? "#ffffff"

  const header = [
    <small key={0} className="flex justify-start text-start smaller tracking-wider uppercase">{subForum}</small>,
    <small key={1} className="flex justify-center text-center smaller tracking-wider uppercase">Replies</small>,
    <small key={2} className="flex justify-end text-end smaller tracking-wider uppercase">Latest reply</small>
  ];
  return (
    <TableEntry href={`/forums/${subForum}/${id}`}>
      <span className="inline-flex flex-row gap-2">
        <div className="w-[35px] h-[37px] relative">
          <MCHead shadowColor={rankColor} className="scale-[.5] absolute left-[-15px] top-[-13px]" username={author.username} />
        </div>
        <small className="flex flex-col justify-center items-start text-start">
          <small className="text-neutral">{title}</small>
          <small className="flex flex-col items-start">
            <span className="inline-flex gap-1">Posted by <span style={{color: rankColor}}>{author.username}</span></span>
            <small className="smaller">{time}</small></small>
        </small>
      </span>

      <small className="flex justify-center text-center">{replyN}</small>

      <small className="flex flex-col items-end text-end text-neutral">
        {lastReply.author}
        <small className="smaller">
          {lastReply.time}
        </small>
      </small>
    </TableEntry>
  );
}
export default Thread;
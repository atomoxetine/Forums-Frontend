import Table from '../(components)/Table/Table';
import Thread, { ThreadData } from './Thread';

interface Params {
  params: {
    subForum: string
  }
}
export default function Page({ params: { subForum } }: Params) {
  const threads: ThreadData[] = [
    {
      id: "1",
      author: {
        username: "Oestradiol",
        rank: "developer",
      },
      title: "Meow",
      time: "2 minutes ago",
      replyN: 1,
      lastReply: {
        author: "OhEmilyy",
        time: "mmmmf~ mommy~ ah~",
      },
      subForum: "announcements",
    },
  ];

  const header = [
    <small key={0} className="flex justify-start text-start smaller tracking-wider uppercase">{subForum}</small>,
    <small key={1} className="flex justify-center text-center smaller tracking-wider uppercase">Replies</small>,
    <small key={2} className="flex justify-end text-end smaller tracking-wider uppercase">Latest reply</small>
  ];
  return (
    <div className="flex flex-col overflow-y-scroll overflow-x-hidden w-screen gap-4 rounded-lg min-h-[579px] h-[579px] w-screen categories content">
      <Table headerContent={header}>
        {threads.map((t, i) =>
          <Thread key={i} id={t.id} author={t.author} title={t.title} time={t.time} replyN={t.replyN} lastReply={t.lastReply} subForum={t.subForum}/>
        )}
      </Table>
    </div>
  );
}
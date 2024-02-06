import Thread from '@/libs/types/entities/Thread';
import Table from '@/components/Table/Table';
import TableEntry from '@/components/Table/TableEntry';

export interface AsideInfoProps {
  title: string;
  content: {
    thread: Thread;
    item: JSX.Element;
  }[];
}
const AsideInfo = (props: AsideInfoProps) => {
  const {title, content} = props;

  const headerContent = [
    <small key={0} className="col-span-3 flex justify-center text-center smaller tracking-wider uppercase px-4 rounded-t-lg">
      {title}
    </small>,
  ]
  return (
    <Table headerContent={headerContent}>
      {content.map(c => 
        <TableEntry key={c.thread._id}>
          {c.item}
        </TableEntry>
      )}
    </Table>
  );
}
export default AsideInfo;
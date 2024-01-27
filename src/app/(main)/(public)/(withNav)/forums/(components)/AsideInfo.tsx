import Table from './Table/Table';
import TableEntry from './Table/TableEntry';
import './styles.css'

export interface AsideInfoProps {
  title: string;
  content: JSX.Element[];
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
      {content.map((c, i) => 
        <TableEntry>
          <small key={i} className="col-span-3 flex flex-col items-end text-end rounded-lg font-semibold">{c}</small>
        </TableEntry>
      )}
    </Table>
  );
}
export default AsideInfo;
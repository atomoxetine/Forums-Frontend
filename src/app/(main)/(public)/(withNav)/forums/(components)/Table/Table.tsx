import TableHeader from './TableHeader';
import './styles.css'

export interface TableData {
  headerContent: JSX.Element[];
  children: React.ReactNode;
}
const Table = (props: TableData) => {
  const {
    headerContent,
    children
  } = props;

  return (
    <div className="table-grid bg-base-100 gap-y-3 pb-3 rounded-lg" style={{gridTemplateColumns: `repeat(${headerContent.length}, 1fr)`}}>
      <TableHeader>{headerContent}</TableHeader>
      {children}
    </div>
  );
}
export default Table;
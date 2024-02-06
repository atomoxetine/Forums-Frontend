import './styles.css'

export interface TableEntryData {
  children: React.ReactNode;
  className?: string;
}
const TableEntry = (props: TableEntryData) => {
  const {
    children,
    className
  } = props;

  return (
    <div className={`table-entry col-span-full grid grid-cols-subgrid items-center py-2 px-3 mx-3 bg-base-200 font-semibold rounded-lg ${className || ''}`}>
      {children}      
    </div>
  );
}
export default TableEntry;
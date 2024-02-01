import './styles.css'

export interface HeaderData {
  children: React.ReactNode;
}
const Header = (props: HeaderData) => {
  const {
    children
  } = props;

  return (
    <div className="table-header col-span-full grid grid-cols-subgrid py-1 px-2 bg-base-200 rounded-t-lg">
      {children}
    </div>
  );
}
export default Header;
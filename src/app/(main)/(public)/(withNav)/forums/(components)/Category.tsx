import Subforum, { SubforumData } from './Subforum';
import './styles.css'
import Table from './Table/Table';

export interface CategoryData {
  title: string;
  subforums: SubforumData[];
}
const Category = (props: CategoryData) => {
  const {
    title,
    subforums
  } = props;

  const header = [
    <small key={0} className="flex justify-start text-start smaller tracking-wider uppercase">{title}</small>,
    <small key={1} className="flex justify-center text-center smaller tracking-wider uppercase">Threads</small>,
    <small key={2} className="flex justify-end text-end smaller tracking-wider uppercase">Latest thread</small>
  ];
  return (
    <Table headerContent={header}>
      {subforums.map((sf, i) => 
        <Subforum key={i} id={sf.id} title={sf.title} description={sf.description} threadN={sf.threadN} lastActivity={sf.lastActivity}/>
      )}
    </Table>
  );
}
export default Category;
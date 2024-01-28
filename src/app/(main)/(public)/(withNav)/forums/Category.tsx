import Forum from '@/libs/types/entities/Forum';
import './styles.css'
import Table from './(components)/Table/Table';
import ForumComponent from './Forum';
import { getAuthorInfo } from './Utils';

export interface CategoryData {
  name: string;
  forums: Forum[];
}
const Category = async (props: CategoryData) => {
  const {
    name,
    forums
  } = props;

  const forumComponents: React.ReactNode[] = [];
  for (const sf of forums) {
    forumComponents.push(
      <ForumComponent key={`${sf._id}`}
        id={`${sf._id}`}
        category={sf.category}
        categoryName={sf.categoryName}
        name={sf.name}
        description={sf.description}
        threadAmount={sf.threadAmount}
        lastThread={sf.lastThread}
        lastThreadAuthor={await getAuthorInfo(sf.lastThread?.author)}
      />
    );
  }

  const header = [
    <small key={0} className="flex justify-start text-start smaller tracking-wider uppercase">{name}</small>,
    <small key={1} className="flex justify-center text-center smaller tracking-wider uppercase">Threads</small>,
    <small key={2} className="flex justify-end text-end smaller tracking-wider uppercase">Latest thread</small>
  ];
  return (
    <Table headerContent={header}>
      {!forums || !forums.length ? <small className="col-span-full text-center my-4">0 forums in this category.</small> : forumComponents}
    </Table>
  );
}
export default Category;
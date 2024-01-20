'use client';
import './styles.css';
import NavLink from "@/components/NavLink/component";
import useHash from "@/hooks/useHash";
import { usePathname } from 'next/navigation';

interface CategoryProps {
  title: string;
  buttons: {
    text: string;
    route: string;
  }[];
}
const Category = ({ title: title, buttons: buttons }: CategoryProps) => {
  const currRoute = usePathname() + useHash();
  return (
    <div className="flex-auto relative rounded-md overflow-hidden bg-base-300">
      <h6 className="flex items-center justify-center text-center h-fit bg-base-300 p-2 border-b-2 border-base-100">
        {title}
      </h6>
      <div className="flex flex-col whitespace-nowrap gap-2 p-4">
        {
          buttons.map((b, i) =>
            <NavLink key={i} className="btn btn-secondary py-2 px-4 min-h-fit h-fit w-full" currRoute={currRoute} href={b.route}>
              <p>{b.text}</p>
            </NavLink> 
          )
        }
      </div>
    </div>
  );
};
export default Category;
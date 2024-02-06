import './styles.css';
import NavLink from "@/components/NavLink/component";

interface CategoryProps {
  className?: string;
  title: string;
  buttons: {
    text: string;
    route: string;
  }[];
}
const Category = ({ className: className, title: title, buttons: buttons }: CategoryProps) => {
  return (
    <div className={`flex-auto rounded-md overflow-hidden bg-base-200 ${className ?? ''}`}>
      <h6 className="flex items-center justify-center text-center h-fit bg-base-100 p-2 border-b-2 border-base-100">
        {title}
      </h6>
      <div className="flex flex-col justify-between whitespace-nowrap gap-2 p-4">
        {
          buttons.map((b, i) =>
            <NavLink key={i} className="btn btn-secondary py-2 px-4 min-h-fit h-fit w-full" href={b.route}>
              <p>{b.text}</p>
            </NavLink> 
          )
        }
      </div>
    </div>
  );
};
export default Category;
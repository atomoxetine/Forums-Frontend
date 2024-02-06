import './styles.css';
import HeaderContent from './HeaderContent'
import Header from '../(layout-components)/Header';
import RouteSegmentNav from "@/app/(main)/(withHeaderContent)/forums/(components)/RouteSegmentNav";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
    <div className="flex flex-col items-center justify-between w-full">
      <HeaderContent/>
      <Header/>
      <div className="flex flex-col justify-center items-center w-full p-4">
        {children}
      </div>
    </div>
  </>;
}
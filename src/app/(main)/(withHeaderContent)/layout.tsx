import './styles.css';
import HeaderContent from './HeaderContent'
import Header from '../(layout-components)/Header';
import RouteSegmentNav from "@/app/(main)/(withHeaderContent)/forums/(components)/RouteSegmentNav";
import getSession from '@/libs/session/getSession';
import { getHighestRank } from '@/services/controller/GrantService';

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession();
  const isStaff = (await getHighestRank(session.uuid))?.staff || false;

  return <>
    <div className="flex flex-col items-center justify-between w-full">
      <HeaderContent/>
      <Header isStaff={isStaff} />
      <div className="flex flex-col justify-center items-center w-full p-4">
        {children}
      </div>
    </div>
  </>;
}

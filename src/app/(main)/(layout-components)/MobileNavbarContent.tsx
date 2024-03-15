import NavLinks from './NavLinks';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import UserDropdown from './UserDropdown';
import getSession from '@/libs/session/getSession';
import { getHighestRank } from '@/services/controller/GrantService';

const MobileNavbarContent = async () => {
  const session = await getSession();
  const isStaff = (await getHighestRank(session.uuid))?.staff || false;

  return <>
    <Logo href={'/'} />

    <div className="uppercase flex flex-col w-full h-full mt-24 gap-7">
      <NavLinks isStaff={isStaff} />

      <div className="flex items-center justify-center w-fit h-fit mt-auto mx-auto gap-2">
        <UserDropdown className="bottom-[50px]" />
        <ThemeToggle />
      </div>
    </div>
  </>
}

export default MobileNavbarContent;

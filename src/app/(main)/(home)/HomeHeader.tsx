'use client';

import { useCallback } from 'react';
import ThemeToggle from "@/components/ThemeToggle";
import { MobileNavToggle } from "@/components/MobileNavbar/component";
import ShrinkableSearch from "@/components/ShrinkableSearch/component";
import NavLinks from '../(layout-components)/NavLinks';
import UserDropdown from '../(layout-components)/UserDropdown';
import Logo from '@/components/Logo';

export interface Props {
  isStaff: boolean
}

const Header = (props: Props) => {
  const { isStaff } = props;

  const defaultVal = useCallback(() => (['', ''] as [string, string]), []);

  return (
    <header className="w-full h-fit">
      <div className="relative bg-banner bg-full h-96 flex-none w-full flex justify-center items-center brightness-[110%]">
        <div className="h-full w-full filter-home absolute"></div>
        <Logo className="brightness-[112%]" href='/'/>
      </div>

      <div className="home-inner">
        <div className="content uppercase flex items-center justify-between h-full w-full max-w-screen-xl mx-auto px-2 sm:px-8 gap-2 sm:gap-6 text-gray-200 font-bold">

          <MobileNavToggle />

          <div className="flex flex-row items-center gap-8">
            <NavLinks isStaff={isStaff} />
          </div>

          <div className="flex flex-row items-center sm:gap-2">
            <ShrinkableSearch />

            <UserDropdown className="top-[50px]"/>

            <ThemeToggle className="theme-toggle ml-2" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

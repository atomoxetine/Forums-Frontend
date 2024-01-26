'use client';
import './styles.css'
import NavLinks, { UserNav } from "./NavLinks";
import ThemeToggle from "@/components/ThemeToggle";
import { MobileNavToggle } from "@/components/MobileNavbar/component";
import ShrinkableSearch from "@/components/ShrinkableSearch/component";
import UserDropdown from "./UserDropdown"
import useTheme from '@/hooks/useTheme';
import useGlobal from '@/hooks/useGlobal';
import { useCallback } from 'react';

const Header = () => {
  const [theme] = useTheme('dark');
  const isDark = theme !== 'light';
  const textColor = isDark ? "text-neutral-950" : "text-neutral-300"
  const defaultVal = useCallback(() => (['', ''] as [string, string]), []);
  const [headerContent] = useGlobal<[string, string]>('headerContent', defaultVal);

  return (
    <header className="w-full h-fit">
      <div className="bg-img bg-full h-48 w-full flex justify-center items-center">
        <span className={`mt-12 gap-1 flex flex-col text-center uppercase tracking-widest font-bold ${textColor}`}>
          <h3>{headerContent?.[0]}</h3>
          <small>{headerContent?.[1]}</small>
        </span>
      </div>

      <div className="inner">
        <div className={textColor +
          " content uppercase flex items-center justify-between h-full w-full max-w-screen-xl mx-auto px-2 sm:px-8 gap-2 sm:gap-6"
        }>
          <MobileNavToggle />

          <div className="flex flex-row items-center gap-8">
            <NavLinks />
          </div>

          <div className="flex flex-row items-center sm:gap-2">
            <ShrinkableSearch />

            <UserDropdown className="top-[50px]"/>
            <UserNav />

            <ThemeToggle className="theme-toggle ml-2" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
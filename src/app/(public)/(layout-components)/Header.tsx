'use client';
import './styles.css'
import NavLinks, { UserNav } from "./NavLinks";
import ThemeToggle from "@/components/ThemeToggle";
import { MobileNavToggle } from "@/components/MobileNavbar/component";
import ShrinkableSearch from "@/components/ShrinkableSearch/component";
import UserDropdown from "./UserDropdown"
import useTheme from '@/hooks/useTheme';

const Header = () => {
  const [theme] = useTheme('dark');
  const isDark = theme !== 'light';
  
  return (
    <header className="w-full h-fit">
      <div className="bg-img bg-full pt-40 w-full"/>

      <div className="inner">
        <div className={(isDark ? "text-neutral-300" : "text-neutral-950") +
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
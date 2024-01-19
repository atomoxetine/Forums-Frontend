import './styles.css'
import NavLinks, { UserNav } from "./NavLinks";
import ThemeToggle from "@/components/ThemeToggle";
import { MobileNavToggle } from "@/components/MobileNavbar/component";
import ShrinkableSearch from "@/components/ShrinkableSearch/component";
import UserDropdown from "./UserDropdown"

const Header = () => {
  return (
    <header>
      <div className="header-content uppercase text-accent-content flex items-center justify-between h-full w-full max-w-screen-xl mx-auto px-2 sm:px-8 gap-2 sm:gap-6">
        <MobileNavToggle />

        <div className="flex flex-row items-center gap-8">
          <NavLinks />
        </div>

        <div className="flex flex-row items-center sm:gap-2">
          <ShrinkableSearch />

          <UserDropdown className="bottom-[-75px]"/>
          <UserNav />

          <ThemeToggle className="theme-toggle ml-2" />
        </div>
      </div>
    </header>
  );
};

export default Header;
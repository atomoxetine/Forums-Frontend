import NavLinks from './NavLinks';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';

const MobileNavbarContent = () => <>
  <Logo href={'/'} />

  <div className="flex flex-col w-full h-full mt-24 gap-7">
    <NavLinks />
    <ThemeToggle className="mt-auto mx-auto" />
  </div>  
</>;

export default MobileNavbarContent;
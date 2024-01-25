'use client';
import './styles.css'
import HashLink from "../HashLink";
import { usePathname } from 'next/navigation';
import useHash from '@/hooks/useHash';

const NavLink = (props: { href: string; className?: string; children: any }) => {
  const { href, children } = props;
  const currRoute = usePathname() + useHash();

  return (
    <HashLink href={href} className={`navlink ${props.className || ''}` + (currRoute == href ? " active" : "")}>
      {children}
    </HashLink>
  );
}
export default NavLink;

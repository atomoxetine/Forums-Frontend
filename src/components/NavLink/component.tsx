'use client';
import './styles.css'
import HashLink from "../HashLink";
import { usePathname } from 'next/navigation';
import useHash from '@/hooks/useHash';
import {CSSProperties} from "react";

const NavLink = (props: { href: string; className?: string; children: any; style?: CSSProperties }) => {
  const { href, children } = props;
  const currRoute = usePathname() + useHash();

  return (
    <HashLink style={props.style} href={href} className={`navlink ${props.className || ''}` + (currRoute == href ? " active" : "")}>
      {children}
    </HashLink>
  );
}
export default NavLink;

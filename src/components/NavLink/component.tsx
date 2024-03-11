'use client';
import './styles.css'
import { usePathname } from 'next/navigation';
import {CSSProperties} from "react";
import Link from 'next/link';

const NavLink = (props: { href: string; className?: string; children: any; style?: CSSProperties }) => {
  const { href, children } = props;
  const currRoute = usePathname();

  const isActive = href!="/"
    ? currRoute.startsWith(href)
    : currRoute == href;

  return (
    <Link style={props.style} href={href} className={`navlink ${props.className || ''}` + (isActive ? " active" : "")}>
      {children}
    </Link>
  );
}
export default NavLink;

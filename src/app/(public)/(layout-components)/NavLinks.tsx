'use client';
import useHash from "@/hooks/useHash";
import NavLink from "@/components/NavLink/component";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const currRoute = usePathname() + useHash();
  const navLinks = [
    { href: "/", text: "Home", icon: <></> },
    { href: "/forums", text: "Forums", icon: <></>},
    { href: "/staff", text: "Staff", icon: <></>},
    { href: "/support", text: "Support", icon: <></>},
    { href: "/radio", text: "Radio", icon: <></>},
    { href: "/store", text: "Store", icon: <></>},
  ];

  return <>
    {navLinks.map((navLink, i) => 
      <NavLink key={i} currRoute={currRoute} href={navLink.href}>
        {navLink.icon} <h6>{navLink.text}</h6>
      </NavLink> 
    )}
  </>;
};

export default NavLinks;
  
export const UserNav = () => {
  const currRoute = usePathname() + useHash();
  return <>
    <NavLink currRoute={currRoute} href="/login"><h6>Login</h6></NavLink>
    <NavLink currRoute={currRoute} href="/register"><h6>Register</h6></NavLink>
  </>;
}
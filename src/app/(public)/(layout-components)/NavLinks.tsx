'use client';
import useHash from "@/hooks/useHash";
import NavLink from "@/components/NavLink/component";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import useSession from "@/hooks/useSession";

const NavLinks = () => {
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
      <NavLink key={i} href={navLink.href}>
        {navLink.icon} <h6>{navLink.text}</h6>
      </NavLink> 
    )}
  </>;
};

export default NavLinks;
  
export const UserNav = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {session, logout} = useSession();

  const logoutCall = useCallback(() => {
    setIsLoading(true);
    logout().then(() => {
      setIsLoading(false);
    });
  }, [logout]);

  return isLoading ? (
    <ClipLoader color={'#fff'} size={25} />
  ) : <>
    {
      !session?.isLoggedIn ? 
        <>
          <NavLink href="/auth/login"><h6>Login</h6></NavLink>
          <NavLink href="/auth/register"><h6>Register</h6></NavLink>
        </> :
        <Link href="" className="navlink" onClick={logoutCall}><h6>Logout</h6></Link>
    }
  </>;
}
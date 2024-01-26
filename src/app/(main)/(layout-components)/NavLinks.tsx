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
          <NavLink href="/auth/login"><small className="font-semibold">Login</small></NavLink>
          <NavLink href="/auth/register"><small className="font-semibold">Register</small></NavLink>
        </> :
        <>
          <NavLink className="navlink" href="/u"><small className="font-semibold">Profile</small></NavLink>
          <NavLink className="navlink" href="/account/settings"><small className="font-semibold">Settings</small></NavLink>
          <Link href="" className="navlink" onClick={logoutCall}><small className="font-semibold">Logout</small></Link>
        </>
    }
  </>;
}
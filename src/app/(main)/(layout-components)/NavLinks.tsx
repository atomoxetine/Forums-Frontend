'use client';
import NavLink from "@/components/NavLink/component";
import { useCallback, useState } from "react";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import useSession from "@/hooks/useSession";
import { usePathname } from "next/navigation";

export interface Props {
  isStaff: boolean
}
const NavLinks = (props: Props) => {
  const { isStaff } = props;

  const navLinks = [
    { href: "/", text: "Home", icon: <></> },
    { href: "/forums", text: "Forums", icon: <></> },
    { href: "/staff", text: "Staff", icon: <></> },
    { href: "/support", text: "Support", icon: <></> },
  ];

  if (isStaff) 
    navLinks.push({ href: "/admin/panel", text: "Staff Panel", icon: <></> });
  

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
  const { session, logout } = useSession();
  const path = usePathname();

  const logoutCall = useCallback(() => {
    setIsLoading(true);
    logout().then(() => {
      setIsLoading(false);
    });
  }, [logout]);

  const params = new URLSearchParams({ redirect: path })
  return isLoading ? (
    <ClipLoader color={'#fff'} size={25} />
  ) : <>
    {
      !session?.isLoggedIn ?
        <>
          <NavLink href={`/auth/login` + (path ? `?${params}` : '')}><small className="font-semibold">Login</small></NavLink>
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

'use client';
import useHash from "@/hooks/useHash";
import HashLink from "@/components/HashLink";
import { usePathname } from "next/navigation";
import { FaBlog, FaSatellite, FaSatelliteDish, FaUserAstronaut } from "react-icons/fa6";
import { FaGlobeAmericas } from "react-icons/fa";

const NavLinks = () => {
  const currRoute = usePathname() + useHash();
  const navLinks = [
    { href: "/dashboard", text: "Dashboard", icon: <FaSatellite className="w-4 h-4" /> },
    { href: "/blog", text: "Blog", icon: <FaBlog className="w-5 h-5" /> },
    { href: "https://uptime.pinkcloud.studio", text: "Uptime", icon: <FaSatelliteDish className="w-5 h-5" /> },
    { href: "/services", text: "Services", icon: <FaGlobeAmericas className="w-5 h-5" /> },
    { href: "/crew", text: "Crew", icon: <FaUserAstronaut className="w-5 h-5" /> },
  ];

  return <>
    {navLinks.map((navLink, i) => 
      <NavLink key={i} currRoute={currRoute} href={navLink.href} text={navLink.text} icon={navLink.icon} />
    )}
  </>;
};

export default NavLinks;

const NavLink = (props: { currRoute: string; href: string; text: string; icon: JSX.Element }) => {
  const { currRoute, href, text, icon } = props;
  return (
    <HashLink href={href} className={"navlink" + (currRoute == href ? " active" : "")}>
      {icon} <h6>{text}</h6>
    </HashLink>
  );
}
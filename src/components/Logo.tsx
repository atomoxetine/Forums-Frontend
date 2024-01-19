import { Url } from "next/dist/shared/lib/router/router";
import { FaCloud } from "react-icons/fa6";
import HashLink from "./HashLink";

const Logo = (props: { href: Url; className?: string; }) => (
  <HashLink href={props.href} className={"flex flex-col w-fit h-fit font-bold tracking-wider logo-overrides " + (props.className || '')}>
    <span className="flex items-center justify-center text-primary p-0">
      <h3>Pink</h3>
      <h3 className="flex items-center justify-center">
        Cl<FaCloud className="mx-0.5 mt-1 cloud-filter"/>ud
      </h3>
    </span>
    <small className="smaller pl-0.5 pb-2 whitespace-nowrap">We provide you with the best.</small>
  </HashLink>
);

export default Logo;
import { Url } from "next/dist/shared/lib/router/router";
import HashLink from "./HashLink";
import Image from "next/image";

const Logo = (props: { href: Url; className?: string; }) => (
  <HashLink href={props.href} className={"w-fit h-fit " + (props.className || '')}>
    <div className="header-logo">
      <Image width={256} height={144} src="/img/logo.png" alt="MCCade" />
    </div>
  </HashLink>
);

export default Logo;
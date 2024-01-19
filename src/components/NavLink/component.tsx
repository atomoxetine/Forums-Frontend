import './styles.css'
import HashLink from "../HashLink";

const NavLink = (props: { currRoute: string; href: string; className?: string; children: any }) => {
  const { currRoute, href, children } = props;
  return (
    <HashLink href={href} className={`navlink ${props.className || ''}` + (currRoute == href ? " active" : "")}>
      {children}
    </HashLink>
  );
}
export default NavLink;

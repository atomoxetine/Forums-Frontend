import HashLink from "@/components/HashLink";
import Logo from "@/components/Logo";
import { FaHeart } from "react-icons/fa6";

const Footer = () => (
  <footer className="w-full flex flex-col bg-base-200 border-t-2 border-base-300">
    <div className="flex flex-row flex-wrap justify-center w-full gap-12 md:gap-x-16 lg:gap-x-28 xl:gap-x-40 2xl:gap-52 p-12">
      <div className="flex flex-col justify-center items-center"><Logo href={'/'} /></div>

      <nav className="flex flex-row flex-wrap justify-between gap-12 md:gap-16 lg:gap-28 xl:gap-40 2xl:gap-52">
        <div className="links flex flex-col">
          <h6><b>Company</b></h6>
          <HashLink href="/about">About us</HashLink>
          <HashLink href="/contact">Contact</HashLink>
          <HashLink href="/talent">Careers</HashLink>
          <HashLink href="/press">Press Kit</HashLink>
        </div>

        <div className="links flex flex-col">
          <h6><b>Legal</b></h6>
          <HashLink href="/terms">Terms of Service</HashLink>
          <HashLink href="/privacy">Privacy Policy</HashLink>
          <HashLink href="/cookies">Cookie Policy</HashLink>
          <HashLink href="/taxes">Tax Policy</HashLink>
        </div>

        <div className="links flex flex-col">
          <h6><b>Services</b></h6>
          <HashLink href="/services">All Services</HashLink>
          <HashLink href="https://uptime.pinkcloud.studio">Service Status</HashLink>
          <HashLink href="https://billing.pinkcloud.studio">Billing</HashLink>
        </div>
      </nav>
    </div>

    <div className="flex flex-col w-full px-4 py-3 items-start bg-base-300 gap-2">
      <small>
        Made <span className="inline-flex items-end">
        with <FaHeart className="text-neutral mx-1 mb-0.5"/> by
        </span> Elaina.
        &copy; Copyright {`${new Date().getFullYear()}`}, PinkCloud Studios.
      </small>
    </div>
  </footer>
);

export default Footer;
import './styles.css'
import Image from "next/image";
import HashLink from "@/components/HashLink";
import { FaCloud, FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa6";

const Footer = () => (
  <footer className="w-full bg-base-300">
    <div className="w-full mx-auto flex flex-wrap items-center justify-between max-w-screen-xl gap-6 py-6 md:px-12">
      <div className="relative inline-flex flex-wrap justify-center items-center gap-4">
        <HashLink href="/">
          <Image className="w-20 mx-[-10px]" width={160} height={160} src="/img/logo-simple.png" alt="MCCade" />
        </HashLink>
        <div className="flex flex-col flex-wrap w-fit items-start gap-1">
          <span>
            &copy; Copyright {`${new Date().getFullYear()}`}
            , <span className="inline-flex items-center text-pink-500">
              PinkCl<FaCloud className="mt-0.5"/>ud
            </span> Studios.
          </span>
          <small>Not affiliated with Mojang Studios.</small>
        </div>
      </div>

      <div className="hidden divisor"></div>

      <nav className="links uppercase whitespace-nowrap flex flex-row flex-wrap justify-start gap-6 md:gap-10">
          <HashLink href="/status">Status</HashLink>
          <HashLink href="/staff">Staff</HashLink>
          <HashLink href="/rules">Rules</HashLink>
          <HashLink href="/terms">Terms of Service</HashLink>
          <HashLink href="/privacy">Privacy Policy</HashLink>
          <HashLink href="/faq">FAQ</HashLink>
      </nav>

      <nav className="links uppercase whitespace-nowrap flex flex-row flex-wrap justify-start gap-6">
          <HashLink href="/status"><FaTwitter className="w-6 h-6"/></HashLink>
          <HashLink href="/staff"><FaTelegram className="w-6 h-6"/></HashLink>
          <HashLink href="/rules"><FaDiscord className="w-6 h-6"/></HashLink>
      </nav>
    </div>
  </footer>
);

export default Footer;
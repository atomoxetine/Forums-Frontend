import './styles.css'
import Image from "next/image";
import Link from 'next/link';
import { FaCloud, FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa6";

const Footer = () => (
  <footer className="w-full bg-base-300">
    <div className="w-full mx-auto flex flex-wrap items-center justify-between max-w-screen-xl gap-6 py-6 md:px-12">
      <div className="relative inline-flex flex-wrap justify-center items-center gap-4">
        <Link href="/">
          <Image className="w-20 mx-[-10px]" width={160} height={160} src="/img/logo-simple.png" alt="MCCade" />
        </Link>
        <div className="flex flex-col flex-wrap w-fit items-start gap-1">
          <span>
            &copy; Copyright {`${new Date().getFullYear()}`}
            , Lunar<span className="inline-flex items-center text-yellow-500">
              Labs
            </span>.
          </span>
          <small>Not affiliated with Mojang Studios.</small>
        </div>
      </div>

      <div className="hidden divisor"></div>

      <nav className="links uppercase whitespace-nowrap flex flex-row flex-wrap justify-start gap-6 md:gap-10">
          <Link href="/status">Status</Link>
          <Link href="/staff">Staff</Link>
          <Link href="/rules">Rules</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
      </nav>

      <nav className="links uppercase whitespace-nowrap flex flex-row flex-wrap justify-start gap-6">
          <Link href="/status"><FaTwitter className="w-6 h-6"/></Link>
          <Link href="/staff"><FaTelegram className="w-6 h-6"/></Link>
          <Link href="/rules"><FaDiscord className="w-6 h-6"/></Link>
      </nav>
    </div>
  </footer>
);

export default Footer;

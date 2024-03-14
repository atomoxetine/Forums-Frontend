import './styles.css';
import MobileNavbar from '@/components/MobileNavbar/component';
import MobileNavbarContent from './(layout-components)/MobileNavbarContent';
import Footer from './(layout-components)/Footer';
import HTTPClient from '@/libs/HTTPClient';
import { isResultError } from '@/libs/Utils';

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
    <MobileNavbar
      className="flex flex-col items-center text-center p-6 w-3/5 h-full backdrop-filter backdrop-blur-sm"
      content={<MobileNavbarContent />}
    />
    <main className="flex flex-col items-center justify-between w-full h-full min-h-screen overflow-y-auto overflow-x-hidden relative">
      {children}
      <Footer />
    </main>
  </>;  
}

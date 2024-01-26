import './styles.css';
import Header from './(layout-components)/Header';
import MobileNavbar from '@/components/MobileNavbar/component';
import MobileNavbarContent from './(layout-components)/MobileNavbarContent';
import Footer from './(layout-components)/Footer';

export default function AuthLayout({
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
      <Header />
      {children}
      <Footer />
    </main>
  </>;  
}
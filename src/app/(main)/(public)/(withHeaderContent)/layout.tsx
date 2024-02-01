import './styles.css';
import Header from '../(layout-components)/Header';
import HeaderContent from './HeaderContent'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
    <div className="flex flex-col items-center justify-between w-full h-screen">
      <Header />
      <HeaderContent />
      {children}
    </div>
  </>;  
}
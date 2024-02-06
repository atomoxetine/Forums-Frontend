import './styles.css'
import HeaderContext from '@/components/HeaderContext';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerContent: [string, string] = ["", ``];
  return <>
    <HeaderContext setTo={headerContent}/>

    <div className="template rounded-t-lg overflow-hidden my-auto">
      {children}
    </div>
  </>;
}
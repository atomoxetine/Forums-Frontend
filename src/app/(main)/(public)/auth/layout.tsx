import HeaderContext from '@/components/HeaderContext';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerContent: [string, string] = ["", ``];
  return <>
    <HeaderContext setTo={headerContent}/>
    {children}
  </>;  
}
import HeaderContext from '@/components/HeaderContext';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerContent: [string, string] = ["Forums", `See what's going on and interact with the community!`];
  return <>
    <HeaderContext setTo={headerContent}/>
    {children}
  </>;  
}
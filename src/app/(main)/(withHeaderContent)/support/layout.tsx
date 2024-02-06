import HeaderContext from '@/components/HeaderContext';
import './styles.css'

export const revalidate = 5;
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerContent: [string, string] = ["Tickets", `Here's where we help you`];
  return <>
    <HeaderContext setTo={headerContent}/>
    <div className="sect flex justify-center items-center w-full h-fit">{children}</div>
  </>;
}
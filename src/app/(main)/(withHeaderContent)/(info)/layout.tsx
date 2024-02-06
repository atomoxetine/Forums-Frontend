import HeaderContext from '@/components/HeaderContext';
import Category from './Category';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = [
    {
      title: "Rules",
      buttons: [
        { text: "Global Guidelines", route: "/rules/global"},
        { text: "Forum Guidelines", route: "/rules/forum"},
        { text: "Network Guidelines", route: "/rules/network"},
      ]
    },
    {
      title: "Legal",
      buttons: [
        { text: "Terms of Service", route: "/terms"},
        { text: "Privacy Policy", route: "/privacy"},
      ]
    },
    {
      title: "Other",
      buttons: [
        { text: "FAQ", route: "/faq"},
      ],
      className: "col-span-full",
    }
  ];
  
  const headerContent: [string, string] = ["Information", `Here you can gather some info on us and our policies.`];
  return <>
    <HeaderContext setTo={headerContent}/>

    <div className="flex h-fit w-fit inner p-2 gap-4 bg-base-300 rounded-xl">
      <div className="grid-categories gap-4 w-full self-start">
        {categories.map((c, i) => <Category key={i} className={c.className} title={c.title}
                                            buttons={c.buttons}></Category>)}
      </div>
      <div
        className="h-[570px] w-screen max-w-[800px] overflow-y-scroll overflow-x-hidden bg-base-300 rounded-lg content">
        {children}
      </div>
    </div>
  </>;
}
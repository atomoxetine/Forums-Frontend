import HeaderContext from '@/components/HeaderContext';
import Category from './Category';

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = [
    {
      title: "Legal",
      buttons: [
        { text: "Terms of Service", route: "/terms"},
        { text: "Privacy Policy", route: "/privacy"},
      ]
    },
    {
      title: "Rules",
      buttons: [
        { text: "Global Guidelines", route: "/rules/global"},
        { text: "Forum Guidelines", route: "/rules/forum"},
        { text: "Network Guidelines", route: "/rules/network"},
      ]
    },
    {
      title: "Other",
      buttons: [
        { text: "FAQ", route: "/faq"},
      ]
    }
  ];
  
  const headerContent: [string, string] = ["Information", `Here you can gather some info on us and our policies.`];
  return <>
    <HeaderContext setTo={headerContent}/>
    <section className="flex flex-col justify-center items-center">
      <div className="flex h-min w-fit p-5 gap-4 inner">
        <div className="flex flex-col flex-wrap gap-4 categories">
          {categories.map((c, i) => <Category key={i} title={c.title} buttons={c.buttons}></Category>)}
        </div>
        <div className="h-[570px] w-screen max-w-100% overflow-y-scroll overflow-x-hidden p-6 bg-base-300 rounded-lg content">
          {children}
        </div>
      </div>
    </section>
  </>;  
}
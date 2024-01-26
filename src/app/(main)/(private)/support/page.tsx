import HeaderContext from "@/components/HeaderContext";

export default function Page() {
  const headerContent: [string, string] = ["Support", `If you ever need help.`];
  return <>
    <HeaderContext setTo={headerContent}/>
    <section className="flex flex-col justify-center items-center min-h-0">
      <div className="flex flex-row flex-wrap h-min w-full max-w-screen-xl inner bg-base-300 rounded-xl overflow-hidden p-2 gap-2">

      </div>
    </section>
  </>;
}
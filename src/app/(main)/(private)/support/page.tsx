import HeaderContext from "@/components/HeaderContext";

export default function Page() {
  const headerContent: [string, string] = ["Support", `If you ever need help.`];
  return <>
    <HeaderContext setTo={headerContent}/>
  </>;
}
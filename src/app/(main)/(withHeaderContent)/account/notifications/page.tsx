import HeaderContext from "@/components/HeaderContext";

export default function Page() {
  const headerContent: [string, string] = ["Notifications", `Here you can check what's important.`];
  return <>
    <HeaderContext setTo={headerContent}/>
  </>;
}

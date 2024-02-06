import HeaderContext from "@/components/HeaderContext";

export default function Page() {
  const headerContent: [string, string] = ["Settings", `Configure your account.`];
  return <>
    <HeaderContext setTo={headerContent}/>
  </>;
}
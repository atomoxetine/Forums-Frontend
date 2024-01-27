import HeaderContext from "@/components/HeaderContext";

export default function Page() {
  const headerContent: [string, string] = ["Radio", `Listen to the best of MC music. Let's feel some nostalgia?`];
  return <>
    <HeaderContext setTo={headerContent}/>
  </>;
}
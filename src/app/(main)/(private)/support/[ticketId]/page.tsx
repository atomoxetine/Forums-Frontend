import HeaderContext from "@/components/HeaderContext";
import React from "react";

export default function Page() {
  const headerContent: [string, string] = ["Ticket", `Check your ticket status.`];
  return <>
    <HeaderContext setTo={headerContent}/>
  </>;
}
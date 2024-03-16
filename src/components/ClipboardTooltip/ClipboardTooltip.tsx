'use client'

import { useRef } from "react";
import "./styles.css"

export interface Props {
  toCopy: string,
  children: any,
}

export default function ClipboardTooltip(props: Props) {
  const { toCopy, children } = props;

  const tooltip = useRef<HTMLDivElement>(null);
  const tooltipSpike = useRef<HTMLDivElement>(null);

  let tooltipFadeOut: NodeJS.Timeout | null = null;
  let tooltipFadeIn: NodeJS.Timeout | null = null;


  function copyToClipboard() {
    navigator.clipboard.writeText(toCopy);
    if (tooltip.current == null) return;
    tooltip.current.innerHTML = "Copied!";
    setTimeout(() => {
      if (tooltip.current == null) return;
      tooltip.current.innerHTML = "Copy to Clipboard";
    }, 5000);
  }

  function show() {
    if (tooltip.current == null) return;
    if (tooltipSpike.current == null) return;
    if (tooltipFadeIn != null) return;

    if (tooltipFadeOut != null) {
      clearTimeout(tooltipFadeOut);
      tooltipFadeOut = null;
    }

    tooltip.current.hidden = false;
    tooltipSpike.current.hidden = false;
    tooltipFadeIn = setTimeout(() => {
      if (tooltip.current == null) return;
      if (tooltipSpike.current == null) return;
      tooltip.current.style.opacity = "1";
      tooltipSpike.current.style.opacity = "1";
      tooltipFadeIn = null;
    }, 10);
  }

  function hide() {
    if (tooltip.current == null) return;
    if (tooltipSpike.current == null) return;
    if (tooltipFadeOut != null) return;

    if (tooltipFadeIn != null) {
      clearTimeout(tooltipFadeIn);
      tooltipFadeIn = null;
    }

    tooltip.current.style.opacity = "0";
    tooltipSpike.current.style.opacity = "0";
    tooltipFadeOut = setTimeout(() => {
      if (tooltip.current == null) return;
      if (tooltipSpike.current == null) return;
      tooltip.current.hidden = true;
      tooltipSpike.current.hidden = true;
      tooltipFadeOut = null;
    }, 300);
  }

  return <div className="relative">
    <a className="tooltip-link" onClick={copyToClipboard} onMouseEnter={show} onMouseLeave={hide}>
      {children}
    </a>
    <div
      hidden
      ref={tooltip}
      className="text-center transition-opacity duration-300 opacity-0 bg-base-200 p-2 font-bold w-[140px] h-fit border-gray-800 border-[3px] rounded-xl text-sm z-20 absolute top-[-50px]">
      Copy To Clipboard
    </div>
    <div
      hidden
      ref={tooltipSpike}
      className="tooltip-spike transition-opacity duration-300 opacity-0 border-t-[10px] border-t-gray-800 w-0 h-0 absolute top-[-12px] left-[50px] z-10"></div>
  </div>
}

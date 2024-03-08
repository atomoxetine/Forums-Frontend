'use client'

import Link from "next/link";
import { useRef } from "react";
import { FaDiscord, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

export interface Props {
  discord: string | undefined,
  instagram: string | undefined,
  youtube: string | undefined,
  twitter: string | undefined,
}

export default function SocialConnections(props: Props) {
  const { discord, instagram, youtube, twitter } = props;

  const tooltip = useRef<HTMLDivElement>(null);
  const tooltipSpike = useRef<HTMLDivElement>(null);

  let tooltipFadeOut: NodeJS.Timeout | null = null;
  let tooltipFadeIn: NodeJS.Timeout | null = null;
  
  function copyDiscordToClipboard() {
    navigator.clipboard.writeText(discord!);
    if (tooltip.current == null) return;
    tooltip.current.innerHTML = "Copied!";
    setTimeout(() => {
      if (tooltip.current == null) return;
      tooltip.current.innerHTML = "Copy to Clipboard";
    }, 5000);
  }

  function showDiscordTooltip() {
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

  function hideDiscordTooltip() {
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

  return <div className="flex flex-col text-center rounded-lg overflow-hidden bg-base-200 py-1 px-4 whitespace-nowrap">
    <small className="uppercase font-bold smaller mb-1">Social Media</small>
    <div className="flex flex-col justify-between gap-2 text-left p-1 relative">
      {instagram ? <a target="_blank" rel="noopener noreferrer" href={instagram}><FaInstagram className="w-5 h-5 inline-block" /> Instagram</a> : <></>}
      {twitter ? <a target="_blank" rel="noopener noreferrer" href={twitter}><FaTwitter className="w-5 h-5 inline-block" /> Twitter</a> : <></>}
      {youtube ? <a target="_blank" rel="noopener noreferrer" href={youtube}><FaYoutube className="w-5 h-5 inline-block" /> YouTube</a> : <></>}
      {discord ? <>
        <a id="discord-link" onClick={copyDiscordToClipboard} onMouseEnter={showDiscordTooltip} onMouseLeave={hideDiscordTooltip}>
        <FaDiscord className="w-5 h-5 inline-block" /> {discord}
        </a>
        <div 
          id="discord-tooltip" hidden
          ref={tooltip}
          className="text-center transition-opacity duration-300 opacity-0 bg-base-200 p-2 font-bold w-[140px] h-fit border-gray-800 border-[3px] rounded-xl text-sm z-20 absolute top-[10px]">
          Copy To Clipboard
        </div>
        <div
          id="discord-tooltip-spike" hidden
          ref={tooltipSpike}
          className="transition-opacity duration-300 opacity-0 border-t-[10px] border-t-gray-800 w-0 h-0 absolute top-[52px] left-[50px] z-10"></div>
        </>
        : <></>}
    </div>
  </div>
}

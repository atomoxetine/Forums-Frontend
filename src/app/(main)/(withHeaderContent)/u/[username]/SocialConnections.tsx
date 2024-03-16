'use client'

import ClipboardTooltip from "@/components/ClipboardTooltip/ClipboardTooltip";
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

  return <div className="flex flex-col text-center rounded-lg overflow-hidden bg-base-200 py-1 px-4 whitespace-nowrap">
    <small className="uppercase font-bold smaller mb-1">Social Media</small>
    <div className="flex flex-col justify-between gap-2 text-left p-1 relative">
      {instagram ? <a target="_blank" rel="noopener noreferrer" href={instagram}><FaInstagram className="w-5 h-5 inline-block" /> Instagram</a> : <></>}
      {twitter ? <a target="_blank" rel="noopener noreferrer" href={twitter}><FaTwitter className="w-5 h-5 inline-block" /> Twitter</a> : <></>}
      {youtube ? <a target="_blank" rel="noopener noreferrer" href={youtube}><FaYoutube className="w-5 h-5 inline-block" /> YouTube</a> : <></>}
      {discord ? <ClipboardTooltip toCopy={discord}>
        <FaDiscord className="w-5 h-5 inline-block" /> {discord}
      </ClipboardTooltip>
        : <></>}
    </div>
  </div>
}

import './styles.css'
import {FaDiscord, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa6';
import MCBust from '@/components/Minecraft/MCBust';
import MCHead from '@/components/Minecraft/MCHead';
import Link from 'next/link';
import React from "react";
import NavLink from "@/components/NavLink/component";
import { headers } from 'next/headers';
import HeaderContext from '@/components/HeaderContext';

interface UserParams {
  children: React.ReactNode;
}
export default function User({ children: children }: UserParams) {
  const currPath = new URL(headers().get('x-url')!).pathname;
  const username = currPath?.split('/')[2];
  
  const status = "online",
    rank = "developer",
    server = "hub-01",
    dateJoined = "01/18/24",
  timePlayed = "5d 8h";

  const rankColor: string = {
    owner: "#9F000C",
    developer: "#ff4141"
  }[rank] ?? "#ffffff"
  const statusColor: string = {
    online: "#00ee00"
  }[status] ?? "gray";
  
  const friends = ["OhEmilyy", "OhEmilyy", "OhEmilyy", "OhEmilyy", "OhEmilyy", "OhEmilyy"]
  const friendNum = friends.length;
  
  const socialUrls = {
    instagram: "",
    twitter: "",
    discord: "",
    youtube: ""
  }
  
  const headerContent: [string, string] = ["User", `Checkout ${username}'s amazing profile!`];
  return <>
    <HeaderContext setTo={headerContent}/>
    <section className="flex flex-col justify-center items-center">
      <div className="flex h-min w-full p-4 gap-4 inner">
        <div className="grid-container mb-auto h-min w-full gap-4">
          <div className="row-span-3 flex flex-col justify-between items-center gap-4 rounded-lg overflow-hidden bg-base-200">
            <div style={{backgroundColor: statusColor}} className="flex w-full py-2 rounded-t-lg border-[1px] border-gray-400">
              <small className="uppercase text-center w-full text-gray-400 tracking-wider font-bold text-shadow">{status}</small>
            </div>
            <MCBust className="mx-12" username={username}/>
            <span className="text-center inline-flex flex-col">
              <h5 className="font-bold">{username ?? "Unknown"}</h5>
              <small style={{color: rankColor}} className="smaller font-bold uppercase tracking-wider">{rank}</small>
            </span>
            <div style={{backgroundColor: statusColor}} className="flex w-full py-2 rounded-b-lg border-[1px] border-gray-400">
              <small className="uppercase text-center w-full text-gray-400 tracking-wider font-bold text-shadow">{server}</small>
            </div>
          </div>
          <div className="flex flex-col text-center rounded-lg overflow-hidden bg-base-200 py-2 px-4 whitespace-nowrap">
            <small>First joined on <b>{dateJoined}</b></small>
            <small><b>{timePlayed}</b> played</small>
          </div>
          <div className="flex flex-col text-center rounded-lg overflow-hidden bg-base-200 py-1 px-4 whitespace-nowrap">
            <small className="uppercase font-bold smaller mb-1">Social Media</small>
            <div className="flex flex-row flex-wrap justify-center gap-6">
              <Link href={socialUrls.instagram}><FaInstagram className="w-5 h-5"/></Link>
              <Link href={socialUrls.twitter}><FaTwitter className="w-5 h-5"/></Link>
              <Link href={socialUrls.discord}><FaDiscord className="w-5 h-5"/></Link>
              <Link href={socialUrls.youtube}><FaYoutube className="w-5 h-5"/></Link>
            </div>
          </div>
          <div className="flex flex-col text-center rounded-lg overflow-hidden bg-base-200 p-2 py-1 whitespace-nowrap">
            <small className="uppercase font-bold smaller mb-2 mt-1">{friendNum} {"friend" + (friendNum === 1 ? '' : 's')}</small>
            <div className="flex flex-row flex-wrap gap-y-1 gap-x-2 justify-center">
              {
                friends.slice(0, 6).map((f, i) =>
                  <div key={i} className="w-[45px] h-[49px] relative">
                    <MCHead shadowColor="green" className="scale-[.675] absolute left-[-11px] top-[-12px]" username={f} />
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="flex flex-col h-min w-full gap-4 content">
          <div className="flex flex-wrap w-full gap-4">
            <NavLink className="btn bg-base-200 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1" href={`/u/${username ? username + '/general' : ''}`}>
              General
            </NavLink>
            <NavLink className="btn bg-base-200 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1" href={`/u/${username ? username + '/statistics' : ''}`}>
              Statistics
            </NavLink>
            <NavLink className="btn bg-base-200 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1" href={`/u/${username ? username + '/forums' : ''}`}>
              Forums
            </NavLink>
          </div>
          <div className="overflow-y-scroll overflow-x-hidden h-[492px] w-full max-w-full p-4 bg-base-200 rounded-lg inner-content">
            {React.Children.map(children, child =>
              React.isValidElement(child) ? React.cloneElement(child, {  } as any) : child
            )}
          </div>
        </div>
      </div>
    </section>
  </>;
}
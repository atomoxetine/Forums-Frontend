import './styles.css'
import {FaDiscord, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa6';
import MCBust from '@/components/Minecraft/MCBust';
import MCHead from '@/components/Minecraft/MCHead';
import Link from 'next/link';
import React from "react";
import NavLink from "@/components/NavLink/component";
import { headers } from 'next/headers';

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
    developer: "#ff0000"
  }[rank] ?? "#BF7076";
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
  
  return <>
    <section className="flex flex-col justify-center items-center">
      <div className="flex h-min w-fit p-4 gap-4 inner">
        <div className="grid grid-flow-row-dense aside flex-[0_0_min-content] mb-auto items-start h-fit w-full gap-x-4">
          <div className="row-span-4 h-[267px] flex flex-col justify-between items-center gap-4 rounded-lg overflow-hidden bg-base-200">
            <div style={{backgroundColor: statusColor}} className="flex w-full py-2 rounded-t-lg border-[1px] border-gray-400">
              <small className="uppercase text-center w-full text-gray-400 tracking-wider font-bold text-shadow">{status}</small>
            </div>
            <MCBust className="mx-12" username={username} shadowColor={rankColor}/>
            <span className="text-center inline-flex flex-col">
              <h5 className="font-bold">{username ?? "Unknown"}</h5>
              <small style={{color: rankColor}} className="smaller font-bold uppercase tracking-wider">{rank}</small>
            </span>
            <div style={{backgroundColor: statusColor}} className="flex w-full py-2 rounded-b-lg border-[1px] border-gray-400">
              <small className="uppercase text-center w-full text-gray-400 tracking-wider font-bold text-shadow">{server}</small>
            </div>
          </div>
          <div className="row-span-1 h-[49px] flex flex-col text-center rounded-lg overflow-hidden bg-base-200 py-2 px-4 whitespace-nowrap">
            <small>First joined on <b>{dateJoined}</b></small>
            <small><b>{timePlayed}</b> played</small>
          </div>
          <div className="row-span-1 h-[46px] flex flex-col text-center rounded-lg overflow-hidden bg-base-200 py-1 px-4 whitespace-nowrap">
            <small className="uppercase font-bold smaller mb-1">Social Media</small>
            <div className="flex flex-row flex-wrap justify-center gap-6">
              <Link href={socialUrls.instagram}><FaInstagram className="w-5 h-5"/></Link>
              <Link href={socialUrls.twitter}><FaTwitter className="w-5 h-5"/></Link>
              <Link href={socialUrls.discord}><FaDiscord className="w-5 h-5"/></Link>
              <Link href={socialUrls.youtube}><FaYoutube className="w-5 h-5"/></Link>
            </div>
          </div>
          <div className="row-span-2 flex flex-col text-center rounded-lg overflow-hidden bg-base-200 p-2 py-1 whitespace-nowrap">
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
        <div className="content w-screen max-w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-wrap gap-4">
              <NavLink className="btn bg-base-300 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1" href={`/u/${username ? username + '/general' : ''}`}>
                General
              </NavLink>
              <NavLink className="btn bg-base-300 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1" href={`/u/${username ? username + '/statistics' : ''}`}>
                Statistics
              </NavLink>
              <NavLink className="btn bg-base-300 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1" href={`/u/${username ? username + '/forums' : ''}`}>
                Forums
              </NavLink>
            </div>
            <div className="h-[492px] w-full overflow-y-scroll overflow-x-hidden p-4 bg-base-200 rounded-lg inner-content">
              {React.Children.map(children, child =>
                React.isValidElement(child) ? React.cloneElement(child, {  } as any) : child
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>;
}
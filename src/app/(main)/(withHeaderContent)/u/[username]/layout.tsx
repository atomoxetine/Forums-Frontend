import './styles.css'
import { FaDiscord, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6';
import { ServerMCBust, ServerMCHead } from '@/components/Minecraft/Server';
import Link from 'next/link';
import React from "react";
import NavLink from "@/components/NavLink/component";
import { headers } from 'next/headers';
import HeaderContext from '@/components/HeaderContext';
import HashLink from '@/components/HashLink';
import { GetFriends, getUsernameFromUuid, getUuid } from '@/services/forum/account/AccountService';
import { isResultError } from '@/libs/Utils';
import { GetActiveRanks, getRankColor } from '@/services/controller/GrantService';

interface UserParams {
  children: React.ReactNode;
}
export default async function Layout({ children: children }: UserParams) {
  const currPath = new URL(headers().get('x-url')!).pathname;
  const username = currPath?.split('/')[2];
  const uuid = await getUuid(username);

  const status = "online";
  const rank = (await GetActiveRanks(uuid))[0]!
    .reduce((r, h) => r.priority > h.priority ? r : h);
  const rankColor = await getRankColor(rank._id) || "#FFFFFF";

  const server = "placeholder-server";
  const dateJoined = "placeholder-date";
  const timePlayed = "placeholder-time";

  const getStatusColor: string = { // TODO: Properly get status color
    online: "#22C55E"
  }[status] ?? "gray";

  let friends: { uuid: string, name: string }[] = [];

  if (uuid) {
    const res0 = await GetFriends(uuid);
    const isError = isResultError(res0);
    if (isError)
      console.error("Could not fetch user friends: HTTP " + res0[1]);
    else {
      for (const acc of res0[0]!) {
        friends.push({
          uuid: acc._id,
          name: await getUsernameFromUuid(acc._id),
        });
      }
    }
  }

  const friendNum = friends.length;

  const socialUrls = {
    instagram: "",
    twitter: "",
    discord: "",
    youtube: ""
  }

  const headerContent: [string, string] = ["User", `Checkout ${username}'s amazing profile!`];
  return <>
    <HeaderContext setTo={headerContent} />
    <div className="sect flex w-full h-full justify-center items-center">
      <div className="window flex h-fit w-fit inner p-2 gap-4 bg-base-300 rounded-xl">
        <div className="grid-container mb-auto h-min w-full gap-4">
          <div
            className="row-span-3 flex flex-col justify-between items-center gap-4 rounded-lg overflow-hidden bg-base-200">
            <div style={{ backgroundColor: getStatusColor }}
              className="flex w-full py-2 rounded-t-lg border-[1px] border-gray-400">
              <small
                className="uppercase text-center w-full text-gray-600 tracking-wider font-bold text-shadow">{status}</small>
            </div>
            <ServerMCBust className="mx-12" username={username} shadowColor={rankColor} />
            <span className="text-center inline-flex flex-col">
              <h5 className="font-bold">{username ?? "Unknown"}</h5>
              <small style={{ color: rankColor }} className="smaller font-bold uppercase tracking-wider">{rank.name}</small>
            </span>
            <div style={{ backgroundColor: getStatusColor }}
              className="flex w-full py-2 rounded-b-lg border-[1px] border-gray-400">
              <small
                className="uppercase text-center w-full text-gray-600 tracking-wider font-bold text-shadow">{server}</small>
            </div>
          </div>
          <div className="flex flex-col text-center rounded-lg overflow-hidden bg-base-200 py-2 px-4 whitespace-nowrap">
            <small>First joined on <b>{dateJoined}</b></small>
            <small><b>{timePlayed}</b> played</small>
          </div>
          <div className="flex flex-col text-center rounded-lg overflow-hidden bg-base-200 py-1 px-4 whitespace-nowrap">
            <small className="uppercase font-bold smaller mb-1">Social Media</small>
            <div className="flex flex-row flex-wrap justify-center gap-6">
              <Link href={socialUrls.instagram}><FaInstagram className="w-5 h-5" /></Link>
              <Link href={socialUrls.twitter}><FaTwitter className="w-5 h-5" /></Link>
              <Link href={socialUrls.discord}><FaDiscord className="w-5 h-5" /></Link>
              <Link href={socialUrls.youtube}><FaYoutube className="w-5 h-5" /></Link>
            </div>
          </div>
          <div className="flex flex-col text-center rounded-lg overflow-hidden bg-base-200 p-2 py-1 whitespace-nowrap">
            <small
              className="uppercase font-bold smaller mb-2 mt-1">{friendNum} {"friend" + (friendNum === 1 ? '' : 's')}</small>
            <div className="flex flex-row flex-wrap gap-y-1 gap-x-2 justify-center">
              {friends.slice(0, 6).map((f, i) =>
                <Link key={i} href={`/u/${f.name}`} className="w-[45px] h-[49px] relative">
                  <ServerMCHead shadowColor="green" className="scale-[.675] absolute left-[-11px] top-[-12px]"
                    uuid={f.uuid}
                    username={f.name} />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col h-min w-screen max-w-full gap-4 content">
          <div className="flex flex-wrap w-full gap-4">
            <NavLink className="btn bg-base-200 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1"
              href={`/u/${username ? username + '/general' : ''}`}>
              General
            </NavLink>
            <NavLink className="btn bg-base-200 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1"
              href={`/u/${username ? username + '/statistics' : ''}`}>
              Statistics
            </NavLink>
            <NavLink className="btn bg-base-200 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1"
              href={`/u/${username ? username + '/forums' : ''}`}>
              Forums
            </NavLink>
          </div>
          <div
            className="overflow-y-scroll overflow-x-hidden min-h-[492px] h-[492px] w-full max-w-full p-4 bg-base-200 rounded-lg inner-content">
            {React.Children.map(children, child =>
              React.isValidElement(child) ? React.cloneElement(child, {} as any) : child
            )}
          </div>
        </div>
      </div>
    </div>
  </>;
}

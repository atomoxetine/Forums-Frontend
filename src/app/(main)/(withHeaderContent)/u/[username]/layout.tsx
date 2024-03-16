import './styles.css'
import { ServerMCBust, ServerMCHead } from '@/components/Minecraft/Server';
import Link from 'next/link';
import React from "react";
import NavLink from "@/components/NavLink/component";
import { headers } from 'next/headers';
import HeaderContext from '@/components/HeaderContext';
import { GetFriends, getCurrentServer, getUsernameFromUuid, getUuid } from '@/services/forum/account/AccountService';
import { isResultError } from '@/libs/Utils';
import { GetActiveRanks, getRankColor, getRankFromName } from '@/services/controller/GrantService';
import { GetProfileFromUuid, GetPublicConnections } from '@/services/controller/ProfileService';
import { getPunishments } from '@/services/forum/punishment/PunishmentService';
import SocialConnections from './SocialConnections';
import getSession from '@/libs/session/getSession';
import Rank from '@/libs/types/entities/Rank';

interface UserParams {
  children: React.ReactNode;
}
export default async function Layout({ children: children }: UserParams) {
  const session = await getSession();
  const sessionRanks = (await GetActiveRanks(session.uuid))[0];
  const sessionIsStaff = sessionRanks != undefined && sessionRanks.find(rank => rank.staff) != undefined;
  const currPath = new URL(headers().get('x-url')!).pathname;
  const username = currPath?.split('/')[2];
  const uuid = await getUuid(username);

  const profile = (await GetProfileFromUuid(uuid))[0]!;

  if (!profile) {
    return <>
      <HeaderContext setTo={["User", "User not found"]} />
      <h1 className="mt-4 text-xxl font-bold text-white">User not found</h1>
    </>
  }

  const rank = (await GetActiveRanks(uuid))[0]!
    .reduce((r, h) => r?.priority > h?.priority ? r : h, { priority: -1 } as Rank);
  const rankColor = await getRankColor(rank?._id) || "#FFFFFF";


  const server = await getCurrentServer(uuid);
  let status = server ? "online" : "offline";
  let dateJoined;
  let lastSeenOn;

  if (profile.logins.length == 0) {
    dateJoined = "N/A";
    lastSeenOn = "N/A";
  } else {
    const dateJoinedMillis = profile.logins.reduce((acc, crr) => crr.time < acc ? crr.time : acc, Date.now());
    const lastSeenOnMillis = profile.logins.reduce((acc, crr) => crr.time > acc ? crr.time : acc, Date.now());

    // i know its cursed but it doesnt work otherwise
    dateJoined = new Date(dateJoinedMillis / 1000 * 1000).toDateString();
    lastSeenOn = new Date(lastSeenOnMillis / 1000 * 1000).toDateString();
  }

  let punishments = (await getPunishments(uuid))[0] || [];

  if (punishments.find(p => p.punishmentType == "BLACKLIST" && p.active))
    status = "blacklisted"
  else if (punishments.find(p => p.punishmentType == "BAN" && p.active))
    status = "banned"

  const statusColor: { f: string, b: string } = {
    online: {
      b: "#12651E",
      f: "#AFAFAF",
    },
    offline: {
      b: "#AA222E",
      f: "#AFAFAF",
    },
    banned: {
      b: "#CA1212",
      f: "#000000",
    },
    blacklisted: {
      b: "#120000",
      f: "#FF4A4A",
    }
  }[status] ?? { f: "#000000", b: "#696969" };

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
          name: (await getUsernameFromUuid(acc._id))!,
        });
      }
    }
  }

  const friendNum = friends.length;

  const socialUrls = (await GetPublicConnections(uuid))[0]!;
  const twitter = socialUrls.twitter;
  const instagram = socialUrls.instagram;
  const youtube = socialUrls.youtube;
  const discord = socialUrls.discord;

  const headerContent: [string, string] = ["User", `Checkout ${username}'s amazing profile!`];
  return <>
    <HeaderContext setTo={headerContent} />
    <div className="sect flex w-full h-full justify-center items-center">
      <div className="window flex h-fit w-fit inner p-2 gap-4 bg-base-300 rounded-xl">
        <div className="grid-container mb-auto h-min w-full gap-4">
          <div
            className="row-span-3 flex flex-col justify-between items-center gap-4 rounded-lg overflow-hidden bg-base-200">
            <div style={{ backgroundColor: statusColor.b }}
              className="flex w-full py-2 rounded-t-lg border-[1px] border-gray-400">
              <small
                style={{ color: statusColor.f }}
                className="uppercase text-center w-full text-gray-100 tracking-wider font-extrabold">{status}</small>
            </div>
            <ServerMCBust className="mx-12" username={username} shadowColor={rankColor} />
            <span className="text-center inline-flex flex-col">
              <h5 className="font-bold">{username ?? "Unknown"}</h5>
              <small style={{ color: rankColor }} className="smaller font-bold uppercase tracking-wider">{rank.name}</small>
            </span>
            <div style={{ backgroundColor: statusColor.b, color: statusColor.f }}
              className="flex w-full py-2 rounded-b-lg border-[1px] border-gray-400">
              <small
                style={{ color: statusColor.f }}
                className="uppercase text-center w-full tracking-wider font-bold">{server}</small>
            </div>
          </div>
          <div className="flex flex-col text-center rounded-lg overflow-hidden bg-base-200 py-2 px-4 whitespace-nowrap">
            <small>First joined on <b>{dateJoined}</b></small>
            <small>Last seen on <b>{lastSeenOn}</b></small>
          </div>
          {Object.keys(socialUrls).length > 0
            ? <SocialConnections discord={discord} twitter={twitter} instagram={instagram} youtube={youtube} />
            : <></>}
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
            {/*<NavLink className="btn bg-base-200 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1"
              href={`/u/${username ? username + '/statistics' : ''}`}>
              Statistics
            </NavLink>
            <NavLink className="btn bg-base-200 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1"
              href={`/u/${username ? username + '/forums' : ''}`}>
              Forums
            </NavLink>*/}
            {sessionIsStaff
              ? <NavLink className="btn bg-base-200 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1"
                href={`/u/${username ? username + '/staff' : ''}`}>
                Staff View
              </NavLink>
              : <></>}
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

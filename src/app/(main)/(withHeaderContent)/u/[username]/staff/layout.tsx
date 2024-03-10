import NavLink from "@/components/NavLink/component";
import getSession from "@/libs/session/getSession"
import { GetActiveRanks } from "@/services/controller/GrantService";
import { headers } from "next/headers";
import React from "react";
import "./styles.css"

interface UserParams {
  children: React.ReactNode;
}
export default async function Layout({ children: children }: UserParams) {
  const currPath = new URL(headers().get('x-url')!).pathname;
  const username = currPath?.split('/')[2];
  const session = await getSession();
  const sessionRanks = (await GetActiveRanks(session.uuid))[0]!;
  const sessionIsStaff = sessionRanks.find(rank => rank.staff) != undefined;
  if (!sessionIsStaff) {
    return <>Forbidden</>;
  }

  return <div className="flex flex-col gap-3">
    <div className="flex gap-2 text-center">
      <NavLink href={`/u/${username}/staff/punishments`} className="btn py-2 w-[150px] bg-base-300 hover:bg-base-200 border-2 border-base-100">
        Punishments
      </NavLink>
      <NavLink href={`/u/${username}/staff/grants`} className="btn py-2 w-[150px] bg-base-300 hover:bg-base-200 border-2 border-base-100">
        Grants
      </NavLink>
      <NavLink href={`/u/${username}/staff/identity`} className="btn py-2 w-[150px] bg-base-300 hover:bg-base-200 border-2 border-base-100">
        Identity
      </NavLink>
    </div>
    <div>
      {React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child, {} as any) : child
      )}
    </div>
  </div>
}

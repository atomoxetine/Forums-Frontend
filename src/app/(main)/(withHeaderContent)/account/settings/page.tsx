import HeaderContext from "@/components/HeaderContext";
import getSession from "@/libs/session/getSession";
import { GetProfileFromUuid, GetPublicConnections, updateConnections } from "@/services/controller/ProfileService";
import SettingsPage from "./component";
import { getAccountFromUuid } from "@/services/forum/account/AccountService";
import { redirect } from "next/navigation";

export default async function Page() {
  const headerContent: [string, string] = ["Settings", `Configure your account.`];

  const session = await getSession();
  if (!session.uuid) redirect("/");

  const profile = (await GetProfileFromUuid(session.uuid))[0]!;
  const account = (await getAccountFromUuid(session.uuid))[0]!;

  return <>
    <HeaderContext setTo={headerContent} />
    <SettingsPage profile={profile} account={account} />
  </>
}


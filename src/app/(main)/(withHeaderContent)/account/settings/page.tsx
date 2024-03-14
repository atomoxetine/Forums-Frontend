import HeaderContext from "@/components/HeaderContext";
import getSession from "@/libs/session/getSession";
import { GetProfileFromUuid, GetPublicConnections, updateConnections } from "@/services/controller/ProfileService";
import SettingsPage from "./component";

export default async function Page() {
  const headerContent: [string, string] = ["Settings", `Configure your account.`];

  const session = await getSession();
  const profile = (await GetProfileFromUuid(session.uuid))[0]!;

  return <>
    <HeaderContext setTo={headerContent} />
    <SettingsPage profile={profile} />
  </>
}


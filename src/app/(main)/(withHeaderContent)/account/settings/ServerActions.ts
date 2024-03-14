'use server'

import { isResultError } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import Account from "@/libs/types/entities/Account";
import Profile from "@/libs/types/entities/Profile";
import { GetProfileFromUuid, updateConnections } from "@/services/controller/ProfileService";
import { UpdateAccountPassword, getAccountFromUuid } from "@/services/forum/account/AccountService";


export const updateConnectionsAction = async (formData: FormData) => {
  'use server'

    const session = await getSession();
    if (!session) return "Not logged in"
 
    const req = {
      twitter: formData.get("twitter"),
      twitterPrivacy: formData.get("twitterPrivacy") === "on" ? "Everyone" : "",
      discord: formData.get("discord"),
      discordPrivacy: formData.get("discordPrivacy") === "on" ? "Everyone" : "",
      instagram: formData.get("instagram"),
      instagramPrivacy: formData.get("instagramPrivacy") === "on" ? "Everyone" : "",
      youtube: formData.get("youtube"),
      youtubePrivacy: formData.get("youtubePrivacy") === "on" ? "Everyone" : "",
    }

    await updateConnections(session.uuid, req);
}

export const updatePassAction = async (formData: FormData) => {
  'use server'

  const session = await getSession();
  if (!session) return "Not logged in";

  const crrPass = formData.get("currentPass")?.toString() || "";
  const pass = formData.get("newPass")?.toString() || "";
  const passConfirm = formData.get("newPassConfirm")?.toString() || "";

  if (pass == "")
    return "Password cannot be empty";

  if (pass != passConfirm)
    return "Passwords do not match";
  
  const data = {
    uuid: session.uuid,
    body: {
      password: pass,
      currentPassword: crrPass,
    }
  }

  const res = await UpdateAccountPassword(data);

  if (res[1] == 403)
    return "Current password is incorrect";

  if (isResultError(res))
    return "An error ocurred processing the request";
}


export const getUserData = async () => {
  'use server'

  const session = await getSession();
  if (!session) return "Not logged in";

  // const profile = (await GetProfileFromUuid(session.uuid))[0] || {} as Profile;
  const account = (await getAccountFromUuid(session.uuid))[0] || {} as Account;
  
  account.password = undefined;

  return {
    // profile: profile,
    account: account,
  }
}

'use server'

import { isResultError } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import Account from "@/libs/types/entities/Account";
import Profile from "@/libs/types/entities/Profile";
import { GetProfileFromUuid, updateConnections } from "@/services/controller/ProfileService";
import { UpdateAccountEmail, UpdateAccountPassword, getAccountFromUuid } from "@/services/forum/account/AccountService";


export const updateConnectionsAction = async (formData: FormData) => {
  'use server'

    const session = await getSession();
    if (!session) return "Not logged in"

    const twitter = formData.get("twitter")?.toString();
    const instagram = formData.get("instagram")?.toString();
    const youtube = formData.get("youtube")?.toString();
    const discord = formData.get("discord")?.toString();

    if (twitter && !twitter.startsWith("https://twitter.com/"))
      return "Invalid twitter domain"
    if (instagram && instagram.startsWith("https://instagram.com/"))
      return "Invalid instagram domain"
    if (youtube && youtube.startsWith("https://youtube.com/"))
      return "Invalid youtube domain"

    if ((twitter?.length || 0) > 40)
      return "Twitter link cannot exceed 40 characters"
    if ((instagram?.length || 0) > 50)
      return "Instagram link cannot exceed 50 characters"
    if ((youtube?.length || 0) > 100)
      return "Youtube link cannot exceed 100 characters"
    if ((discord?.length || 0) > 20)
      return "Discord handle cannot exceed 20 characters"

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
    return res[2] || res[1].toFixed();
}

const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const updateEmailAction = async (formData: FormData) => {
  'use server'

  const session = await getSession();
  if (!session) return "Not logged in";

  const pass = formData.get("password")?.toString() || "";
  const email = formData.get("email")?.toString() || "";

  if (pass == "")
    return "Password cannot be empty";

  if (email == "")
    return "Email cannot be empty";

  if (!EMAIL_REGEX.test(email))
    return "Email is invalid";

  const data = {
    uuid: session.uuid,
    body: {
      password: pass,
      email: email,
    }
  }

  const res = await UpdateAccountEmail(data);

  if (res[1] == 403)
    return "Password is incorrect";

  if (isResultError(res))
    return res[2] || res[1].toFixed();
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

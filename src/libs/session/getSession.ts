import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, defaultSession, sessionOptions } from "./iron"

export default async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.username = defaultSession.username;
    session.uuid = defaultSession.uuid;
    session.email = defaultSession.email;
    session.isLoggedIn = false;
  }

  return session;
}
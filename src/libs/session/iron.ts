import { SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  username: string;
  uuid: string;
  email: string;
  isLoggedIn: boolean;
}
export const defaultSession: SessionData = {
  username: "",
  uuid: "",
  email: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "session",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: true,
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.username = defaultSession.username;
    session.uuid = defaultSession.uuid;
    session.email = defaultSession.email;
    session.isLoggedIn = false;
  }

  return session;
}
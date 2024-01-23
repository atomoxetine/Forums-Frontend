import { SessionOptions } from "iron-session";

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
'use client';
import { SessionData, defaultSession } from "@/libs/session/iron";
import { Login, Register } from "@/services/forum/account/AccountService";
import { BehaviorSubject } from 'rxjs';
import useGlobal from "./useGlobal";
import { useCallback } from "react";

interface SessionManager {
  session?: SessionData;
  register: (formData: FormData) => Promise<[SessionData | null, number, string | null]>;
  login: (formData: FormData) => Promise<[SessionData | null, number, string | null]>;
  logout: () => Promise<void>;
}
function useSession(): SessionManager {
  const runOnce = ($: BehaviorSubject<SessionData>) =>
    fetch("/api/auth")
      .then((res) => res.json())
      .then((session) => $.next(session));
  const [session, setSession] = useGlobal('theme', () => defaultSession, runOnce);

  const register = useCallback(async (formData: FormData) => {
    const result = await Register(formData);
    if (result[0])
      setSession(result[0]);
    return result;
  }, [setSession]);

  const login = useCallback(async (formData: FormData) => {
    const result = await Login(formData);
    if (result[0])
      setSession(result[0]);
    return result;
  }, [setSession]);

  const logout = useCallback(async () => {
    await fetch("/api/auth", { method: "delete" })
      .then((res) => res.json())
      .then((session) => {
        setSession(session);
      });
  }, [setSession]);

  return {
    session,
    register,
    login,
    logout
  };
}
export default useSession;
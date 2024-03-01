'use client';
import { SessionData, defaultSession } from "@/libs/session/iron";
import { Login, Register, Reset } from "@/services/forum/account/AccountService";
import { BehaviorSubject } from 'rxjs';
import useGlobal from "./useGlobal";
import { useCallback } from "react";

interface SessionManager {
  session?: SessionData;
  register: (body: any) => Promise<[SessionData | null, number, string | null]>;
  reset: (body: any) => Promise<[SessionData | null, number, string | null]>;
  login: (body: any) => Promise<[SessionData | null, number, string | null]>;
  logout: () => Promise<void>;
}
function useSession(): SessionManager {
  const runOnceGlobally = useCallback(
    ($: BehaviorSubject<SessionData>) =>
      fetch("/api/auth")
        .then((res) => res.json())
        .then((session) => $.next(session)), []
  );

  const getDefaultSession = useCallback(() => defaultSession, []);
  const [session, setSession] = useGlobal('session', getDefaultSession, runOnceGlobally);

  const InterceptSession =
    (method: any): (body: any) => Promise<[SessionData | null, number, string | null]> =>
      useCallback(async (body: any) => {
        const result = await method(body);
        if (result[0])
          setSession(result[0]);
        return result;
      }, [method]);

  const register = InterceptSession(Register);
  const reset = InterceptSession(Reset);
  const login = InterceptSession(Login);

  const logout = useCallback(async () => {
    await fetch("/api/auth", { method: "delete" })
      .then((res) => res.json())
      .then((session) => {
        setSession(session);
      })
      .then(() => window.location.reload());
  }, [setSession]);

  return {
    session,
    register,
    reset,
    login,
    logout
  };
}
export default useSession;

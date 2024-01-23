'use client';
import { SessionData, defaultSession } from "@/libs/session/iron";
import { Login, Register } from "@/services/forum/account/AccountService";
import { useEffect, useState } from "react";
import { BehaviorSubject } from 'rxjs';

interface SessionManager {
  session: SessionData;
  register: (formData: FormData) => Promise<[SessionData | null, number, string | null]>;
  login: (formData: FormData) => Promise<[SessionData | null, number, string | null]>;
  logout: () => Promise<void>;
}
async function register(formData: FormData) {
  const result = await Register(formData);
  if (result[0])
    window['exports']?.onSessionUpdate$?.next(result[0]);
  return result;
}
async function login(formData: FormData) {
  const result = await Login(formData);
  if (result[0])
    window['exports']?.onSessionUpdate$?.next(result[0]);
  return result;
}
async function logout() {
  await fetch("/api/auth", { method: "delete" })
    .then((res) => res.json())
    .then((session) => {
      window['exports']?.onSessionUpdate$?.next(session);
    });
}
function useSession(): SessionManager {
  const [session, setSession] = useState<SessionData>(defaultSession);

  // State to manage the scroll observable
  const [onSessionUpdate$, setOnSessionUpdate$] = useState<BehaviorSubject<SessionData>>();
  // Effect to run once when the component mounts
  useEffect(() => {
    if ((window['exports'] ??= {})['onSessionUpdate$'] === undefined) {
      const $ = new BehaviorSubject<SessionData>(defaultSession);
      window['exports']['onSessionUpdate$'] = $;
      fetch("/api/auth")
        .then((res) => res.json())
        .then((session) => $.next(session));
    }
    
    // Gets the global observable and assigns to the state
    setOnSessionUpdate$(window['exports']['onSessionUpdate$']);
  }, []);


  // Effect to run when onSessionUpdate$ changes
  useEffect(() => {
    // Check if onSessionUpdate$ is defined
    if (!onSessionUpdate$) return;

    const subscription = onSessionUpdate$.subscribe((session) => setSession(session));
    return () => {
      subscription.unsubscribe();
      if (!onSessionUpdate$.observed) {
        onSessionUpdate$.complete();
        window['exports'].onSessionUpdate$ = undefined;
      }
    }
  }, [onSessionUpdate$]);

  return {
    session,
    register,
    login,
    logout
  };
}
export default useSession;
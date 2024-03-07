'use client';
import { ForgotPassword } from "@/services/forum/account/AccountService";
import useSession from "@/hooks/useSession";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { FormEvent, useRef, useState } from "react";
import { AuthContext } from "../template"
import HashLink from "@/components/HashLink";
import { isResultError } from "@/libs/Utils";
import Link from "next/link";

export default function Page() {
  const searchParams = useSearchParams();
  const username = searchParams.get('username') ?? undefined;

  let setUsername = useContext(AuthContext)?.setUsername;
  useEffect(() => {
    setUsername?.(username);
  }, [setUsername, username]);

  const token = searchParams.get('token');
  return token ? <ResetPassword username={username} token={token}/> : <RequestReset username={username}/>;
};

const RequestReset = ({ username: username }: { username?: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState<string | null>(null);

  const isError = useRef<boolean>(false);

  async function onSubmitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    
    isError.current = false;
    setState(null);
 
    try {
      const formData = new FormData(event.currentTarget);
      
      const res = await ForgotPassword(formData.get("email")?.toString()!);
      if (isResultError(res, true))
        throw new Error(res[2] ?? undefined);

      isError.current = false;
      setState("An email has been sent to reset your password");
    } catch (state: any) {
      isError.current = true;
      setState(state.message);
    } finally {
      setIsLoading(false);
    }
  }

  return <>
    <h3 className="text-primary">
      It's okay, {username ??= "player"}.<br/>
    </h3>
    <h5 className="mb-4 mx-8 text-primary">
      Everyone forgets their password here and then. Let's fix that.
    </h5>
    {state && <p className={`${(isError.current ? 'text-error' : 'text-success')} mb-1`}>{state}</p>}
    <form onSubmit={onSubmitRequest}>
      <input className="py-2 px-4 min-h-fit h-fit w-full overflow-hidden rounded-lg mb-2"
        disabled={isLoading} type="text" name="email" placeholder="Email" required/>
      <button className="btn btn-secondary py-2 px-4 min-h-fit h-fit w-full mb-2" disabled={isLoading} type="submit">{isLoading ? "On it…" : "Reset password"}</button>
    </form>
    <hr/>
    <small className="my-1"><b>Don't have an account? <Link className="text-primary hover:text-primary-content" href="/auth/register">Register here!</Link></b></small>
    <small className="mb-1"><b>Already remembered it? <Link className="text-accent hover:text-accent-content" href="/auth/login">Click here to go back.</Link></b></small>
  </>;
};

const ResetPassword = ({ token: token, username: username }: { token: string, username?: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState<string | null>(null);

  const { reset } = useSession();
  const { push } = useRouter();
  async function onSubmitNew(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setState(null);
 
    try {
      const formData = new FormData(event.currentTarget);
      const newPassword = formData.get("password");
      if (newPassword !== formData.get("confirm")) {
        setState("The passwords don't match");
        setIsLoading(false);
        return;
      }

      const res = await reset({ token, newPassword });
      if (isResultError(res, true)) {
        throw new Error(res[2] ?? undefined);
      }
      
      push(`/`);
    } catch (error: any) {
      setState(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return <>
    <h3 className="text-primary">
      It's okay, {username ??= "player"}.<br/>
    </h3>
    <h5 className="mb-4 mx-8 text-primary">
      Everyone forgets their password here and then. Let's fix that.
    </h5>
    {state && <p className="text-error mb-1">{state}</p>}
    <form onSubmit={onSubmitNew}>
      <input className="py-2 px-4 min-h-fit h-fit w-full overflow-hidden rounded-lg mb-2"
        disabled={isLoading} type="password" name="password" placeholder="New Password" required/>
      <input className="py-2 px-4 min-h-fit h-fit w-full overflow-hidden rounded-lg mb-2"
        disabled={isLoading} type="password" name="confirm" placeholder="Confirm Password" required/>
      <input disabled={isLoading} type="hidden" name="token" value={token} readOnly/>
      <button className="btn btn-secondary py-2 px-4 min-h-fit h-fit w-full mb-2" disabled={isLoading} type="submit">{isLoading ? "On it…" : "Reset password"}</button>
    </form>
    <hr/>
    <small className="my-1"><b>Already remembered it? <Link className="text-accent hover:text-accent-content" href="/auth/login">Click here to go back.</Link></b></small>
  </>;
};

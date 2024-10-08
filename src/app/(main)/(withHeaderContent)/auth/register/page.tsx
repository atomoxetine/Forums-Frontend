'use client';
import useSession from "@/hooks/useSession";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { FormEvent, useState } from "react";
import { AuthContext } from "../template"
import HashLink from "@/components/HashLink";
import { isResultError } from "@/libs/Utils";
import Link from "next/link";

export default function Page() {
  const searchParams = useSearchParams();
  let username = searchParams.get('username') ?? undefined;
  
  let setUsername = useContext(AuthContext)?.setUsername;
  useEffect(() => {
    setUsername?.(username);
  }, [setUsername, username]);

  const token = searchParams.get('token');
  return token ? <DoRegister username={username} token={token}/> : <RequestRegister/>;
};

const RequestRegister = () => {
  return <>
    <h3 className="text-center text-primary">Before you continue, please register in our server</h3>
    <hr className="mt-5 mb-4"/>
    <ul className="ml-5 list-disc list-outside flex flex-col gap-2 text-left">
      <li className="text-secondary">
        <h5><strong>Step 1:</strong></h5>
        <span className="font-semibold text-base-content">Connect to mccade.net.</span>
      </li>
      <li className="text-secondary">
        <h5><strong>Step 2:</strong></h5>
        <span className="font-semibold text-base-content">Type /register {"<email>"} in the chat.</span>
      </li>
      <li className="text-secondary">
        <h5><strong>Step 3:</strong></h5>
        <span className="font-semibold text-base-content">Check your email and follow the setup instructions!</span>
      </li>
    </ul>
  </>;
 
};

const DoRegister = ({ token: token, username: username }: { token: string, username?: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { register } = useSession();
  const { push } = useRouter();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
 
    try {
      const formData = new FormData(event.currentTarget);

      const password = formData.get("password");
      if (password !== formData.get("confirm")) {
        setError("The passwords don't match");
        setIsLoading(false);
        return;
      }

      const res = await register({ token: formData.get("token"), password });
      if (isResultError(res, true))
        throw new Error(res[2] ?? undefined);
      
      push(`/`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
 
  return <>
    <h3 className="text-primary">
      Hi there, {username ??= "player"}!<br/>
    </h3>
    <h5 className="mb-4 mx-6 text-primary">
      Let's get your account going by setting up your password.
    </h5>
    {error && <p className="text-error mb-1">{error}</p>}
    <form onSubmit={onSubmit}>
      <input className="py-2 px-4 min-h-fit h-fit w-full overflow-hidden rounded-lg mb-2"
        disabled={isLoading} type="password" name="password" placeholder="Password" required/>
      <input className="py-2 px-4 min-h-fit h-fit w-full overflow-hidden rounded-lg mb-2"
        disabled={isLoading} type="password" name="confirm" placeholder="Confirm Password" required/>
      <input disabled={isLoading} type="hidden" name="token" value={token} readOnly/>
      <button className="btn btn-secondary py-2 px-4 min-h-fit h-fit w-full mb-2" disabled={isLoading} type="submit">{isLoading ? "On it…" : "Set password"}</button>
    </form>
    <hr/>
    <small className="my-1"><b>Already have an account? <Link className="text-primary hover:text-primary-content" href="/auth/login">Sign in here!</Link></b></small>
  </>;
};

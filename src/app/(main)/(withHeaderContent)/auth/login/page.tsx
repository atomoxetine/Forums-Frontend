'use client';
import useSession from "@/hooks/useSession";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import HashLink from "@/components/HashLink";
import { isResultError } from "@/libs/Utils";
import Link from "next/link";

export default function Page() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') ?? '/';
  
  // const setUsername = useContext(AuthContext)?.setUsername;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useSession();
  const { push } = useRouter();
  
  //setUsername?.(username);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
 
    try {
      const formData = new FormData(event.currentTarget);

      const res = await login({ username: formData.get("username"), password: formData.get("password") });
      if (isResultError(res, true)) {
        throw new Error(res[2] ?? "Unknown error");
      }
      
      push(redirectUrl);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return <>
    <h3 className="mb-4 text-primary">Login to MCCade</h3>
    {error && <p className="text-error mb-1">{error}</p>}
    <form onSubmit={onSubmit}>
      <input className="py-2 px-4 min-h-fit h-fit w-full overflow-hidden rounded-lg mb-2"
        disabled={isLoading} type="text" name="username" placeholder="Username or Email" required/>
      <input className="py-2 px-4 min-h-fit h-fit w-full overflow-hidden rounded-lg mb-2"
        disabled={isLoading} type="password" name="password" placeholder="Password" required/>
      <button className="btn btn-secondary py-2 px-4 min-h-fit h-fit w-full mb-2" disabled={isLoading} type="submit">{isLoading ? "On it…" : "Sign in"}</button>
    </form>
    <hr/>
    <small className="my-1"><b>Don't have an account? <Link className="text-primary hover:text-primary-content" href="/auth/register">Register here!</Link></b></small>
    <small><b>Forgot your password? <Link className="text-secondary hover:text-secondary-content" href="/auth/reset">Click here to reset.</Link></b></small>
  </>;
};

'use client';
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../template"
import HashLink from "@/components/HashLink";

export default function LoginPage() {
  let setUsername = useContext(AuthContext)?.setUsername;

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

      const result = await login({ username: formData.get("username"), password: formData.get("password") });
      if (!(result[1] >= 200 && result[1] <= 299)) {
        console.log(result);
        throw new Error(result[2] ?? "Unknown error");
      }
      
      push(`/`);
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
      <input className="placeholder-base-content py-2 px-4 min-h-fit h-fit w-full overflow-hidden rounded-lg mb-2"
        disabled={isLoading} type="text" name="username" placeholder="Username or Email" required/>
      <input className="placeholder-base-content py-2 px-4 min-h-fit h-fit w-full overflow-hidden rounded-lg mb-2"
        disabled={isLoading} type="password" name="password" placeholder="Password" required/>
      <button className="btn btn-secondary py-2 px-4 min-h-fit h-fit w-full mb-2" disabled={isLoading} type="submit">{isLoading ? "On it…" : "Sign in"}</button>
    </form>
    <div className="inline-block w-[98%] h-[1px] bg-base-content my-1"></div>
    <small className="my-1"><b>Don't have an account? <HashLink className="text-primary hover:text-primary-content" href="/auth/register">Register here!</HashLink></b></small>
    <small><b>Forgot your password? <HashLink className="text-secondary hover:text-secondary-content" href="/auth/reset">Click here to reset.</HashLink></b></small>
  </>;
};
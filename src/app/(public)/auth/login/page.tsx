'use client';
import useSession from "@/hooks/useSession";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useSession();
  const { push } = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
 
    try {
      const formData = new FormData(event.currentTarget);

      const result = await login(formData);
      if (!result[0]) {
        throw new Error(result[2] ?? undefined);
      }
      
      push(`/`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return <div className="py-5 px-16 overflow-hidden bg-base-200 rounded-lg mb-12">
    <div className="flex flex-col items-center text-center w-[fit] max-w-[346px] h-fit">
      <h5 className="mb-2">Login to your MCCade Account.</h5>
      {error && <small className="text-error mb-1">{error}</small>}
      <form onSubmit={onSubmit}>
        <input className="placeholder-base-content py-2 px-4 min-h-fit h-fit w-full overflow-hidden rounded-lg mb-2" disabled={isLoading} type="text" name="username" placeholder="Username or Email" required/>
        <input className="placeholder-base-content py-2 px-4 min-h-fit h-fit w-full overflow-hidden rounded-lg mb-2" disabled={isLoading} type="password" name="password" placeholder="Password" required/>
        <button className="btn btn-secondary py-2 px-4 min-h-fit h-fit w-full mb-2" disabled={isLoading} type="submit">{isLoading ? "On it…" : "Sign in"}</button>
      </form>
      <div className="inline-block w-[98%] h-[1px] bg-neutral-content my-1"></div>
      <small className="my-1"><b>Don't have an account? <Link className="text-primary hover:text-secondary-content" href="/auth/register">Register here!</Link></b></small>
      <small><b>Forgot your password? <Link className="text-secondary hover:text-secondary-content" href="/auth/register">Click here to reset.</Link></b></small>
    </div>
  </div>;
}
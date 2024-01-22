'use client'
import { Register } from "@/services/AccountService"; 
import { useSearchParams } from 'next/navigation'
import React, { useState, FormEvent } from 'react'
 
export default function RegisterPage() {
  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  const username = searchParams.get('username');
  const token = searchParams.get('token');
  if (!email || !username || !token)
    return (
      <div className="flex flex-col items-start w-fit h-fit m-auto bg-base-300">
        <h3 className="border-b-2 border-base-100">Register</h3>
        <p>
          <strong>Step 1:</strong><br />
          Connect to mccade.net.
        </p>
        <p>
          <strong>Step 2:</strong><br />
          <span>Type /register {"<email>"} in the chat.</span>
        </p>
        <p>
          <strong>Step 3:</strong><br />
          Check your email and follow the setup instructions.
        </p>
      </div>
    );
 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
 
    try {
      const formData = new FormData(event.currentTarget);

      if (formData.get("password") !== formData.get("confirm")) {
        setError("The passwords don't match");
        setIsLoading(false);
        return;
      }

      const result = await Register(formData);
      if (!result[0]) {
        throw new Error(result[1]);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
 
  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <label className="block text-lg">
          <span>Email</span>
          <input disabled={isLoading} type="email" name="email" placeholder={email} value={email} readOnly/>
        </label>
        <label className="block text-lg">
          <span>Password</span>
          <input disabled={isLoading} type="password" name="password" required/>
        </label>
        <label className="block text-lg">
          <span>Confirm Password</span>
          <input disabled={isLoading} type="password" name="confirm" required/>
        </label>
        <input disabled={isLoading} type="hidden" name="token" value={token} readOnly/>
        <button disabled={isLoading} type="submit">{isLoading ? "On it…" : "Register!"}</button>
      </form>
    </div>
  )
}
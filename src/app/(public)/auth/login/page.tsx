'use client';
import useSession from "@/hooks/useSession";
import { Input, SubmitButton } from "./input";
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

  return (
    <form onSubmit={onSubmit}>
      <label className="block text-lg">
        <span>User</span>
        <Input isUsername={true}/>
      </label>
      <label className="block text-lg">
        <span>Password</span>
        <Input />
      </label>
      <div>
        <SubmitButton value="Login" />
      </div>
    </form>
  );
}
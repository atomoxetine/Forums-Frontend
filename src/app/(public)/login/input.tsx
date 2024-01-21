// We're using a client component to show a loading state
"use client";
import { useFormStatus } from "react-dom";

export function Input({ isUsername: isUsername }: { isUsername?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <input
      type={isUsername ? "text" : "password"}
      disabled={pending}
      name={isUsername ? "username" : "password"}
      placeholder={isUsername ? "Username" : "Password"}
      required
    />
  );
}

export function SubmitButton({ value }: { value: string }) {
  const { pending } = useFormStatus();

  return (
    <input
      type="submit"
      value={pending ? "Loading…" : value}
      disabled={pending}
    />
  );
}

'use client';

import './styles.css'
import Popup from "reactjs-popup";
import {FormEvent, useState} from "react";
import { createTicket } from './createTicket';

export default function Component() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const result = await createTicket(formData);
    if (typeof result == "string") {
      setError(result);
    }

    setIsLoading(false);
  }

  return <>
    <Popup trigger={
      <button
        className="btn btn-secondary min-h-fit h-fit min-w-fit w-fit rounded-none pl-3 pr-5 mr-[-8px] py-1 my-[-4px]">
        <span className="font-semibold text-base-200">Create <span className="hidden sm:inline-block">a new ticket</span></span>
      </button>
    } modal>
      <div className="flex flex-col bg-base-200 border-2 border-black px-4 py-2 gap-3 w-[700px] rounded-lg">
        <h4 className="mt-2 text-center w-full">Create a new Ticket</h4>
        <hr className="mt-2 mb-4"/>
        <form className="flex flex-col gap-3" action={onSubmit}>
          <input className="py-2 px-4 min-h-fit h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content"
                 disabled={isLoading} type="text" name="title" placeholder="Title" required/>
          <textarea className="py-2 px-4 min-h-fit h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content"
                 disabled={isLoading} name="body" placeholder="Body" required/>

          {error && <p className="text-error mb-[-8px]">{error}</p>}
          <button className="btn btn-secondary py-2 px-4 min-h-fit h-fit w-full mb-2" disabled={isLoading} type="submit">{isLoading ? "On it…" : "Create"}</button>
        </form>
      </div>
    </Popup>
  </>;  
}

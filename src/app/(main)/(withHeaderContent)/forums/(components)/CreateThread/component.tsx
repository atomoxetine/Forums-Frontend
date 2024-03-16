'use client';

import './styles.css'
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import useSession from '@/hooks/useSession';
import { createThread } from './ServerActions';
import { canUseForum } from '@/services/forum/account/AccountService';

interface Props {
  forumId: string
  hasImage: boolean
  blocked: boolean
}

export default function Component(props: Props) {
  const { forumId, hasImage, blocked } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSession();
  const loggedIn = session?.uuid ? true : false;

  function onSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    createThread(formData, forumId).then(res => {
      if (res) {
        setError(res);
        setIsLoading(false);
      } else {
        setError(null);
        window.location.reload();
      }
    });

  }

  function onPopupOpen() {
    if (!loggedIn) {
      window.location.assign("/auth/login")
    }
  }

  return <>
    <Popup trigger={
      <button
        className="btn btn-secondary min-h-fit h-fit min-w-fit w-fit rounded-none pl-3 pr-5 mr-[-8px] py-1 my-[-4px]" onClick={onPopupOpen}>
        <span className="font-semibold text-base-200">Create <span className="hidden sm:inline-block">a new thread</span></span>
      </button>
    } modal>
      <div className="flex flex-col bg-base-200 border-2 border-black px-4 py-2 gap-3 w-[700px] rounded-lg">
        <h4 className="mt-2 text-center w-full">Create a new Thread</h4>
        <hr className="mt-2 mb-4" />
        {!loggedIn ? <span className="text-lg text-red-500 font-bold p-2">Not logged in.</span> : <></>}
        {blocked ? <span className="text-lg text-red-500 font-bold p-2">You do not have permissions to create a thread.</span> : <></>}
        <form className="flex flex-col gap-3" action={onSubmit}>
          <input className="py-2 px-4 min-h-fit h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content"
            disabled={isLoading || !loggedIn || blocked} type="text" name="title" placeholder="Title" required />
          <textarea className="py-2 px-4 min-h-fit h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content"
            disabled={isLoading || !loggedIn || blocked} name="body" placeholder="Body" required />
          {hasImage
            ? <div>
              <label>Thumbnail, Accepts .jpeg images of up to 3MB</label>
              <input className="mt-1 py-2 px-4 min-h-fit h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content"
                disabled={isLoading || !loggedIn || blocked} type="file" name="thumbnail" placeholder="Thumbnail" />
            </div>
            : <></>}
          {error && <p className="text-error mb-[-8px]">{error}</p>}
          <button className="btn btn-secondary py-2 px-4 min-h-fit h-fit w-full mb-2" disabled={isLoading || !loggedIn || blocked} type="submit">{isLoading ? "On it…" : "Create"}</button>
        </form>
      </div>
    </Popup>
  </>;
}

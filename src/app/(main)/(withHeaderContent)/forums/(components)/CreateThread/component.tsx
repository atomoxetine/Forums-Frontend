'use client';

import './styles.css'
import Popup from "reactjs-popup";
import { useState } from "react";
import useSession from '@/hooks/useSession';
import { createThread } from './ServerActions';

interface Props {
  forumId: string
}

export default function Component(props: Props) {
  const { forumId } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSession();

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

  return <>
    <Popup trigger={
      <button
        className="btn btn-secondary min-h-fit h-fit min-w-fit w-fit rounded-none pl-3 pr-5 mr-[-8px] py-1 my-[-4px]">
        <span className="font-semibold text-base-200">Create <span className="hidden sm:inline-block">a new thread</span></span>
      </button>
    } modal>
      <div className="flex flex-col bg-base-200 border-2 border-black px-4 py-2 gap-3 w-[700px] rounded-lg">
        <h4 className="mt-2 text-center w-full">Create a new Thread</h4>
        <hr className="mt-2 mb-4" />
        <form className="flex flex-col gap-3" action={onSubmit}>
          <input className="py-2 px-4 min-h-fit h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content"
            disabled={isLoading} type="text" name="title" placeholder="Title" required />
          <textarea className="py-2 px-4 min-h-fit h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content"
            disabled={isLoading} name="body" placeholder="Body" required />
          <div>
            <label>Thumbnail, Accepts jpeg images of up to 3MB</label>
            <input className="mt-1 py-2 px-4 min-h-fit h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content"
              disabled={isLoading} type="file" name="thumbnail" placeholder="Thumbnail" />
          </div>
          {error && <p className="text-error mb-[-8px]">{error}</p>}
          <button className="btn btn-secondary py-2 px-4 min-h-fit h-fit w-full mb-2" disabled={isLoading} type="submit">{isLoading ? "On it…" : "Create"}</button>
        </form>
      </div>
    </Popup>
  </>;
}

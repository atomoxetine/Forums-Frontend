'use client';

import './styles.css'
import Popup from "reactjs-popup";
import {FormEvent, useState} from "react";
import {isResultError, newUuid} from "@/libs/Utils";
import Thread from '@/libs/types/entities/Thread';
import getSession from '@/libs/session/getSession';
import { GetActiveRanks, getRankColor } from '@/services/controller/GrantService';
import Rank from '@/libs/types/entities/Rank';
import { getAllFilters } from '@/services/forum/filter/TextFilterService';
import { GetForum } from '@/services/forum/forum/ForumService';
import { CreateThread } from '@/services/forum/thread/ThreadService';
import useSession from '@/hooks/useSession';

interface Props {
  forumId: string
}

export default function Component(props: Props) {
  const { forumId } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSession();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);


    try {
      if (!session)
        throw new Error("Not logged in");
      

      const formData = new FormData(event.currentTarget);

      const body = formData.get("body")?.toString() || "";
      const title = formData.get("title")?.toString() || "";
      const filters = (await getAllFilters())[0] || [];

      for (let filter of filters) {
        if (body.includes(filter.filter))
          throw new Error("Body did not pass filter test");

        if (title.includes(filter.filter))
          throw new Error("Title did not pass filter test");
      }

      const author = session.uuid;
        
      CreateThread(newUuid(), title, body, forumId, author)
        .then(() => window.location.reload());

    } catch (error: any) {
      setError(error.message);
    }
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
        <hr className="mt-2 mb-4"/>
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
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

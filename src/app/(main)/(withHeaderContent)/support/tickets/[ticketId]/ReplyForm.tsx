'use client';

import './styles.css'
import useSession from "@/hooks/useSession";
import { useEffect, useRef, useState } from "react";
import Ticket from '@/libs/types/entities/Ticket';
import TicketCategory from '@/libs/types/entities/TicketCategory';
import { reply } from './TicketServerActions';

export interface WriteReplyData {
  parentTicket: Ticket;
  categories: TicketCategory[]
}
const WriteReply = (props: WriteReplyData) => {
  const { parentTicket, categories } = props
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSession();
  const input = useRef<HTMLTextAreaElement>(null);
  const hiddenDiv = useRef<HTMLDivElement>(null);

  async function onSubmit(formData: FormData) {
    setIsLoading(true);

    reply(parentTicket, formData).then(res => {
      if (res) {
        setIsLoading(false)
        setError(res)
      } else {
        setError("")
        window.location.reload();
      }
    });
  }

  useEffect(() => {
    input.current!.oninput = () => {
      hiddenDiv.current!.innerHTML = input.current!.value + "\n\n";
      hiddenDiv.current!.style.display = "block";
      hiddenDiv.current!.hidden = true;
      input.current!.style.height = hiddenDiv.current!.offsetHeight + "px";
      hiddenDiv.current!.style.display = "none";
      hiddenDiv.current!.hidden = false;
    }
  }, [])

  const isDisabled = parentTicket.status != "open";

  return <>
    <form action={onSubmit} className="items-center w-full rounded-lg h-fit py-3">
      <div className="relative flex flex-col flex-1 mr-1 h-min">
        <span className="absolute mt-[-26px] bg-base-300 px-2">{error && <p className="text-error mb-1">{error}</p>}</span>
        <textarea disabled={isDisabled} ref={input} name="reply" placeholder="Type a reply..." className="input w-full bg-base-100 content-color" required/>
        <div id="replyhiddendiv" ref={hiddenDiv} className="py-2" />
      </div>
      <button className="btn btn-primary bg-green-800 border-none hover:bg-green-900 flex mt-3 px-2 items-center font-semibold h-8 min-h-8" disabled={isLoading || isDisabled} type="submit">
        {(() => {
          if (isDisabled)
            return "Ticket is closed";
          if (isLoading)
            return "On it...";
          return "Send";
        })()}
      </button>
    </form>
  </>;
}
export default WriteReply;

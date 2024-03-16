'use server'

import { isResultError, newUuid } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import Ticket from "@/libs/types/entities/Ticket";
import { getAllFilters } from "@/services/forum/filter/TextFilterService";
import { CreateReplyTicket, EditTicket } from "@/services/forum/ticket/TicketService";
import { getAuthorInfo } from "../../Utils";


export async function closeTicket(ticket: Ticket) {
  'use server'
  ticket.status = "closed";
  return await EditTicket(ticket);
}

export async function openTicket(ticket: Ticket) {
  'use server'
  ticket.status = "open";
  return await EditTicket(ticket);
}

export async function setResult(ticket: Ticket, result: string) {
  'use server'
  ticket.result = result;
  return await EditTicket(ticket);
}

export async function reply(parent: Ticket, formData: FormData) {
  'use server'
  const session = await getSession();

  const author = session?.uuid
  if (!author) 
    return "You're not logged in."
  const currentUser = await getAuthorInfo(session.uuid);
  if (!currentUser?.rank?.staff && parent.author != session.uuid)
    return "Permission Denied"

  const bodyEntry = formData.get("reply")
  if (!bodyEntry)
    return "Please write a reply."

  const body = bodyEntry.toString();

  const filters = (await getAllFilters())[0] || [];
  for (let filter of filters) {
    if (body.includes(filter.filter))
      return "Message did not pass filter test"
  }

  console.log(filters);

  const id = newUuid();

  const reply: Ticket = {
    _id: id,
    author: author,
    body: body,
    category: "",
    createdAt: Date.now().toFixed(),
    lastUpdatedAt: Date.now().toFixed(),
    parentTicket: parent._id,
    status: "Sent",
    result: "",
    title: `Reply to ${parent._id}`,
    replies: [],
  }

  const res = await CreateReplyTicket(reply)

  if (isResultError(res))
    return res[2] || res[1].toFixed();
}

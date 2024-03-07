'use client'

import Ticket from "@/libs/types/entities/Ticket"
import { ArchiveTicket as ArchiveTicket, EditTicket, UnarchiveTicket } from "@/services/forum/ticket/TicketService";
import { closeTicket, openTicket } from "./page";
import Rank from "@/libs/types/entities/Rank";

export interface TicketActionProps {
  ticket: Ticket,
  userRank: Rank | undefined,
}

export default function TicketActions(props: TicketActionProps) {
  let { ticket, userRank } = props;

  return <div className="p-2 rounded-b-xl bg-base-200 flex gap-2">
    {ticket.status != "archived"
      ? <>
        {ticket.status == "closed"
          ? <button className="btn rounded-lg bg-base-100 border-green-800" onClick={
            () => openTicket(ticket).then(() => window.location.reload())
          }>Re-open Ticket</button>
          : <button className="btn rounded-lg bg-base-100 border-yellow-800" onClick={
            () => closeTicket(ticket).then(() => window.location.reload())
          }>Close Ticket</button>}
        {userRank?.staff
          ? <button className="btn rounded-lg bg-base-100 border-red-800" onClick={
            () => ArchiveTicket(ticket._id).then(() => window.location.assign("/support/1"))
          }>Archive Ticket</button>
          : <></>}
      </>
      : userRank?.staff
        ? <button className="btn rounded-lg bg-base-100 border-red-800" onClick={
          () => UnarchiveTicket(ticket._id).then(() => window.location.reload())
        }>Unarchive Ticket</button>
        : <></>}
  </div>
}



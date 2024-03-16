'use client'

import Ticket from "@/libs/types/entities/Ticket"
import { ArchiveTicket, UnarchiveTicket } from "@/services/forum/ticket/TicketService";
import Rank from "@/libs/types/entities/Rank";
import { closeTicket, openTicket, setResult } from "./TicketServerActions";

export interface TicketActionProps {
  ticket: Ticket,
  userRank: Rank | undefined,
  results: {name:string, color:string}[],
}

export default function TicketActions(props: TicketActionProps) {
  let { ticket, userRank, results } = props;

  return <div className="p-2 rounded-b-xl bg-base-200 flex flex-wrap gap-2">
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
          ? <><button className="btn rounded-lg bg-base-100 border-red-800" onClick={
            () => ArchiveTicket(ticket._id).then(() => window.location.assign("/support/1"))
          }>Archive Ticket</button>
            {results.map((r,i) =>
              <button key={i} className="btn rounded-lg bg-base-100" style={{ borderColor: r.color }} onClick={
                () => setResult(ticket, r.name).then(() => window.location.reload())
              }>Set {r.name}</button>
            )}</>
          : <></>}
      </>
      : userRank?.staff
        ? <><button className="btn rounded-lg bg-base-100 border-red-800" onClick={
          () => UnarchiveTicket(ticket._id).then(() => window.location.reload())
        }>Unarchive Ticket</button>
          {results.map((r,i) =>
            <button key={i} className="btn rounded-lg bg-base-100" style={{ borderColor: r.color }} onClick={
              () => setResult(ticket, r.name).then(() => window.location.reload())
            }>Set {r.name}</button>
          )}</>
        : <></>}
  </div>
}



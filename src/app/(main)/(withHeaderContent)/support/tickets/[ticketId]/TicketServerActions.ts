'use server'

import Ticket from "@/libs/types/entities/Ticket";
import { EditTicket } from "@/services/forum/ticket/TicketService";


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

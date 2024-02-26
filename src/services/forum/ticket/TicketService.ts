'use server';

import HTTPClient from "@/libs/HTTPClient";
import Ticket from "@/libs/types/entities/Ticket";
import TicketReply from "@/libs/types/entities/TicketReply";

/**
* Create a new forum ticket.
*
* @param ticket The Ticket object.
* @return The created ticket.
*/
// In the API: @PostMapping(path = "/forum/ticket")
export const CreateTicket = async (ticket: Ticket, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.PostAsync<Ticket>("/forum/ticket", ticket);


/**
* Edit an existing forum ticket.
*
* @param ticket The Ticket object.
* @return The edited ticket.
*/
// In the API: @PutMapping(path = "/forum/ticket/{id}")
export const EditTicket = async (ticket: Ticket, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.PutAsync<Ticket>(`/forum/ticket/${ticket._id}`, ticket)

/**
* Get details of a specific forum ticket by its ID.
*
* @param id The ID of the ticket to retrieve.
* @return The ResponseEntity with JSON representation of the ticket.
*/
// In the API: @GetMapping(path = "/forum/ticket/{id}")
export const GetTicket = async (id: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Ticket>(`/forum/ticket/${id}`)


/**
* Get tickets associated with a specific player (UUID).
*
* @param uuid The UUID of the player.
* @param page The page number for paginated results.
* @return An array of tickets.
*/
// In the API: @GetMapping(path = "/forum/ticket/player/{uuid}")
export const GetPlayerTickets = async (uuid: string, page: number = 1, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Ticket[]>(`/forum/ticket/player/${uuid}?page=${page}`)

/**
* Get all forum tickets (admin view).
*
* @param page The page number for paginated results.
* @return An array of tickets.
*/
// makes this /forum/tickets/all, clashing with /forum/ticket/{id} otherwise
// In the API: @GetMapping(path = "/forum/ticket/admin")
export const GetAllTickets = async (page: number = 1, client: HTTPClient = new HTTPClient(process.env.API_URL!)) => 
  await client.GetAsync<Ticket[]>(`/forum/ticket/admin?page=${page}`)

/**
* Create a reply for a specific ticket.
*
* @param ticket The ticket reply to be created.
* @param parentId  The ID of the parent ticket.
* @return The created reply.
*/
// In the API: @PostMapping(path = "/forum/ticket/{parentId}/reply")
export const CreateReply = async (ticket: Ticket, parentId: String, client: HTTPClient = new HTTPClient(process.env.API_URL!)) => 
  await client.PostAsync<TicketReply>(`/forum/ticket/${parentId}/reply`, ticket)


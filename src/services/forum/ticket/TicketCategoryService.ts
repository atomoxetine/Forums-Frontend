'use server';

import HTTPClient from "@/libs/HTTPClient";
import TicketCategory from "@/libs/types/entities/TicketCategory"

/**
* Create a new ticket category.
*
* @param category The TicketCategory object.
* @return The created category.
*/
// In the API: @PostMapping(path = "/forum/ticket/category")
export const CreateTicketCategory = async (category: TicketCategory, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.PostAsync<TicketCategory>("/forum/ticket/category", category);


/**
* Edit an existing forum ticket category.
*
* @param category The TicketCategory object.
* @return The edited category.
*/
// In the API: @PutMapping(path = "/forum/ticket/category/{id}")
export const EditTicketCategory = async (category: TicketCategory, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.PutAsync<TicketCategory>(`/forum/ticket/category/${category._id}`, category)

/**
* Get details of a specific forum ticket category by its ID.
*
* @param id The ID of the ticket category to retrieve.
* @return The ResponseEntity with JSON representation of the ticket.
*/
// In the API: @GetMapping(path = "/forum/ticket/category/{id}")
export const GetTicketCategory = async (id: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<TicketCategory>(`/forum/ticket/category/${id}`)

/**
* Get all ticket categories.
*
* @return An array of categories.
*/
// In the API: @GetMapping(path = "/forum/ticket/category")
export const GetAllTicketCategories = async (client: HTTPClient = new HTTPClient(process.env.API_URL!)) => 
  await client.GetAsync<TicketCategory[]>(`/forum/ticket/category`)


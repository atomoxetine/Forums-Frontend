'use server';

import HTTPClient from "@/libs/HTTPClient";
import Forum from "@/libs/types/entities/Forum";

/**
* Get forum details, optionally with threads based on page number.
*
* @param id   The ID of the forum.
* @param page The page number for retrieving threads (default: -1).
* @return ResponseEntity with forum details or an error message.
*/
// In the API: @GetMapping(path = "/forum/forum/{id}")]
export const GetForum = async (id: string, page: number = -1, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Forum>(`/forum/forum/${id}`);

/**
* Create a new forum.
*
* @param body (type: { id: string, name: string, description: string, weight: number, locked: boolean, categoryId: string }) The JSON object containing forum details.
* @return ResponseEntity with the created forum details or an error message.
*/
// In the API: @PostMapping(path = "/forum/forum")
export const CreateForum = async (forumData: Forum, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.PostAsync<Forum>(`/forum/forum`, forumData);

/**
* Edit an existing forum.
*
* @param body (type: { name?: string, description?: string, weight?: number, locked?: boolean }) The JSON object containing updated forum details.
* @param id   The ID of the forum to be edited.
* @return ResponseEntity with the edited forum details or an error message.
*/
// In the API: @PutMapping(path = "/forum/forum/{id}")
export const EditForum = async (id: string, name?: string, description?: string, weight?: number, locked?: boolean, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
await client.PutAsync<Forum>(`/forum/forum/${id}`, {name, description, weight, locked});

/**
* Delete a forum.
*
* @param id The ID of the forum to be deleted.
* @return ResponseEntity with the deleted forum details or an error message.
*/
// In the API: @DeleteMapping(path = "/forum/forum/{id}")
export const DeleteForum = async (id: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.DeleteAsync<Forum>(`/forum/forum/${id}`);
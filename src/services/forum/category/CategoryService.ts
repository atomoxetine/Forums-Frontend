'use server';

import ForumCategory from '@/libs/types/entities/ForumCategory';
import HTTPClient from "@/libs/HTTPClient";

/**
* Retrieve all forum categories.
*
* @return ResponseEntity containing a JsonArray of forum categories in the body.
*/
// In the API: @GetMapping(path = "/forum/category")
export const GetForumCategories = async (client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<ForumCategory[]>(`/forum/category`);

/**
* Create a new forum category.
*
* @param body (type: { id: string, name: string, weight: number }) The JSON object containing information for creating the new category.
* @return ResponseEntity containing the created forum category in the body.
*/
// In the API: @PostMapping(path = "/forum/category")
export const CreateForumCategory = async (id: string, name: string, weight: number, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.PostAsync<ForumCategory>(`/forum/category`, { id, name, weight });

/**
* Update an existing forum category.
*
* @param body (type: { name?: string, weight?: int }) The JSON object containing information for updating the category.
* @param id   The ID of the category to be updated.
* @return ResponseEntity containing the updated forum category in the body.
*/
// In the API: @PutMapping(path = "/forum/category/{id}")
export const UpdateForumCategory = async (id: string, name?: string, weight?: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
   await client.PostAsync<ForumCategory>(`/forum/category/${id}`, {name, weight});

/**
* Delete an existing forum category.
*
* @param id The ID of the category to be deleted.
* @return ResponseEntity containing the deleted forum category in the body.
*/
// In the API: @DeleteMapping(path = "/forum/category/{id}")
export const DeleteForumCategory = async (id: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.DeleteAsync(`/forum/category/${id}`);
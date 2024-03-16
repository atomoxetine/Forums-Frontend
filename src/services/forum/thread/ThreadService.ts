'use server';
import HTTPClient from "@/libs/HTTPClient";
import { isResultError } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import Thread from "@/libs/types/entities/Thread";

/**
* Retrieve a list of forum threads within a specific forum.
*
* @param forumId The ID or name of the forum.
* @param page    The page number for paginated results (default: 1).
* @return ResponseEntity with a JSON array containing thread details.
*/
// In the API: @GetMapping(path = "/forum/thread/forum/{id}")
export const GetForumThreads = async (forumId: string, page: number = 1, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Thread[]>(`/forum/thread/forum/${forumId}?page=${page}`);

/**
* Retrieve details of a specific forum thread.
*
* @param id The ID of the thread to be retrieved.
* @return ResponseEntity with the thread details in JSON format.
*/
// In the API: @GetMapping(path = "/forum/thread/{id}")
export const GetThread = async (id: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.GetAsync<Thread>(`/forum/thread/${id}`);

/**
* Create a new forum thread.
*
* @param body (type: { id: string, title: string, body: string, forumId: string, author: string }) The JSON object containing thread details.
* @return ResponseEntity with the created thread details in JSON format.
*/
// In the API: @PostMapping(path = "/forum/thread")
export const CreateThread = async (id: string, title: string, body: string, forum: string, author: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.PostAsync<Thread>(`/forum/thread`, {id, title, body, forum, author});

/**
* Edit an existing forum thread.
*
* @param body (type: { title?: string, body?: string, pinned?: boolean, locked?: boolean, lastEditedBy?: string, lastEditedAt?: string }) The JSON object containing updated thread details.
* @param id   The ID of the thread to be edited.
* @return ResponseEntity with the edited thread details in JSON format.
*/
// In the API: @PutMapping(path = "/forum/thread/{id}")
export const EditThread = async (thread: Thread, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.PutAsync<Thread>(`/forum/thread/${thread._id}`, thread);

/**
* Delete an existing forum thread.
*
* @param id The ID of the thread to be deleted.
* @return ResponseEntity with the deleted thread details in JSON format.
*/
// In the API: @DeleteMapping(path = "/forum/thread/{id}")
export const DeleteThread = async (id: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.DeleteAsync<Thread>(`/forum/thread/${id}`);

/**
* Create a reply within an existing forum thread.
*
* @param body (type: { id: string, title: string, body: string, forumId: string, author: string }) The JSON object containing reply details.
* @param parentId The ID of the parent thread.
* @return ResponseEntity with the created reply details in JSON format.
*/
// In the API: @PostMapping(path = "/forum/thread/{parentId}/reply")
export const CreateReply = async (id: string, title: string, body: string, forumId: string, author: string, parentId: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) =>
  await client.PostAsync<Thread>(`/forum/thread/${parentId}/reply`, {id, title, body, forumId, author});

/**
* Delete a reply within a forum thread.
*
* @param parentId The ID of the parent thread.
* @param replyId  The ID of the reply thread to be deleted.
* @return ResponseEntity with the deleted reply details in JSON format.
*/
// In the API: @DeleteMapping(path = "/forum/thread/{parentId}/{id}")
export const DeleteReply = async (parentId: string, replyId: string, client: HTTPClient = new HTTPClient(process.env.API_URL!)) => {
  const currUser = await getSession();

  // const thread = await GetThread(replyId);
  // const isError = isResultError(thread);
  // if (isError) {
  //   console.error("Error fetching thread: HTTP " + thread[1]);
  //   return;
  // }
  // if (thread[0]!.author == currUser.uuid)
  await client.DeleteAsync<Thread>(`/forum/thread/${parentId}/${replyId}`)
};

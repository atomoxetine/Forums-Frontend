'use server';

/**
 * Create a new forum thread.
 *
 * @param body (type: { id: string, title: string, body: string, forumId: string, author: string }) The JSON object containing thread details.
 * @return ResponseEntity with the created thread details in JSON format.
 */
// In the API: @PostMapping(path = "/forum/thread")


/**
 * Edit an existing forum thread.
 *
 * @param body (type: { title?: string, body?: string, pinned?: boolean, locked?: boolean, lastEditedBy?: string, lastEditedAt?: string }) The JSON object containing updated thread details.
 * @param id   The ID of the thread to be edited.
 * @return ResponseEntity with the edited thread details in JSON format.
 */
// In the API: @PutMapping(path = "/forum/thread/{id}")


/**
 * Delete an existing forum thread.
 *
 * @param id The ID of the thread to be deleted.
 * @return ResponseEntity with the deleted thread details in JSON format.
 */
// In the API: @DeleteMapping(path = "/forum/thread/{id}")


/**
 * Delete a reply within a forum thread.
 *
 * @param parentId The ID of the parent thread.
 * @param replyId  The ID of the reply thread to be deleted.
 * @return ResponseEntity with the deleted reply details in JSON format.
 */
// In the API: @DeleteMapping(path = "/forum/thread/{parentId}/{id}")


/**
 * Retrieve details of a specific forum thread.
 *
 * @param id The ID of the thread to be retrieved.
 * @return ResponseEntity with the thread details in JSON format.
 */
// In the API: @GetMapping(path = "/forum/thread/{id}")


/**
 * Retrieve a list of forum threads within a specific forum.
 *
 * @param forumId The ID or name of the forum.
 * @param page    The page number for paginated results (default: 1).
 * @return ResponseEntity with a JSON array containing thread details.
 */
// In the API: @GetMapping(path = "/forum/thread/forum/{id}")


/**
 * Create a reply within an existing forum thread.
 *
 * @param body (type: { id: string, title: string, body: string, forumId: string, author: string }) The JSON object containing reply details.
 * @param parentId The ID of the parent thread.
 * @return ResponseEntity with the created reply details in JSON format.
 */
// In the API: @PostMapping(path = "/forum/thread/{parentId}/reply")

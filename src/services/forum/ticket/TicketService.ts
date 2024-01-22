'use server';

/**
 * Create a new forum ticket.
 *
 * @param body (type: { id: string, category: string, body: string, status: string, author: string }) The JSON object containing ticket details.
 * @return The ResponseEntity with JSON representation of the created ticket.
 */
// In the API: @PostMapping(path = "/forum/ticket")


/**
 * Edit an existing forum ticket.
 *
 * @param body (type: { category?: string, title?: string, body?: string, status?: string }) The JSON object containing updated ticket details.
 * @param id   The ID of the ticket to be edited.
 * @return The ResponseEntity with JSON representation of the edited ticket.
 */
// In the API: @PutMapping(path = "/forum/ticket/{id}")


/**
 * Get details of a specific forum ticket by its ID.
 *
 * @param id The ID of the ticket to retrieve.
 * @return The ResponseEntity with JSON representation of the ticket.
 */
// In the API: @GetMapping(path = "/forum/ticket/{id}")


/**
 * Get tickets associated with a specific player (UUID).
 *
 * @param uuid The UUID of the player.
 * @param page The page number for paginated results.
 * @return The ResponseEntity with JSON representation of player's tickets.
 */
// In the API: @GetMapping(path = "/forum/ticket/player/{uuid}")


/**
 * Get all forum tickets (admin view).
 *
 * @param page The page number for paginated results.
 * @return The ResponseEntity with JSON representation of all tickets.
 */
// makes this /forum/tickets/all, clashing with /forum/ticket/{id} otherwise
// In the API: @GetMapping(path = "/forum/ticket/admin")


/**
 * Create a reply for a specific ticket.
 *
 * @param body (type: { id: string, body: string, author: string }) The JSON object containing reply details.
 * @param parentId  The ID of the parent ticket.
 * @return The ResponseEntity with JSON representation of the created reply.
 */
// In the API: @PostMapping(path = "/forum/ticket/{parentId}/reply")

'use server';

/**
 * Asynchronous endpoint to retrieve chat snapshots by player UUID.
 *
 * @param uuid The UUID of the player for whom chat snapshots are requested.
 * @return ResponseEntity containing a CompletableFuture with a list of ChatSnapshots.
 */
// In the API: @GetMapping("/snapshots/{uuid}")


/**
 * Endpoint to retrieve a chat snapshot by its nice ID.
 *
 * @param id The nice ID of the chat snapshot.
 * @return ResponseEntity containing the ChatSnapshot or not found status if not available.
 */
// In the API: @GetMapping("/snapshots/id/{id}")
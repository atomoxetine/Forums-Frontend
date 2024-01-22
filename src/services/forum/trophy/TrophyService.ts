'use server';

/**
 * Get a list of all trophies.
 *
 * @return ResponseEntity containing a JsonArray with trophy information.
 */
// In the API: @GetMapping(path = "/forum/trophy")


/**
 * Delete a trophy by its ID.
 *
 * @param id The ID of the trophy to be deleted.
 * @return ResponseEntity with the deleted trophy's JSON representation.
 */
  // In the API: @DeleteMapping(path = "/forum/trophy/{id}")


/**
 * Create a new trophy.
 *
 * @param body (type: { id: string, name: string }) The JSON body containing information for creating the trophy.
 * @return ResponseEntity with the created trophy's JSON representation.
 */
// In the API: @PostMapping(path = "/forum/trophy")


/**
 * Get information about a specific trophy by its ID.
 *
 * @param id The ID of the trophy to retrieve.
 * @return ResponseEntity with the trophy's JSON representation.
 */
// In the API: @GetMapping(path = "/forum/trophy/{id}")
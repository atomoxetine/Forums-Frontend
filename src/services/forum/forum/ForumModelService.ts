'use server';

/**
 * Create a new forum.
 *
 * @param body (type: { id: string, name: string, description: string, weight: number, locked: boolean, categoryId: string }) The JSON object containing forum details.
 * @return ResponseEntity with the created forum details or an error message.
 */
// In the API: @PostMapping(path = "/forum/forum")


/**
 * Edit an existing forum.
 *
 * @param body (type: { name?: string, description?: string, weight?: number, locked?: boolean }) The JSON object containing updated forum details.
 * @param id   The ID of the forum to be edited.
 * @return ResponseEntity with the edited forum details or an error message.
 */
// In the API: @PutMapping(path = "/forum/forum/{id}")


/**
 * Delete a forum.
 *
 * @param id The ID of the forum to be deleted.
 * @return ResponseEntity with the deleted forum details or an error message.
 */
// In the API: @DeleteMapping(path = "/forum/forum/{id}")


/**
 * Get forum details, optionally with threads based on page number.
 *
 * @param id   The ID of the forum.
 * @param page The page number for retrieving threads (default: -1).
 * @return ResponseEntity with forum details or an error message.
 */
// In the API: @GetMapping(path = "/forum/forum/{id}")
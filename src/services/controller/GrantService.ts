'use server';

/**
 * Asynchronous endpoint to retrieve a single grant by its UUID.
 *
 * @param id The UUID of the grant to be retrieved.
 * @return ResponseEntity containing the Grant or not found status if not available.
 */
// In the API: @GetMapping("/grants/id/{id}")


/**
 * Endpoint to retrieve a single grant by its UUID and convert it to a simplified form for the site.
 *
 * @param id The UUID of the grant to be retrieved.
 * @return ResponseEntity containing the GrantToSend or not found status if not available.
 */
// In the API: @GetMapping("/grants/id/site/{id}")


/**
 * Endpoint to retrieve all grants for a player based on their UUID.
 *
 * @param uuid The UUID of the player for whom grants are requested.
 * @return ResponseEntity containing a list of Grants.
 */
// In the API: @GetMapping("/grants/{uuid}")


/**
 * Endpoint to retrieve all grants for a player and convert them to a simplified form for the site.
 *
 * @param uuid The UUID of the player for whom grants are requested.
 * @return ResponseEntity containing a list of GrantToSend objects.
 */
// In the API: @GetMapping("/grants/site/{uuid}")


/**
 * Endpoint to retrieve all active grants for a player based on their UUID.
 *
 * @param uuid The UUID of the player for whom active grants are requested.
 * @return ResponseEntity containing a list of active Grants.
 */
// In the API: @GetMapping("/grants/active/{uuid}")


/**
 * Endpoint to retrieve all active grants for a player and convert them to a simplified form for the site.
 *
 * @param uuid The UUID of the player for whom active grants are requested.
 * @return ResponseEntity containing a list of active GrantToSend objects.
 */
// In the API: @GetMapping("/grants/active/site/{uuid}")


/**
 * Endpoint to retrieve all active ranks for a player based on their UUID.
 *
 * @param uuid The UUID of the player for whom active ranks are requested.
 * @return ResponseEntity containing a list of active Ranks.
 */
// In the API: @GetMapping("/grants/active/ranks/{uuid}")


/**
 * Asynchronous endpoint to retrieve all grants issued by a player based on their UUID.
 *
 * @param uuid The UUID of the player who issued the grants.
 * @return ResponseEntity containing a list of Grants.
 */
// In the API: @GetMapping("/grants/issuedBy/{uuid}")


/**
 * Asynchronous endpoint to retrieve all grants issued by a player and convert them to a simplified form for the site.
 *
 * @param uuid The UUID of the player who issued the grants.
 * @return ResponseEntity containing a list of GrantToSend objects.
 */
// In the API: @GetMapping("/grants/site/issuedBy/{uuid}")


/**
 * Endpoint to update a grant in the database and trigger a GrantsUpdatePacket.
 *
 * @param grant The Grant object to be updated.
 * @return ResponseEntity indicating the success of the update.
 */
// In the API: @PostMapping("/grants/update")
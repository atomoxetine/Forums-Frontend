'use server';

/**
 * Endpoint to retrieve a specific punishment by its ID.
 *
 * @param id The ID of the punishment.
 * @return ResponseEntity containing the Punishment or not found status if the punishment is not available.
 */
// In the API: @GetMapping("/punishments/id/{id}")


/**
 * Endpoint to retrieve a specific punishment by its ID for the site.
 *
 * @param id The ID of the punishment.
 * @return ResponseEntity containing the Punishment or not found status if the punishment is not available.
 */
// In the API: @GetMapping("/punishments/id/site/{id}")


/**
 * Endpoint to retrieve all punishments for a user based on their UUID.
 *
 * @param uuid The UUID of the user.
 * @return ResponseEntity containing a list of Punishment objects representing all punishments for the user.
 */
// In the API: @GetMapping("/punishments/{uuid}")


/**
 * Endpoint to retrieve all site punishments for a user based on their UUID.
 *
 * @param uuid The UUID of the user.
 * @return ResponseEntity containing a list of PunishmentToSend objects representing all site punishments for the user.
 */
// In the API: @GetMapping("/punishments/site/{uuid}")


/**
 * Endpoint to retrieve all active site punishments for a user based on their UUID.
 *
 * @param uuid The UUID of the user.
 * @return ResponseEntity containing a list of PunishmentToSend objects representing all active site punishments for the user.
 */
// In the API: @GetMapping("/punishments/active/site/{uuid}")


/**
 * Endpoint to retrieve all active punishments for a user based on their UUID.
 *
 * @param uuid The UUID of the user.
 * @return ResponseEntity containing a list of Punishment objects representing all active punishments for the user.
 */
// In the API: @GetMapping("/punishments/active/{uuid}")


/**
 * Endpoint to retrieve all removed punishments by a staff member based on their UUID.
 *
 * @param uuid The UUID of the staff member.
 * @return ResponseEntity containing a list of Punishment objects representing all removed punishments by the staff member.
 */
// In the API: @GetMapping("/punishments/removedBy/{uuid}")


/**
 * Endpoint to retrieve all site removed punishments by a staff member based on their UUID.
 *
 * @param uuid The UUID of the staff member.
 * @return ResponseEntity containing a list of PunishmentToSend objects representing all site removed punishments by the staff member.
 */
// In the API: @GetMapping("/punishments/removedBy/site/{uuid}")


/**
 * Endpoint to retrieve all punishments issued by a staff member based on their UUID.
 *
 * @param uuid The UUID of the staff member.
 * @return ResponseEntity containing a list of Punishment objects representing all punishments issued by the staff member.
 */
// In the API: @GetMapping("/punishments/issuedBy/{uuid}")


/**
 * Endpoint to retrieve all site punishments issued by a staff member based on their UUID.
 *
 * @param uuid The UUID of the staff member.
 * @return ResponseEntity containing a list of PunishmentToSend objects representing all site punishments issued by the staff member.
 */
// In the API: @GetMapping("/punishments/issuedBy/site/{uuid}")


/**
 * Endpoint to retrieve a specific punishment by its punishment ID.
 *
 * @param id The punishment ID.
 * @return ResponseEntity containing the Punishment or not found status if the punishment is not available.
 */
// In the API: @GetMapping("/punishments/punishmentId/{id}")


/**
 * Endpoint to update a punishment.
 *
 * @param punishment The updated punishment.
 * @return ResponseEntity with a success message if the update is successful.
 */
// In the API: @PostMapping("/punishments/update")
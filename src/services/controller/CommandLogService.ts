'use server';

/**
 * Endpoint to retrieve command logs issued by a player within a specific time range.
 *
 * @param uuid The UUID of the player for whom command logs are requested.
 * @param time The timestamp representing the time range for command logs.
 * @return ResponseEntity containing a list of CommandLogs.
 */
// In the API: @GetMapping("/commandLogs/{uuid}/{time}")


/**
 * Endpoint to retrieve command logs for a specific server within a time range.
 *
 * @param server The name of the server for which command logs are requested.
 * @param time The timestamp representing the time range for command logs.
 * @return ResponseEntity containing a list of CommandLogs.
 */
// In the API: @GetMapping("/commandLogs/server/{server}/{time}")
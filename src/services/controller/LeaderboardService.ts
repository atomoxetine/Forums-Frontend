'use server';

/**
 * WARNING: DEPRECATED
 * Endpoint to retrieve leaderboard data for the "soup" category.
 *
 * @return ResponseEntity containing a map with leaderboard statistics and player information.
 */
// In the API: @GetMapping("/leaderboards/soup")


/**
 * Endpoint to retrieve leaderboard data for the "bedwars" category.
 *
 * @return ResponseEntity containing a map with leaderboard statistics and player information.
 */
// In the API: @GetMapping("/leaderboards/bedwars")


/**
 * Endpoint to retrieve player statistics for a specific leaderboard category and player UUID.
 *
 * @param category The category of the leaderboard.
 * @param uuid The UUID of the player for whom statistics are requested.
 * @return ResponseEntity containing a list of Pair objects representing player statistics.
 */
// In the API: @GetMapping("/leaderboards/stats/{category}/{uuid}")
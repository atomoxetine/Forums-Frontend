'use server';

/**
 * WARNING: DEPRECATED
 * Endpoint to retrieve leaderboard data for the "soup" category.
 *
 * @return ResponseEntity containing a map with leaderboard statistics and player information.
 */
// In the API: @GetMapping("/leaderboards/soup")
export const GetSoupLeaderboard = async (client?: HTTPClient) => {
    const uri = `/leaderboards/soup`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }

/**
 * Endpoint to retrieve leaderboard data for the "bedwars" category.
 *
 * @return ResponseEntity containing a map with leaderboard statistics and player information.
 */
// In the API: @GetMapping("/leaderboards/bedwars")
export const GetBedwarsLeaderboard = async (client?: HTTPClient) => {
    const uri = `/leaderboards/bedwars`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }

/**
 * Endpoint to retrieve player statistics for a specific leaderboard category and player UUID.
 *
 * @param category The category of the leaderboard.
 * @param uuid The UUID of the player for whom statistics are requested.
 * @return ResponseEntity containing a list of Pair objects representing player statistics.
 */
// In the API: @GetMapping("/leaderboards/stats/{category}/{uuid}")
export const GetLeaderboardStats = async (category: string, uuid: string, client?: HTTPClient) => {
    const uri = `/leaderboards/stats/${category}/${uuid}`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }

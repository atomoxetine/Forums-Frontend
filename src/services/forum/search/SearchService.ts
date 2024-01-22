'use server';

/**
 * Perform a search based on the provided query.
 *
 * @param query The search query.
 * @param limit The maximum number of results to return (default: 6).
 * @return ResponseEntity with the search results in JSON format or an empty array if no results.
 */
// In the API: @GetMapping(path = "/search")
export const Search = async (query: string, limit: number = 6, client?: HTTPClient) => {
    const uri = `/search?query=${query}&limit=${limit}`;
    
    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();
    
    return response;
    }
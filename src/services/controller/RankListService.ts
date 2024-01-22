'use server';

/**
 * Endpoint to retrieve the staff rank list.
 *
 * @return ResponseEntity containing a Map with staff ranks categorized by key and a list of corresponding values.
 */
// In the API: @GetMapping("/staff")
export const GetStaffRanks = async (client?: HTTPClient) => {
    const uri = `/staff`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }

/**
 * Endpoint to retrieve the media rank list.
 *
 * @return ResponseEntity containing a Map with media ranks categorized by key and a list of corresponding values.
 */
// In the API: @GetMapping("/media")
export const GetMediaRanks = async (client?: HTTPClient) => {
    const uri = `/media`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }
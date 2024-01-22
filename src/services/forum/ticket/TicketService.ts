'use server';

/**
 * Create a new forum ticket.
 *
 * @param body (type: { id: string, category: string, body: string, status: string, author: string }) The JSON object containing ticket details.
 * @return The ResponseEntity with JSON representation of the created ticket.
 */
// In the API: @PostMapping(path = "/forum/ticket")
export const CreateTicket = async (formData: FormData, client?: HTTPClient) => {
    const uri = `/forum/ticket`;
    
    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.PostAsync(uri, formData)).json();
    
    return response;
    }

/**
 * Edit an existing forum ticket.
 *
 * @param body (type: { category?: string, title?: string, body?: string, status?: string }) The JSON object containing updated ticket details.
 * @param id   The ID of the ticket to be edited.
 * @return The ResponseEntity with JSON representation of the edited ticket.
 */
// In the API: @PutMapping(path = "/forum/ticket/{id}")
export const EditTicket = async (formData: FormData, client?: HTTPClient) => {
    const id = formData.get("id") as string;
    const uri = `/forum/ticket/${id}`;
    
    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.PutAsync(uri, formData)).json();
    
    return response;
    }

/**
 * Get details of a specific forum ticket by its ID.
 *
 * @param id The ID of the ticket to retrieve.
 * @return The ResponseEntity with JSON representation of the ticket.
 */
// In the API: @GetMapping(path = "/forum/ticket/{id}")
export const GetTicket = async (id: string, client?: HTTPClient) => {
    const uri = `/forum/ticket/${id}`;
    
    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();
    
    return response;
    }

/**
 * Get tickets associated with a specific player (UUID).
 *
 * @param uuid The UUID of the player.
 * @param page The page number for paginated results.
 * @return The ResponseEntity with JSON representation of player's tickets.
 */
// In the API: @GetMapping(path = "/forum/ticket/player/{uuid}")
export const GetPlayerTickets = async (uuid: string, page: number = -1, client?: HTTPClient) => {
    const uri = `/forum/ticket/player/${uuid}?page=${page}`;
    
    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();
    
    return response;
    }

/**
 * Get all forum tickets (admin view).
 *
 * @param page The page number for paginated results.
 * @return The ResponseEntity with JSON representation of all tickets.
 */
// makes this /forum/tickets/all, clashing with /forum/ticket/{id} otherwise
// In the API: @GetMapping(path = "/forum/ticket/admin")
export const GetAllTickets = async (page: number = -1, client?: HTTPClient) => {
    const uri = `/forum/ticket/admin?page=${page}`;
    
    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();
    
    return response;
    }

/**
 * Create a reply for a specific ticket.
 *
 * @param body (type: { id: string, body: string, author: string }) The JSON object containing reply details.
 * @param parentId  The ID of the parent ticket.
 * @return The ResponseEntity with JSON representation of the created reply.
 */
// In the API: @PostMapping(path = "/forum/ticket/{parentId}/reply")
export const CreateReply = async (formData: FormData, client?: HTTPClient) => {
    const parentId = formData.get("parentId") as string;
    const uri = `/forum/ticket/${parentId}/reply`;
    
    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.PostAsync(uri, formData)).json();
    
    return response;
    }
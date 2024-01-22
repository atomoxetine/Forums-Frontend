'use server';

/**
 * Endpoint to retrieve a specific punishment by its ID.
 *
 * @param id The ID of the punishment.
 * @return ResponseEntity containing the Punishment or not found status if the punishment is not available.
 */
// In the API: @GetMapping("/punishments/id/{id}")
export const GetPunishment = async (id: string, client?: HTTPClient) => {
    const uri = `/punishments/id/${id}`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }

/**
 * Endpoint to retrieve a specific punishment by its ID for the site.
 *
 * @param id The ID of the punishment.
 * @return ResponseEntity containing the Punishment or not found status if the punishment is not available.
 */
// In the API: @GetMapping("/punishments/id/site/{id}")
export const GetPunishmentToSend = async (id: string, client?: HTTPClient) => {
    const uri = `/punishments/id/site/${id}`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }

/**
 * Endpoint to retrieve all punishments for a user based on their UUID.
 *
 * @param uuid The UUID of the user.
 * @return ResponseEntity containing a list of Punishment objects representing all punishments for the user.
 */
// In the API: @GetMapping("/punishments/{uuid}")
export const GetPunishments = async (uuid: string, client?: HTTPClient) => {
    const uri = `/punishments/${uuid}`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }

/**
 * Endpoint to retrieve all site punishments for a user based on their UUID.
 *
 * @param uuid The UUID of the user.
 * @return ResponseEntity containing a list of PunishmentToSend objects representing all site punishments for the user.
 */
// In the API: @GetMapping("/punishments/site/{uuid}")
export const GetPunishmentsToSend = async (uuid: string, client?: HTTPClient) => {
    const uri = `/punishments/site/${uuid}`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }

/**
 * Endpoint to retrieve all active site punishments for a user based on their UUID.
 *
 * @param uuid The UUID of the user.
 * @return ResponseEntity containing a list of PunishmentToSend objects representing all active site punishments for the user.
 */
// In the API: @GetMapping("/punishments/active/site/{uuid}")
export const GetActivePunishmentsToSend = async (uuid: string, client?: HTTPClient) => {
    const uri = `/punishments/active/site/${uuid}`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }

/**
 * Endpoint to retrieve all active punishments for a user based on their UUID.
 *
 * @param uuid The UUID of the user.
 * @return ResponseEntity containing a list of Punishment objects representing all active punishments for the user.
 */
// In the API: @GetMapping("/punishments/active/{uuid}")
export const GetActivePunishments = async (uuid: string, client?: HTTPClient) => {
    const uri = `/punishments/active/${uuid}`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }
/**
 * Endpoint to retrieve all removed punishments by a staff member based on their UUID.
 *
 * @param uuid The UUID of the staff member.
 * @return ResponseEntity containing a list of Punishment objects representing all removed punishments by the staff member.
 */
// In the API: @GetMapping("/punishments/removedBy/{uuid}")
export const GetRemovedPunishments = async (uuid: string, client?: HTTPClient) => {
    const uri = `/punishments/removedBy/${uuid}`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }

/**
 * Endpoint to retrieve all site removed punishments by a staff member based on their UUID.
 *
 * @param uuid The UUID of the staff member.
 * @return ResponseEntity containing a list of PunishmentToSend objects representing all site removed punishments by the staff member.
 */
// In the API: @GetMapping("/punishments/removedBy/site/{uuid}")
export const GetRemovedPunishmentsToSend = async (uuid: string, client?: HTTPClient) => {
    const uri = `/punishments/removedBy/site/${uuid}`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }

/**
 * Endpoint to retrieve all punishments issued by a staff member based on their UUID.
 *
 * @param uuid The UUID of the staff member.
 * @return ResponseEntity containing a list of Punishment objects representing all punishments issued by the staff member.
 */
// In the API: @GetMapping("/punishments/issuedBy/{uuid}")
export const GetIssuedPunishments = async (uuid: string, client?: HTTPClient) => {
    const uri = `/punishments/issuedBy/${uuid}`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
    }

/**
 * Endpoint to retrieve all site punishments issued by a staff member based on their UUID.
 *
 * @param uuid The UUID of the staff member.
 * @return ResponseEntity containing a list of PunishmentToSend objects representing all site punishments issued by the staff member.
 */
// In the API: @GetMapping("/punishments/issuedBy/site/{uuid}")
export const GetIssuedPunishmentsToSend = async (uuid: string, client?: HTTPClient) => {
    const uri = `/punishments/issuedBy/site/${uuid}`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
}

/**
 * Endpoint to retrieve a specific punishment by its punishment ID.
 *
 * @param id The punishment ID.
 * @return ResponseEntity containing the Punishment or not found status if the punishment is not available.
 */
// In the API: @GetMapping("/punishments/punishmentId/{id}")
export const GetPunishmentByPunishmentId = async (id: string, client?: HTTPClient) => {
    const uri = `/punishments/punishmentId/${id}`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.GetAsync(uri)).json();

    return response;
}

/**
 * Endpoint to update a punishment.
 *
 * @param punishment The updated punishment.
 * @return ResponseEntity with a success message if the update is successful.
 */
// In the API: @PostMapping("/punishments/update")
export const UpdatePunishment = async (punishment: Punishment, client?: HTTPClient) => { 
    const uri = `/punishments/update`;

    client ??= new HTTPClient(process.env.API_URL!);
    const response = await (await client.PostAsync(uri, punishment)).json();

    return response;
} 
//'use server';
//
///**
// * Endpoint to retrieve all notifications.
// *
// * @return ResponseEntity containing a list of Notification objects representing all notifications.
// */
//// In the API: @GetMapping("/notifications/all")
//export const GetAllNotifications = async (client?: HTTPClient) => {
//    const uri = `/notifications/all`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
///**
// * Endpoint to retrieve a specific notification by its ID.
// *
// * @param id The ID of the notification.
// * @return ResponseEntity containing the Notification or not found status if the notification is not available.
// */
//// In the API: @GetMapping("/notifications/{id}")
//export const GetNotification = async (id: string, client?: HTTPClient) => {
//    const uri = `/notifications/${id}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
///**
// * Endpoint to retrieve all read notifications for a player based on their UUID.
// *
// * @param uuid The UUID of the player.
// * @return ResponseEntity containing a list of read Notification objects.
// */
//// In the API: @GetMapping("/notifications/read/{uuid}")
//export const GetReadNotifications = async (uuid: string, client?: HTTPClient) => {
//    const uri = `/notifications/read/${uuid}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
///**
// * Endpoint to retrieve all unread notifications for a player based on their UUID.
// *
// * @param uuid The UUID of the player.
// * @return ResponseEntity containing a list of unread Notification objects.
// */
//// In the API: @GetMapping("/notifications/unread/{uuid}")
//export const GetUnreadNotifications = async (uuid: string, client?: HTTPClient) => {
//    const uri = `/notifications/unread/${uuid}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
///**
// * Endpoint to retrieve all players who have read a specific notification.
// *
// * @param id The ID of the notification.
// * @return ResponseEntity containing a list of player UUIDs who have read the notification.
// */
//// In the API: @GetMapping("/notifications/reads/{id}")
//export const GetReadPlayers = async (id: string, client?: HTTPClient) => {
//    const uri = `/notifications/reads/${id}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
///**
// * Endpoint to retrieve all players who have viewed a specific notification.
// *
// * @param id The ID of the notification.
// * @return ResponseEntity containing a list of player UUIDs who have viewed the notification.
// */
//// In the API: @GetMapping("/notifications/views/{id}")
//export const GetViewedPlayers = async (id: string, client?: HTTPClient) => {
//    const uri = `/notifications/views/${id}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
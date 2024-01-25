//'use server';
//
///**
// * Endpoint to retrieve information about all ranks.
// *
// * @return ResponseEntity containing a list of Rank objects representing all ranks.
// */
//// In the API: @GetMapping("/rank/all")
//export const GetAllRanks = async (client?: HTTPClient) => {
//    const uri = `/rank/all`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
///**
// * Endpoint to retrieve the rank information for a user based on their UUID.
// *
// * @param uuid The UUID of the user.
// * @return ResponseEntity containing the Rank or not found status if the rank information is not available.
// */
//// In the API: @GetMapping("/rank/{uuid}")
//export const GetRank = async (uuid: string, client?: HTTPClient) => {
//    const uri = `/rank/${uuid}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
///**
// * Endpoint to retrieve the rank information for a user based on their rank name.
// *
// * @param name The name of the rank.
// * @return ResponseEntity containing the Rank or not found status if the rank information is not available.
// */
//// In the API: @GetMapping("/rank/name/{name}")
//export const GetRankFromName = async (name: string, client?: HTTPClient) => {
//    const uri = `/rank/name/${name}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
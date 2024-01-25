//'use server';
//
///**
// * Endpoint to retrieve information about all servers.
// *
// * @return ResponseEntity containing a set of ServerData objects representing all servers.
// */
//// In the API: @GetMapping("/servers/all")
//const GetAllServers = async (client?: HTTPClient) => {
//    const uri = `/servers/all`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
///**
// * Endpoint to retrieve information about all proxies.
// *
// * @return ResponseEntity containing a set of ServerData objects representing all proxies.
// */
//// In the API: @GetMapping("/proxies/all")
//const GetAllProxies = async (client?: HTTPClient) => {
//    const uri = `/proxies/all`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
//
///**
// * Endpoint to retrieve information about a specific server by its name.
// *
// * @param name The name of the server.
// * @return ResponseEntity containing the ServerData or not found status if the server is not available.
// */
//// In the API: @GetMapping("/server/{name}")
//export const GetServer = async (name: string, client?: HTTPClient) => {
//    const uri = `/server/${name}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
///**
// * Endpoint to retrieve information about a specific proxy by its name.
// *
// * @param name The name of the proxy.
// * @return ResponseEntity containing the ServerData or not found status if the proxy is not available.
// */
//// In the API: @GetMapping("/proxy/{name}")
//export const GetProxy = async (name: string, client?: HTTPClient) => {
//    const uri = `/proxy/${name}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
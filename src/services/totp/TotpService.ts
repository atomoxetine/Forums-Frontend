//'use server';
//
///**
// * Get TOTP data for a specific user.
// *
// * @param uuid The UUID of the user.
// * @return ResponseEntity with the TOTP data in JSON format.
// */
//// In the API: @GetMapping(path = "/totp/{uuid}")
//export const GetTotp = async (uuid: string, client?: HTTPClient) => {
//    const uri = `/totp/${uuid}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
///**
// * Try to enable TOTP for a user using a provided code.
// *
// * @param body (type: { code: string }) The JSON body containing the TOTP code.
// * @param uuid The UUID of the user.
// * @return ResponseEntity with the result of the TOTP enablement attempt.
// */
//// In the API: @PostMapping(path = "/totp/{uuid}/tryEnable")
//export const TryEnableTotp = async (formData: FormData, client?: HTTPClient) => {
//    const uuid = formData.get("uuid") as string;
//    const uri = `/totp/${uuid}/tryEnable`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.PostAsync(uri, formData)).json();
//
//    return response;
//    }
//
///**
// * Try to authenticate a user using a provided TOTP code.
// *
// * @param body (type: { code: string }) The JSON body containing the TOTP code.
// * @param uuid The UUID of the user.
// * @return ResponseEntity with the result of the TOTP authentication attempt.
// */
//// In the API: @PostMapping(path = "/totp/{uuid}/tryAuth")
//export const TryAuthTotp = async (formData: FormData, client?: HTTPClient) => {
//    const uuid = formData.get("uuid") as string;
//    const uri = `/totp/${uuid}/tryAuth`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.PostAsync(uri, formData)).json();
//
//    return response;
//    }
//
///**
// * Delete TOTP data for a specific user.
// *
// * @param uuid The UUID of the user.
// * @return ResponseEntity with the number of fields deleted.
// */
//// In the API: @DeleteMapping(path = "/totp/{uuid}")
//export const DeleteTotp = async (uuid: string, client?: HTTPClient) => {
//    const uri = `/totp/${uuid}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.DeleteAsync(uri)).json();
//
//    return response;
//    }
//
//'use server';
//
///**
// * Retrieve all forum categories.
// *
// * @return ResponseEntity containing a JsonArray of forum categories in the body.
// */
//// In the API: @GetMapping(path = "/forum/category")
//export const GetForumCategories = async (client?: HTTPClient) => {
//    const uri = `/forum/category`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.GetAsync(uri)).json();
//
//    return response;
//    }
//
//
///**
// * Create a new forum category.
// *
// * @param body (type: { id: string, name: string, weight: number }) The JSON object containing information for creating the new category.
// * @return ResponseEntity containing the created forum category in the body.
// */
//// In the API: @PostMapping(path = "/forum/category")
//export const CreateForumCategory = async (formData: FormData, client?: HTTPClient) => {
//    const uri = `/forum/category`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.PostAsync(uri, formData)).json();
//
//    return response;
//    }
//
///**
// * Update an existing forum category.
// *
// * @param body (type: { name?: string, weight?: int }) The JSON object containing information for updating the category.
// * @param id   The ID of the category to be updated.
// * @return ResponseEntity containing the updated forum category in the body.
// */
//// In the API: @PutMapping(path = "/forum/category/{id}")
//export const UpdateForumCategory = async (formData: FormData, client?: HTTPClient) => {
//    const id = formData.get("id") as string;
//    const uri = `/forum/category/${id}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.PutAsync(uri, formData)).json();
//
//    return response;
//    }
//
//
///**
// * Delete an existing forum category.
// *
// * @param id The ID of the category to be deleted.
// * @return ResponseEntity containing the deleted forum category in the body.
// */
//// In the API: @DeleteMapping(path = "/forum/category/{id}")
//export const DeleteForumCategory = async (id: string, client?: HTTPClient) => {
//    const uri = `/forum/category/${id}`;
//
//    client ??= new HTTPClient(process.env.API_URL!);
//    const response = await (await client.DeleteAsync(uri)).json();
//
//    return response;
//    }
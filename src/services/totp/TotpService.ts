'use server';

/**
 * Get TOTP data for a specific user.
 *
 * @param uuid The UUID of the user.
 * @return ResponseEntity with the TOTP data in JSON format.
 */
// In the API: @GetMapping(path = "/totp/{uuid}")


/**
 * Try to enable TOTP for a user using a provided code.
 *
 * @param body (type: { code: string }) The JSON body containing the TOTP code.
 * @param uuid The UUID of the user.
 * @return ResponseEntity with the result of the TOTP enablement attempt.
 */
// In the API: @PostMapping(path = "/totp/{uuid}/tryEnable")


/**
 * Try to authenticate a user using a provided TOTP code.
 *
 * @param body (type: { code: string }) The JSON body containing the TOTP code.
 * @param uuid The UUID of the user.
 * @return ResponseEntity with the result of the TOTP authentication attempt.
 */
// In the API: @PostMapping(path = "/totp/{uuid}/tryAuth")


/**
 * Delete TOTP data for a specific user.
 *
 * @param uuid The UUID of the user.
 * @return ResponseEntity with the number of fields deleted.
 */
// In the API: @DeleteMapping(path = "/totp/{uuid}")

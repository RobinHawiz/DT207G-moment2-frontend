import { ResponseError } from "@ts/types";
import { displayError } from "@ts/utils";

/**
 * Handles API response errors by logging them to the console.
 * Certain types, such as those with the "network" field, are also displayed to the user.
 *
 * @param elemToAppend - The element to which an error message should be appended
 * @param error - An array of structured API response errors
 */
export function handleWorkExperienceErrors(
  elemToAppend: Element,
  error: Array<ResponseError>
) {
  for (const err of error) {
    console.error(`${err.field}: ${err.message}`);
    if (err.field === "network") {
      displayError(elemToAppend, "Could not display any work experiences :(");
    }
  }
}

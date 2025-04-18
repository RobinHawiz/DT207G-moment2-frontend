import { ResponseError } from "@ts/types";
import { displayError } from "@ts/utils/dom";

/**
 * Renders a field-level error message above the input associated with the given error.
 *
 * @param error - A structured validation error containing the target field and message
 */
export function handleFieldError(error: ResponseError): void {
  if (error.field !== "id") {
    const inputElem = document.querySelector(`#${error.field}`);

    if (!inputElem) {
      console.error(`DOM-element #${error.field} is missing.`);
      return;
    }

    const elemToAppend = inputElem.parentElement!;
    displayError(elemToAppend, error.message);
  } else {
    displayError(
      document.body,
      "The work experience you're editing does not exist. Please go back to the homepage and select a different one :)"
    );
  }
}

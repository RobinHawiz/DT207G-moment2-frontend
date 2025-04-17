import { ResponseError } from "@ts/types";
import { clearFieldErrors } from "@ts/utils/dom";
import {
  handleFieldError,
  handleGlobalError,
  isGlobalError,
} from "@ts/utils/error";

/**
 * Handles both global and field-level errors for the add page form.
 *
 * @param errors - An Array of structured API response errors
 */
export function handleFormErrors(errors: Array<ResponseError>): void {
  let fieldsWithErrors = new Set<string>();
  for (const err of errors) {
    if (isGlobalError(err)) {
      handleGlobalError(document.body, err);
    } else {
      fieldsWithErrors.add(err.field);
      handleFieldError(err);
    }
  }

  const inputElems: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    "form input, form textarea"
  );

  clearFieldErrors(inputElems, fieldsWithErrors);
}

/**
 * Clears displayed field-level error messages from a list of input elements.
 * If a field is not present in the given error set, its associated error message (if any) is removed.
 *
 * @param inputElems - A collection of input elements whose parent containers may contain error messages
 * @param fieldsWithErrors - A set of field names to preserve; errors outside this set will be removed. Defaults to clearing all.
 */
export function clearFieldErrors(
  inputElems: NodeListOf<HTMLInputElement>,
  fieldsWithErrors: Set<string> = new Set<string>()
) {
  if (inputElems.length > 0) {
    inputElems.forEach((input) => {
      if (!fieldsWithErrors.has(input.name)) {
        const errorElem = input.parentElement!.querySelector(".error");
        if (errorElem) {
          errorElem.remove();
        }
      }
    });
  }
}

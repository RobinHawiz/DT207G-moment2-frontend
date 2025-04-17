/**
 * Renders and displays an error message to the user, replacing any
 * existing error within the target element.
 *
 * @param elemToAppend - The element to which an error message will be appended
 * @param message - The error message to display
 */
export function displayError(elemToAppend: Element, message: string): void {
  const prevErrorElem = elemToAppend.querySelector(".error");

  if (prevErrorElem) {
    prevErrorElem.remove();
  }

  const errorElem = document.createElement("p");
  errorElem.setAttribute("class", "error");
  errorElem.innerText = message;
  elemToAppend.insertBefore(errorElem, elemToAppend.firstChild);
}

import { WorkExperienceEntity, WorkExperiencePayload } from "@ts/types";

/**
 * Populates a form's input fields with values from a work experience entry.
 * Assumes each input's ID matches a corresponding key in the entry object (excluding "id").
 *
 * @param form - The form element whose fields should be populated
 * @param entry - A work experience entry containing the values to assign
 */
export function populateFormFields(
  form: HTMLFormElement,
  entry: WorkExperienceEntity | WorkExperiencePayload
): void {
  for (const [key, value] of Object.entries(entry)) {
    if (key === "id") continue;
    const inputElem = form.querySelector(`#${key}`) as HTMLInputElement;

    if (!inputElem) {
      console.warn(`Input element with id: ${key} does not exist.`);
      continue;
    }

    inputElem.value = String(value);
  }
}

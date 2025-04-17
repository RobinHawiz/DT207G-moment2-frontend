import { WorkExperienceAPI } from "@ts/workExperienceApi";
import { ResponseError } from "@ts/types";
import { isResponseError } from "@ts/utils/error";
import { handleFormErrors } from "@ts/add/handleFormErrors";
import { createWorkExperiencePayload } from "@ts/createWorkExperiencePayload";
import { clearFieldErrors } from "@ts/utils/dom";

/**
 * Initializes the add page form by attaching a submit handler.
 * Responsible for wiring up form submission behavior for creating new work experiences.
 */
export function initWorkExperienceForm(): void {
  const FORM_SELECTOR = "form";
  const form = document.querySelector(FORM_SELECTOR);

  if (!form) {
    console.error(`DOM-element ${FORM_SELECTOR} is missing.`);
    return;
  }

  form.addEventListener("submit", handleFormSubmit);
}

/**
 * Handles the submission of the add work experience form.
 * On valid input, inserts the data and shows a confirmation.
 * On validation failure, displays field-specific error messages above the invalid inputs.
 *
 * @param e - The form submission event
 */
async function handleFormSubmit(e: Event): Promise<void> {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const payload = createWorkExperiencePayload(formData);

  try {
    const api = new WorkExperienceAPI(
      "http://localhost:4000/api/work-experience"
    );
    await api.insert(payload);
    const inputElems: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      "form input, form textarea"
    );
    clearFieldErrors(inputElems);
    // Defer the alert to ensure DOM updates from clearFieldErrors are applied before blocking the UI
    setTimeout(() => window.alert("Work experience has been added!"), 0);
  } catch (error) {
    if (Array.isArray(error) && error.every((err) => isResponseError(err))) {
      const resError = error as Array<ResponseError>;
      handleFormErrors(resError);
    } else {
      console.error("Unexpected app error", error);
    }
  }
}

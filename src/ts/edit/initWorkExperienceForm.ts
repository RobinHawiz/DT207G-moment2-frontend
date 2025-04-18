import { WorkExperienceAPI } from "@ts/workExperienceApi";
import { ResponseError, WorkExperienceEntity } from "@ts/types";
import { isResponseError } from "@ts/utils/error";
import { handleFormErrors } from "@ts/utils/error/handleFormErrors";
import { createWorkExperiencePayload } from "@ts/createWorkExperiencePayload";
import { clearFieldErrors } from "@ts/utils/dom";
import { populateFormFields } from "./populateFormFields";

/**
 * Initializes the edit form by populating it with entry data and attaching a submit handler.
 *
 * @param entry - The work experience entry being edited
 */
export function initWorkExperienceForm(entry: WorkExperienceEntity): void {
  const FORM_SELECTOR = "form";
  const form = document.querySelector(FORM_SELECTOR);

  if (!form) {
    console.error(`DOM-element ${FORM_SELECTOR} is missing.`);
    return;
  }

  populateFormFields(form, entry);

  form.addEventListener("submit", (e) => handleFormSubmit(e, entry.id));
}

/**
 * Submits the populated edit form, updating the corresponding work experience entry.
 * Redirects to the homepage on success, or displays field-specific errors if validation fails.
 *
 * @param e - The form submission event
 * @param entryId - The ID of the work experience entry being updated
 */
async function handleFormSubmit(e: Event, entryId: number): Promise<void> {
  e.preventDefault();
  console.log("Edit form");
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const payload = createWorkExperiencePayload(formData);

  try {
    const api = new WorkExperienceAPI(
      "https://dt207g-moment2.azurewebsites.net/api/work-experience"
    );
    await api.update(entryId, payload);
    const inputElems: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      "form input, form textarea"
    );
    clearFieldErrors(inputElems);
    // Defer the alert to ensure DOM updates from clearFieldErrors are applied before blocking the UI
    setTimeout(() => {
      window.alert("Work experience has been updated!");
      window.location.href = "/DT207G-moment2-frontend/";
    }, 0);
  } catch (error) {
    if (Array.isArray(error) && error.every((err) => isResponseError(err))) {
      const resError = error as Array<ResponseError>;
      handleFormErrors(resError);
    } else {
      console.error("Unexpected app error", error);
    }
  }
}

import { WorkExperienceAPI } from "@ts/utils/api";
import { ResponseError, WorkExperienceEntity } from "@ts/types";
import { isResponseError, handleFormErrors } from "@ts/utils/error";
import { createWorkExperiencePayload } from "@ts/utils/dom";
import { clearFieldErrors } from "@ts/utils/dom";
import { populateFormFields } from "./populateFormFields";
import { Button } from "@ts/utils/ui";

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
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const payload = createWorkExperiencePayload(formData);
  const submitBtnElem = document.querySelector(`button[type="submit"]`);

  if (!submitBtnElem) {
    return;
  }

  const btn = new Button(submitBtnElem as HTMLButtonElement);

  try {
    const api = new WorkExperienceAPI(
      "https://dt207g-moment2.azurewebsites.net/api/work-experience"
    );
    btn.disable();
    btn.showLoader();
    await api.update(entryId, payload);
    btn.hideLoader();
    const inputElems: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      "form input, form textarea"
    );
    clearFieldErrors(inputElems);
    // Defer the alert to ensure DOM updates from clearFieldErrors are applied before blocking the UI
    setTimeout(() => {
      window.alert("Work experience has been updated!");
      window.location.href = "/DT207G-moment2-frontend/";
    }, 1);
  } catch (error) {
    btn.enable();
    btn.hideLoader();
    console.log(error);
    if (Array.isArray(error) && error.every((err) => isResponseError(err))) {
      const resError = error as Array<ResponseError>;
      handleFormErrors(resError);
    } else {
      console.error("Unexpected app error", error);
    }
  }
}

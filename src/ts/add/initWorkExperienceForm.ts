import { WorkExperienceAPI } from "@ts/utils/api";
import { ResponseError } from "@ts/types";
import { isResponseError, handleFormErrors } from "@ts/utils/error";
import { createWorkExperiencePayload } from "@ts/utils/dom";
import { clearFieldErrors } from "@ts/utils/dom";
import { Button } from "@ts/utils/ui";

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
    await api.insert(payload);
    btn.enable();
    btn.hideLoader();
    const inputElems: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      "form input, form textarea"
    );
    clearFieldErrors(inputElems);
    // Defer the alert to ensure DOM updates from clearFieldErrors are applied before blocking the UI
    setTimeout(() => {
      window.alert("Work experience has been added!");
    }, 1);
  } catch (error) {
    btn.enable();
    btn.hideLoader();
    if (Array.isArray(error) && error.every((err) => isResponseError(err))) {
      const resError = error as Array<ResponseError>;
      handleFormErrors(resError);
    } else {
      console.error("Unexpected app error", error);
    }
  }
}

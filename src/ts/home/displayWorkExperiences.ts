import { WorkExperienceAPI } from "@ts/workExperienceApi";
import { ResponseError } from "@ts/types";
import { createWorkExperienceHtml } from "@ts/home/createWorkExperienceHtml";
import { isResponseError, handleGlobalError } from "@ts/utils/error";

/**
 * Fetches all work experience entries from the API and appends them to the
 * element with class "work-experience-container" in the DOM.
 *
 * @throws Error if the "work-experience-container" element is missing
 */
export async function displayWorkExperiences(): Promise<void> {
  const WORK_EXP_SELECTOR = ".work-experience-container";
  const elemToAppend = document.querySelector(WORK_EXP_SELECTOR);

  try {
    if (!elemToAppend) {
      throw new Error(`DOM-element ${WORK_EXP_SELECTOR} is missing.`);
    }

    const api = new WorkExperienceAPI(
      "http://localhost:4000/api/work-experience"
    );
    const workExpEntries = await api.getAll();
    const fragElem = createWorkExperienceHtml(workExpEntries);
    elemToAppend.appendChild(fragElem);
  } catch (error) {
    if (Array.isArray(error) && error.every((err) => isResponseError(err))) {
      const resError = error as Array<ResponseError>;
      for (const err of resError) {
        handleGlobalError(document.body, err);
      }
    } else {
      console.error("Unexpected app error", error);
    }
  }
}

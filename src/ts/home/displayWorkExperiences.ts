import { createWorkExperienceHtml } from "@ts/home/createWorkExperienceHtml";
import { WorkExperienceEntity } from "@ts/types";

/**
 * Appends work experience entries to the element with class "work-experience-container" in the DOM.
 */
export function displayWorkExperiences(
  workExpEntries: Array<WorkExperienceEntity>
): void {
  const WORK_EXP_SELECTOR = ".work-experience-container";
  const elemToAppend = document.querySelector(WORK_EXP_SELECTOR);

  if (!elemToAppend) {
    console.error(`DOM-element ${WORK_EXP_SELECTOR} is missing.`);
    return;
  }

  const fragElem = createWorkExperienceHtml(workExpEntries);
  elemToAppend.appendChild(fragElem);
}

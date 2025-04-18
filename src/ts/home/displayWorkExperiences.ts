import { createWorkExperienceHtml } from "@ts/home/createWorkExperienceHtml";
import { WorkExperienceEntity } from "@ts/types";

/**
 * Renders a list of work experience entries into the DOM.
 *
 * If entries are available, they are appended to the element with the class "work-experience-container".
 * If no entries are present, a fallback message is displayed instead.
 *
 * @returns True if entries were rendered, false if the container is missing or the list is empty.
 */
export function displayWorkExperiences(
  workExpEntries: Array<WorkExperienceEntity>
): boolean {
  const WORK_EXP_SELECTOR = ".work-experience-container";
  const elemToAppend = document.querySelector(WORK_EXP_SELECTOR);

  if (!elemToAppend) {
    console.error(`DOM-element ${WORK_EXP_SELECTOR} is missing.`);
    return false;
  }

  if (workExpEntries.length === 0) {
    const messageElem = document.createElement("p");
    messageElem.innerText =
      "There currently are no work experiences to display. Please add one from the add/ page.";
    elemToAppend.appendChild(messageElem);
    return false;
  }

  const fragElem = createWorkExperienceHtml(workExpEntries);
  elemToAppend.appendChild(fragElem);

  return true;
}

import { WorkExperienceEntity } from "@ts/types";

const PAGE_REDIRECT = "/DT207G-moment2-frontend/edit/";

/**
 * Initializes click handlers for all edit buttons, associating each button with its corresponding work experience entry.
 * When clicked, the handler stores the entry in localStorage and redirects to the edit page.
 *
 * @param entries - An array of work experience entries to match against DOM elements
 */
export function initWorkExperienceEditBtn(
  entries: Array<WorkExperienceEntity>
): void {
  const EDIT_BUTTON_SELECTOR = ".edit";
  const editBtnElems = document.querySelectorAll(EDIT_BUTTON_SELECTOR);

  if (editBtnElems.length === 0) {
    console.error(`DOM-element ${EDIT_BUTTON_SELECTOR} does not exist.`);
    return;
  }

  editBtnElems.forEach((btn) => {
    const articleElem = btn.closest("article");

    if (!articleElem) {
      console.error(
        `Article element to which this button belongs to does not exist.`
      );
      return;
    }

    for (const entry of entries) {
      if (String(entry.id) === articleElem.dataset.id) {
        btn.addEventListener("click", () => handleClickEvent(entry));
        break;
      }
    }
  });
}

function handleClickEvent(entry: WorkExperienceEntity) {
  localStorage.setItem("edit-entry", JSON.stringify(entry));
  window.location.href = PAGE_REDIRECT;
}

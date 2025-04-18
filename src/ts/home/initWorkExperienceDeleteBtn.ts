import { ResponseError, WorkExperienceEntity } from "@ts/types";
import { handleGlobalError, isResponseError } from "@ts/utils/error";
import { WorkExperienceAPI } from "@ts/workExperienceApi";

/**
 * Initializes a click handlers for all delete buttons, assosiating each button with its corresponding work experience entry.
 * When clicked, deletes the corresponding entry and alerts the user on success.
 *
 * @param entries - The work experience entries to match against DOM elements
 */
export function initWorkExperienceDeleteBtn(
  entries: Array<WorkExperienceEntity>
): void {
  const DELETE_BUTTON_SELECTOR = ".delete";
  const deleteBtnElems = document.querySelectorAll(DELETE_BUTTON_SELECTOR);

  if (deleteBtnElems.length === 0) {
    console.error(`DOM-element ${DELETE_BUTTON_SELECTOR} does not exist.`);
    return;
  }

  deleteBtnElems.forEach((btn) => {
    const articleElem = btn.closest("article");

    if (!articleElem) {
      console.error(
        `Article element to which this button belongs to does not exist.`
      );
      return;
    }

    for (const entry of entries) {
      if (String(entry.id) === articleElem.dataset.id) {
        btn.addEventListener("click", () => handleClickEvent(entry.id));
        break;
      }
    }
  });
}

async function handleClickEvent(entryId: number) {
  const api = new WorkExperienceAPI(
    "https://dt207g-moment2.azurewebsites.net/api/work-experience"
  );

  try {
    const isUserSure = window.confirm("Are you sure?");
    if (isUserSure) {
      await api.delete(entryId);
      window.alert("Work experience has been deleted!");
      window.location.reload();
    }
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

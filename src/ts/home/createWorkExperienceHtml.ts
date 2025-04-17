import { WorkExperienceEntity } from "@ts/types";

/**
 * A DOM factory for rendering work experience entries, including an edit and delete button.
 *
 * @param entries - An array of work experience entries to render
 * @returns A DocumentFragment containing the rendered elements
 */
export function createWorkExperienceHtml(
  entries: Array<WorkExperienceEntity>
): DocumentFragment {
  const fragment = document.createDocumentFragment();

  entries.forEach((entry) => {
    const articleElem = document.createElement("article");
    articleElem.dataset.id = String(entry.id);

    const jobTitleElem = document.createElement("h2");
    jobTitleElem.innerText = entry.jobTitle;

    const companyNameElem = document.createElement("p");
    companyNameElem.innerText = entry.companyName;

    const workCityLocationElem = document.createElement("p");
    workCityLocationElem.innerText = entry.workCityLocation;

    const workDateElem = document.createElement("p");
    workDateElem.innerText = String(entry.startDate + " ⎯ " + entry.endDate);

    const descriptionElem = document.createElement("p");
    descriptionElem.innerText = entry.description;

    const btnElemContainer = document.createElement("div");
    btnElemContainer.classList.add("button-container");

    const editBtnElem = document.createElement("button");
    editBtnElem.innerText = "Edit";

    const deleteBtnElem = document.createElement("button");
    deleteBtnElem.innerText = "Delete";

    btnElemContainer.appendChild(editBtnElem);
    btnElemContainer.appendChild(deleteBtnElem);

    articleElem.appendChild(jobTitleElem);
    articleElem.appendChild(companyNameElem);
    articleElem.appendChild(workCityLocationElem);
    articleElem.appendChild(workDateElem);
    articleElem.appendChild(descriptionElem);
    articleElem.appendChild(btnElemContainer);

    fragment.appendChild(articleElem);
  });

  return fragment;
}

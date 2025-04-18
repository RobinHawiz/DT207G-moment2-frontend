import "@styles/style.scss";
import { getEditEntryFromStorage } from "@ts/edit/getEditEntryFromStorage";
import { displayError } from "@ts/utils/dom";
import { initWorkExperienceForm } from "@ts/edit/initWorkExperienceForm";

function main(): void {
  const entry = getEditEntryFromStorage();
  if (!entry) {
    displayError(
      document.body,
      "We couldn't load the work experience you wanted to edit. Please try again from the homepage."
    );
    return;
  }
  initWorkExperienceForm(entry);
}

main();

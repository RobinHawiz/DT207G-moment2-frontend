import "@styles/style.scss";
import { displayWorkExperiences } from "@ts/home/displayWorkExperiences";
import { getWorkExperienceEntries } from "./getWorkExperienceEntries";
import { initWorkExperienceEditBtn } from "./intiWorkExperienceEditBtn";
import { initWorkExperienceDeleteBtn } from "./initWorkExperienceDeleteBtn";

async function main(): Promise<void> {
  const entries = await getWorkExperienceEntries();
  if (!entries) {
    return;
  }
  if (displayWorkExperiences(entries)) {
    initWorkExperienceEditBtn(entries);
    initWorkExperienceDeleteBtn(entries);
  }
}

main();

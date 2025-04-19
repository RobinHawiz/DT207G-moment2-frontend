import "@styles/style.scss";
import { displayWorkExperiences } from "@ts/home/displayWorkExperiences";
import { getWorkExperienceEntries } from "@ts/home/getWorkExperienceEntries";
import { initWorkExperienceEditBtn } from "@ts/home/intiWorkExperienceEditBtn";
import { initWorkExperienceDeleteBtn } from "@ts/home/initWorkExperienceDeleteBtn";

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

import "@styles/style.scss";
import { displayWorkExperiences } from "@ts/home/displayWorkExperiences";
import { getWorkExperienceEntries } from "./getWorkExperienceEntries";
import { initWorkExperienceEditBtn } from "./intiWorkExperienceEditBtn";

async function main(): Promise<void> {
  const entries = await getWorkExperienceEntries();
  if (!entries) {
    return;
  }
  displayWorkExperiences(entries);
  initWorkExperienceEditBtn(entries);
}

main();

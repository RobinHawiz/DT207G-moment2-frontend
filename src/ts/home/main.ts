import "@styles/style.scss";
import { displayWorkExperiences } from "@ts/home/displayWorkExperiences";
import { getWorkExperienceEntries } from "./getWorkExperienceEntries";

async function main(): Promise<void> {
  const entries = await getWorkExperienceEntries();
  if (!entries) {
    return;
  }
  displayWorkExperiences(entries);
}

main();

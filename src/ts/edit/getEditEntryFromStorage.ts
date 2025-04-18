import { WorkExperienceEntity } from "@ts/types";

/**
 * Retrieves the work experience entry selected for editing from localStorage.
 *
 * @returns The parsed WorkExperienceEntity object if available and valid, otherwise null.
 */
export function getEditEntryFromStorage(): WorkExperienceEntity | null {
  const LOCAL_STORAGE_ENTRY_KEY = "edit-entry";
  const entry = localStorage.getItem(LOCAL_STORAGE_ENTRY_KEY);
  if (!entry) {
    console.error(`[Storage] Missing key: ${LOCAL_STORAGE_ENTRY_KEY}`);
    return null;
  }

  try {
    return JSON.parse(entry);
  } catch (error) {
    console.error("[Storage] Failed to parse edit-entry", error);
    return null;
  }
}

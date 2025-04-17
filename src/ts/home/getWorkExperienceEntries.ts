import { WorkExperienceAPI } from "@ts/workExperienceApi";
import { ResponseError, WorkExperienceEntity } from "@ts/types";
import { isResponseError, handleGlobalError } from "@ts/utils/error";

/**
 * Fetches all work experience entries from the API.
 */
export async function getWorkExperienceEntries(): Promise<Array<WorkExperienceEntity> | null> {
  try {
    const api = new WorkExperienceAPI(
      "http://localhost:4000/api/work-experience"
    );
    return await api.getAll();
  } catch (error) {
    if (Array.isArray(error) && error.every((err) => isResponseError(err))) {
      const resError = error as Array<ResponseError>;
      for (const err of resError) {
        handleGlobalError(document.body, err);
      }
    } else {
      console.error("Unexpected app error", error);
    }
    return null;
  }
}

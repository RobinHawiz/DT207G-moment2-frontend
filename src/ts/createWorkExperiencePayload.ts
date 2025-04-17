import { WorkExperiencePayload } from "@ts/types";

/**
 * Creates a WorkExperiencePayload object from submitted form data.
 *
 * @param formData - A FormData object containing user input values
 * @returns A typed payload object ready for API submission
 */
export function createWorkExperiencePayload(
  formData: FormData
): WorkExperiencePayload {
  return {
    companyName: String(formData.get("companyName")),
    jobTitle: String(formData.get("jobTitle")),
    workCityLocation: String(formData.get("workCityLocation")),
    startDate: String(formData.get("startDate")),
    endDate: String(formData.get("endDate")),
    description: String(formData.get("description")),
  };
}

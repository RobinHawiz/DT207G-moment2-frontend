import { WorkExperienceEntity, WorkExperiencePayload } from "@ts/types";
import { fetchData } from "@ts/utils/api";

/**
 * Provides methods to interact with the Work Experience API.
 * The base URL is injected to support multiple environments or endpoints.
 */
export class WorkExperienceAPI {
  constructor(public readonly apiUrl: string) {}

  /**
   * Retrieves all work experience entities via GET /api/work-experience
   * @returns A parsed array containing WorkExperienceEntity objects
   */
  async getAll(): Promise<Array<WorkExperienceEntity>> {
    const data = await fetchData<Array<WorkExperienceEntity>>(`${this.apiUrl}`);
    return data;
  }

  /**
   * Sends a new work experience entry to the API via POST /api/work-experience
   * @param payload - The work experience data to insert
   */
  async insert(payload: WorkExperiencePayload): Promise<void> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    await fetchData<void>(`${this.apiUrl}`, options);
  }

  /**
   * Updates a specific work experience entry via PUT /api/work-experience/:id
   * @param id - The ID of the entry to update
   * @param payload - The updated work experience data
   */
  async update(id: number, payload: WorkExperiencePayload): Promise<void> {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    await fetchData<void>(`${this.apiUrl}/${id}`, options);
  }

  /**
   * Deletes a specific work experience entry via DELETE /api/work-experience/:id.
   * @param id - The ID of the entry to delete
   */
  async delete(id: number): Promise<void> {
    const options: RequestInit = {
      method: "DELETE",
    };

    await fetchData<void>(`${this.apiUrl}/${id}`, options);
  }
}

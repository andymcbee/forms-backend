import pool from "../config/db";
import { BaseFormSubmission } from "../models/FormSubmission";

export async function createOneFormSubmission(
  submission: BaseFormSubmission
): Promise<void> {
  try {
    const { domain_id: domainId, submission_data: submissionData } = submission;

    const query = `
      INSERT INTO form_submissions (domain_id, submission_data)
      VALUES ($1, $2)
    `;

    await pool.query(query, [domainId, submissionData]);
  } catch (error) {
    throw error;
  }
}

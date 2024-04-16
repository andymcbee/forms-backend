import pool from "../config/db";
import { BaseFormSubmission } from "../models/FormSubmission";

export async function createOneFormSubmission(
  submission: BaseFormSubmission
): Promise<void> {
  try {
    console.log("Submission data:::");
    console.log(submission);
    const {
      domain_id: domainId,
      submission_data: submissionData,
      form_name: formName
    } = submission;

    const query = `
      INSERT INTO submissions (domain_id, submission_data, form_name)
      VALUES ($1, $2, $3)
    `;

    await pool.query(query, [domainId, submissionData, formName]);
  } catch (error) {
    throw error;
  }
}

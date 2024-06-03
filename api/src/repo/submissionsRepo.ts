import pool from "../config/db";
import { ISubmission } from "api/forms/Submission";

export const selectUnprocessedSubmissions = async (
  formName: string
): Promise<ISubmission[]> => {
  try {
    const query = `SELECT * FROM submissions WHERE form_name = $1 AND processed = false`;

    const data = [formName];

    const result = await pool.query(query, data);
    return result.rows as ISubmission[];
  } catch (error) {
    console.log("Error fetching  submissions:", error);
    throw new Error("Error fetching  submissions.");
  }
};

export const updateSubmissionProcessedStatus = async (
  formName: string,
  id: number,
  processedStatus: boolean
): Promise<ISubmission> => {
  try {
    const query = `
        UPDATE submissions
        SET processed = $1
        WHERE form_name = $2 AND id = $3
        RETURNING *;  
      `;

    const data = [processedStatus, formName, id];

    const result = await pool.query(query, data);
    return result.rows[0] as ISubmission;
  } catch (error) {
    console.log("Error updating submission:", error);
    throw new Error("Error updating submission.");
  }
};

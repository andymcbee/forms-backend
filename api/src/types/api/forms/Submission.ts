/* eslint-disable @typescript-eslint/no-explicit-any */
// Base interface for a submission, without the ID
export interface IBaseSubmission {
  domain_id: number;
  submission_data: any; // Replace 'any' with a more specific type if possible
  form_name: string;
  submission_time?: Date; // Optional since it has a default value
  created_at?: Date; // Optional since it has a default value
}

// Interface for a submission retrieved from the database, includes the ID
export interface ISubmission extends IBaseSubmission {
  id: number;
}

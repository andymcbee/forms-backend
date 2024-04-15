interface BaseFormSubmission {
  domain_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submission_data: any;
}

interface FormSubmission extends BaseFormSubmission {
  id: string;
  submitted_at: Date;
  created_at: Date;
}

export { BaseFormSubmission, FormSubmission };

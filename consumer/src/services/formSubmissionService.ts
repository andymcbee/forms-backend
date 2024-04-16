import type { FormSubmissionData } from "../consumers/formSubmissionsConsumer";
import { BaseFormSubmission } from "../models/FormSubmission";
import { createOneFormSubmission } from "../repo/createOneFormSubmission";
import { selectOneDomainByDomainName } from "../repo/selectOneDomainByDomainName";

export default async function formSubmissionService(
  formSubmissionData: FormSubmissionData
) {
  try {
    console.log(formSubmissionData);

    const domain = await selectOneDomainByDomainName(formSubmissionData.host);
    console.log("Domain::");
    console.log(domain);

    const formSubmission: BaseFormSubmission = {
      domain_id: domain.id,
      submission_data: formSubmissionData.data,
      form_name: formSubmissionData.formName
    };

    const newSubmission = await createOneFormSubmission(formSubmission);

    console.log("New sub::");
    console.log(newSubmission);
  } catch (error) {
    throw error;
  }
}

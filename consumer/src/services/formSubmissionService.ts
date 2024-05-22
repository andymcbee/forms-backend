import type { FormSubmissionData } from "../consumers/formSubmissionsConsumer";
import { BaseFormSubmission } from "../models/FormSubmission";
import { createOneFormSubmission } from "../repo/createOneFormSubmission";
import { selectAllNotifEmailsByDomainId } from "../repo/selectAllNotifEmailsByDomainId";
import { selectOneDomainByDomainName } from "../repo/selectOneDomainByDomainName";
import { sendEmail } from "./sendEmail";

export default async function formSubmissionService(
  formSubmissionData: FormSubmissionData
) {
  try {
    console.log(formSubmissionData);

    const domain = await selectOneDomainByDomainName(formSubmissionData.host);

    const formSubmission: BaseFormSubmission = {
      domain_id: domain.id,
      submission_data: formSubmissionData.data,
      form_name: formSubmissionData.formName
    };

    const newSubmission = await createOneFormSubmission(formSubmission);

    const notifEmails = await selectAllNotifEmailsByDomainId(domain.id);

    for (let i = 0; i < notifEmails.length; i++) {
      const email = notifEmails[i].email;

      await sendEmail(email, formSubmissionData);
    }
  } catch (error) {
    throw error;
  }
}

import * as postmark from "postmark";
const serverToken = process.env.POSTMARK_API_KEY;

import type { FormSubmissionData } from "../consumers/formSubmissionsConsumer";

function objectToHtml<T extends Record<string, unknown>>(obj: T): string {
  let html = "<ul>";
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      html += `<li><strong>${key}:</strong> ${obj[key]}</li>`;
    }
  }
  html += "</ul>";
  return html;
}

export const sendEmail = async (
  email: string,
  formData: FormSubmissionData
): Promise<null> => {
  try {
    if (!serverToken) {
      throw new Error("Postmark API key is required.");
    }

    console.log("Send email triggered");
    const client = new postmark.ServerClient(serverToken);

    const htmlBody = `Domain: ${formData.host} <br><br> ${objectToHtml(formData.data)}`;

    client
      .sendEmail({
        From: "forms@mailgo3228.com",
        To: email,
        Subject: "New submission from: " + formData.formName,
        HtmlBody: htmlBody
      })
      .then((response) => {
        console.log("Sending message");
        console.log(response.To);
        console.log(response.Message);
      });

    return null;
  } catch (error) {
    throw new Error("Error checking  domain." + error);
  }
};

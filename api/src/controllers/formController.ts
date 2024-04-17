import { Request, Response } from "express";
import { ZodError } from "zod";
import type { SuccessResponse } from "api/SuccessResponse";
import type { SubmitFormRequestBody } from "api/forms/SubmitFormRequestBody";
import { submitFormRequestBodySchema } from "../models/api/forms/submitFormRequestBodySchema";
import { fromZodError } from "zod-validation-error";
import { checkDomain } from "../services/domainsServices";
import kafkaProducer from "../repo/brokerRepo";

export const submitForm = async (req: Request, res: Response) => {
  // Handle form submission logic here
  const requestBody: SubmitFormRequestBody = req.body;

  try {
    // Validate request body against schema
    const validatedData = submitFormRequestBodySchema.parse(requestBody);

    // Validate the host exists on the request
    let host = req.hostname;
    // Check if x-forwarded-host is present and handle it
    // note that it may be string OR array

    const xForwardedHost = req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      if (Array.isArray(xForwardedHost)) {
        // If it's an array, take the first host (closest proxy to the server)
        host = xForwardedHost[0];
      } else {
        // If it's a single value, use it directly
        host = xForwardedHost;
      }
    }

    //confirm requesint host domain exists in db

    const isDomainOnSafelist = await checkDomain(host);

    // If not on safelist, return error

    if (!isDomainOnSafelist) {
      res.status(403).json({ error: "Domain not authorized: " + host });
      return;
    }

    // Access validated data
    //const { "form-name": formType, data } = validatedData;

    await kafkaProducer("form-submission", host, validatedData);

    const successResponse: SuccessResponse = {
      message: "Form submitted successfully."
    };

    res.status(200).json(successResponse);
  } catch (error) {
    if (error instanceof ZodError) {
      // convert zod error to human readable
      const validationError = fromZodError(error);

      res.status(400).json({ error: validationError.toString() });
    } else {
      // Other types of errors
      res.status(500).json({ error: "An error has occurred." });
    }
  }
};

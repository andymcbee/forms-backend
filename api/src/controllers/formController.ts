import { Request, Response } from "express";
import { ZodError } from "zod";
import type { SuccessResponse } from "api/SuccessResponse";
import type { SubmitFormRequestBody } from "api/forms/SubmitFormRequestBody";
import { submitFormRequestBodySchema } from "../models/api/forms/submitFormRequestBodySchema";
import { fromZodError } from "zod-validation-error";

export const submitForm = (req: Request, res: Response) => {
  // Handle form submission logic here
  const requestBody: SubmitFormRequestBody = req.body;

  try {
    // Validate request body against schema
    const validatedData = submitFormRequestBodySchema.parse(requestBody);

    // Access validated data
    const { "form-name": formType, data } = validatedData;

    const successResponse: SuccessResponse = {
      message: "Form submitted successfully.",
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

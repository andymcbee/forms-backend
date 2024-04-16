import { z } from "zod";

export const submitFormRequestBodySchema = z.object({
  formName: z.string().min(1).max(50),
  data: z.record(z.unknown())
});

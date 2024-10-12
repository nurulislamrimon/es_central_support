import { z } from "zod";

export const mailingValidate = z.object({
  body: z.object({
    receiver_mail: z
      .string({ invalid_type_error: "Invalid receiver_mail type!" })
      .email({ message: "Invalid receiver_mail address!" }),
  }),
});

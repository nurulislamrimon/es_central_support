import { z } from "zod";

export const mailTemplateValidate = z.object({
  body: z.object({
    template_name: z
      .string({
        invalid_type_error: "Invalid template_name type!",
      })
      .optional(),
    is_active: z
      .boolean({
        invalid_type_error: "Invalid is_active type!",
      })
      .optional(),
  }),
});

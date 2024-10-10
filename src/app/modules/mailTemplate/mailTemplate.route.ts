import { Router } from "express";
import { mailTemplateController } from "./mailTemplate.controller";
import { authorization } from "../../../middlewares/auth";
import { administratorRoles } from "../administrators/administrators.constants";
import { validateRequest } from "../../../middlewares/zodValidator";
import { mailTemplateValidate } from "./mailTemplate.validator";

const router = Router();

router.get(
  "/",
  authorization(
    administratorRoles.SUPER_ADMIN,
    administratorRoles.ADMIN,
    administratorRoles.MANAGER
  ),
  mailTemplateController.getAllMailTemplate
);

router.post(
  "/add",
  validateRequest(mailTemplateValidate),
  mailTemplateController.addMailTemplate
);

router.delete(
  "/:id",
  authorization(
    administratorRoles.SUPER_ADMIN,
    administratorRoles.ADMIN,
    administratorRoles.MANAGER
  ),
  mailTemplateController.deleteMailTemplate
);

export const mailTemplateRoute = router;

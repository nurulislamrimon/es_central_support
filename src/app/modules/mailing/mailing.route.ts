import { Router } from "express";
import { mailingController } from "./mailing.controller";
import { authorization } from "../../../middlewares/auth";
import { administratorRoles } from "../administrators/administrators.constants";
import { validateRequest } from "../../../middlewares/zodValidator";
import { mailingValidate } from "./mailing.validator";

const router = Router();

router.get(
  "/",
  authorization(
    administratorRoles.SUPER_ADMIN,
    administratorRoles.ADMIN,
    administratorRoles.MANAGER
  ),
  mailingController.getAllMailing
);

router.post(
  "/add",
  validateRequest(mailingValidate),
  mailingController.addMailing
);
router.delete(
  "/:id",
  authorization(
    administratorRoles.SUPER_ADMIN,
    administratorRoles.ADMIN,
    administratorRoles.MANAGER
  ),
  mailingController.deleteMailing
);

export const mailingRoute = router;

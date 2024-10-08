import { Router } from "express";
import { administratorController } from "./administrators.controller";
import { authentication, authorization } from "../../../middlewares/auth";

const router = Router();

router.get(
  "/",
  authorization("admin"),
  administratorController.getAllAdministrators
);
router.post("/add", administratorController.addAdministrator);
router.post("/login", administratorController.login);

export const administratorRoute = router;

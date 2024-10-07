import { Router } from "express";
import { administratorController } from "./administrators.controller";

const router = Router();

router.get("/", administratorController.getAllAdministrators);
router.post("/add", administratorController.addAdministrator);
router.post("/login", administratorController.login);

export const administratorRoute = router;

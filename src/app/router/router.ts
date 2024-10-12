import { Router } from "express";
import { administratorRoute } from "../modules/administrators/administrators.route";
import { helpRequestRoute } from "../modules/helpRequest/helpRequest.route";
import { mailTemplateRoute } from "../modules/mailTemplate/mailTemplate.route";
import { mailingRoute } from "../modules/mailing/mailing.route";

const router = Router();

const routes = [
  {
    path: "/administrators",
    element: administratorRoute,
  },
  {
    path: "/help-request",
    element: helpRequestRoute,
  },
  {
    path: "/mail-template",
    element: mailTemplateRoute,
  },
  {
    path: "/mailing",
    element: mailingRoute,
  },
];

routes.forEach((route) => router.use(route.path, route.element));

export default router;

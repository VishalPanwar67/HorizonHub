import { Router } from "express";
import {
  getProjects,
  getClients,
  addContact,
  addSubscription,
} from "../controllers/publicController.js";

const publicRoutes = Router();

publicRoutes.route("/projects").get(getProjects);
publicRoutes.route("/clients").get(getClients);
publicRoutes.route("/contact").post(addContact);
publicRoutes.route("/subscribe").post(addSubscription);

export default publicRoutes;

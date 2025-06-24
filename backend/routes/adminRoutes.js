import { Router } from "express";
import {
  addProject,
  addClient,
  getContactForms,
  getSubscriptions,
} from "../controllers/adminController.js";
import { upload } from "../middleware/multer.js";

const adminRoutes = Router();

adminRoutes.route("/projects").post(upload.single("image"), addProject);
adminRoutes.route("/clients").post(upload.single("image"), addClient);
adminRoutes.route("/contacts").get(getContactForms);
adminRoutes.route("/subscriptions").get(getSubscriptions);

export default adminRoutes;

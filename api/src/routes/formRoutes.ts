import express from "express";
import {
  submitForm,
  getUnprocessedForms,
  updateFormStatus
} from "../controllers/formController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

//PUBLIC
router.post("/submit-form", submitForm);

//PROTECTED
router.get("/:formName", authMiddleware, getUnprocessedForms);
router.post(
  "/:formName/update-status/:formId",
  authMiddleware,
  updateFormStatus
);

export default router;

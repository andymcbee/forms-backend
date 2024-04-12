import express from "express";
import { submitForm } from "../controllers/formController";

const router = express.Router();

router.post("/submit-form", submitForm);

export default router;

import { Router } from "express";
import { sendEmail } from "../controller/email.ctrl.js";

const router = Router();

router.route("/send").post(sendEmail);

export default router;

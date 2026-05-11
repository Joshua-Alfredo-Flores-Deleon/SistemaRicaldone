import express from "express";
import estudiantesRegisterController from "../controllers/estudiantesRegisterController.js";

const router = express.Router();

router.route("/").post(estudiantesRegisterController.register);

router.route("/verifyCodeEmail").post(estudiantesRegisterController.verifyCode);

export default router;

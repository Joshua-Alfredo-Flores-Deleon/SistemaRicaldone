import express from "express";
import loginMaestro from "../controllers/loginMaestroController.js";

const router = express.Router();

router.route("/").post(loginMaestro.login);
export default router;
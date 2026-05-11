import express from "express";
import maestroRegisterController from "../controllers/profesoresRegisterController.js";

const router = express.Router();

router.route("/")
  .post(maestroRegisterController. register)

  router.route("/verifyCodeEmail")
  .post(maestroRegisterController.verifyCode)


export default router;




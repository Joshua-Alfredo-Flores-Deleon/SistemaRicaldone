import express from "express";
import maestroController from "../controllers/profesoresController.js";

const router = express.Router();

router.route("/")
  .get(maestroController. getAll)

router.route("/:id")
    .put(maestroController.update)
    .delete(maestroController.deleteMaestro)

export default router;




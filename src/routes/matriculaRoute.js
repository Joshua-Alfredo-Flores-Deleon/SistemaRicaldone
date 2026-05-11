import express from "express";
import matriculaController from "../controllers/MatriculaController.js";

const router = express.Router();

router
  .route("/")
  .get(matriculaController.getmatricula)
  .post(matriculaController.insertMatricula);

router
  .route("/:id")
  .put(matriculaController.updateMatricula)
  .delete(matriculaController.deleteMatricula);

export default router;
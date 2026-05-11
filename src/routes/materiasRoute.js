import express from "express";
import materiasController from "../controllers/MateriasController.js";

const router = express.Router();

router
  .route("/")
  .get(materiasController.getmaterias)
  .post(materiasController.insertmaterias);

router
  .route("/:id")
  .put(materiasController.updateMaterias)
  .delete(materiasController.deleteMaterias);

export default router;
import express from "express";
import estudiantesController from "../controllers/estudiantesController.js";

const router = express.Router();

router.route("/")
  .get(estudiantesController. getAll)

router.route("/:id")
    .put(estudiantesController.update)
    .delete(estudiantesController.deleteEstudiante)

export default router;




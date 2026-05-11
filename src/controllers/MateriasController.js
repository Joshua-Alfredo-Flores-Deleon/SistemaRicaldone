const materiasController = {};
import materiasModel from "../models/materiasModel.js";

materiasController.getmaterias = async (req, res) => {
  const materias = await materiasModel.find();
  res.json(materias);
};

materiasController.insertmaterias = async (req, res) => {
  const { subjectName, teacher_id, isAvailable } = req.body;
  const newMateria = new materiasModel({ subjectName, teacher_id, isAvailable });
  await newMateria.save();
  res.json({ message: "Materia saved" });
};

materiasController.deleteMaterias = async (req, res) => {
  await materiasModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Materia deleted" });
};

materiasController.updateMaterias = async (req, res) => {
  const { subjectName, teacher_id, isAvailable } = req.body;

  await materiasModel.findByIdAndUpdate(
    req.params.id,
    {
     subjectName, teacher_id, isAvailable
    },
    { new: true },
  );

  res.json({ message: "Materia updated" });
};

export default materiasController;

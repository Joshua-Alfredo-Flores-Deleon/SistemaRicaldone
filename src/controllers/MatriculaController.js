const matriculaController = {};
import matriculaModel from "../models/matriculaModel.js";

matriculaController.getmatricula = async (req, res) => {
  const matricula = await matriculaModel.find();
  res.json(matricula);
};

matriculaController.insertMatricula = async (req, res) => {
  const { student_id, amount, paymentDate, method, status, referenceNumber } = req.body;
  const newMatricula = new matriculaModel({ student_id, amount, paymentDate, method, status, referenceNumber });
  await newMatricula.save();
  res.json({ message: "Matrícula saved" });
};

matriculaController.deleteMatricula = async (req, res) => {
  await matriculaModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Matrícula deleted" });
};

matriculaController.updateMatricula = async (req, res) => {
  const { student_id, amount, paymentDate, method, status, referenceNumber } = req.body;

  await matriculaModel.findByIdAndUpdate(
    req.params.id,
    {
     student_id, amount, paymentDate, method, status, referenceNumber
    },
    { new: true },
  );

  res.json({ message: "Matrícula updated" });
};

export default matriculaController;

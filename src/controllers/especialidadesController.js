const EspecialidadesController = {};
import especialidadesModel from "../models/especialidadesModel.js";

EspecialidadesController.getEspecialidades = async (req, res) => {
  const especialidades = await especialidadesModel.find();
  res.json(especialidades);
};

EspecialidadesController.insertEspecialidades = async (req, res) => {
  const { specialityName, isAvailable } = req.body;
  const newEspecialidad = new especialidadesModel({ specialityName, isAvailable });
  await newEspecialidad.save();
  res.json({ message: "Especialidad saved" });
};

EspecialidadesController.deleteEspecialidades = async (req, res) => {
  await especialidadesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Especialidad deleted" });
};

EspecialidadesController.updateEspecialidades = async (req, res) => {
  const { specialityName, isAvailable } = req.body;

  await especialidadesModel.findByIdAndUpdate(
    req.params.id,
    {
      specialityName, isAvailable
    },
    { new: true },
  );

  res.json({ message: "Especialidad updated" });
};

export default EspecialidadesController;

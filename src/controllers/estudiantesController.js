import estudiantesModel from "../models/estudiantesModel.js";

const estudiantesController = {};

estudiantesController.getAll = async (req, res) => {
  try {
    const estudiantes = await estudiantesModel.find();
    res.status(200).json(estudiantes);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

estudiantesController.update = async (req, res) => {
  try {
    let {
      name,
      lastName,
      email,
      password,
      birthdate,
      speciality_id,
      carnet,
      phone,
      isVerified,
      loginAttemps,
      timeOut,
    } = req.body;
    name = name?.trim();
    email = email?.trim();
    speciality_id = speciality_id?.trim();
    carnet = carnet?.trim();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Datos requeridos" });
    }

    if (birthdate > new Date() || birthdate < new Date("1901-01-01")) {
      return res.status(400).json({ message: "Fecha invalida" });
    }

    const estudianteUpdated = await estudiantesModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        lastName,
        email,
        password,
        birthdate,
        speciality_id,
        carnet,
        phone,
        isVerified,
        loginAttemps,
        timeOut,
      },
      { new: true },
    );

    if (!estudianteUpdated) {
      res.status(404).json({ message: "Estudiante not found " });
    }
    return res.status(200).json({ message: "Estudiante actualizado" });
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

estudiantesController.deleteEstudiante = async (req, res) => {
  try {
    const deleteEstudiante = estudiantesModel.findByIdAndDelete(req.params.id);

    if (!deleteEstudiante) {
      return res.status(404).json({ message: "Estudiante not found" });
    }

    return res.status(200).json({ message: "Estudiante eliminado" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default estudiantesController;

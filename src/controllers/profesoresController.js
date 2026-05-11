import maestroModel from "../models/profesoresModel.js";

const maestroController = {};

maestroController.getAll = async (req, res) => {
  try {
    const maestro = await maestroModel.find();
    res.status(200).json(maestro);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

maestroController.update = async (req, res) => {
  try {
    let {
      name,
      lastName,
      email,
      password,
      phone,
      hireDate,
      isActive,
      isVerified,
      loginAttemps,
      timeOut,
    } = req.body;
    name = name?.trim();
    email = email?.trim();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Datos requeridos" });
    }

    if (hireDate > new Date() || hireDate < new Date("1901-01-01")) {
      return res.status(400).json({ message: "Fecha invalida" });
    }

    const maestroUpdate = await maestroModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        lastName,
        email,
        password,
        phone,
        hireDate,
        isActive,
        isVerified,
        loginAttemps,
        timeOut,
      },
      { new: true },
    );

    if (!maestroUpdate) {
      res.status(404).json({ message: "Maestro not found " });
    }
    return res.status(200).json({ message: "Maestro actualizado" });
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

maestroController.deleteMaestro = async (req, res) => {
  try {
    const deleteMaestro = maestroModel.findByIdAndDelete(req.params.id);

    if (!deleteMaestro) {
      return res.status(404).json({ message: "Maestro not found" });
    }

    return res.status(200).json({ message: "Maestro eliminado" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default maestroController;

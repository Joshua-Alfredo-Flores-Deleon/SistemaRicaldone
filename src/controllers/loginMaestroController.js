/*import maestroModel from "../models/profesoresModel.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import config from "../../config.js";

const loginMaestroController = {};

loginMaestroController.login = async (req, res) => {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Correo invalido" });
  }

  try {
    const maestroFound = await maestroModel.findOne({ email });

    if (!maestroFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (maestroFound.timeOut && maestroFound.timeOut > new Date()) {
      return res.status(403).json({ message: "Contraseña incorrecta." });
    }

    const isMacht = await bcryptjs.compare(password, maestroFound.password);

    if (!isMacht) {
      maestroFound.loginAttemps = (maestroFound.loginAttemps || 0) + 1;
    }

    if (maestroFound.loginAttemps >= 5) {
      maestroFound.timeOut = Date.now() + 5 * 60 * 1000;
      maestroFound.loginAttemps = 0;

      await maestroFound.save();
      return res
        .status(403)
        .json({ message: "Usuario bloqueado. Intente nuevamente más tarde." });
    }

    await maestroFound.save();

    maestroFound.loginAttemps = 0;
    maestroFound.timeOut = null;

    const token = jsonwebtoken.sign(
      { id: maestroFound._id, userType: "Maestro" },
      config.JWT_SECRET,
      { expiresIn: "30D" },
    );

    res.cookie("authCookie", token);

    return res.status(200).json({ message: "Login Exitoso" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default loginMaestroController;*/

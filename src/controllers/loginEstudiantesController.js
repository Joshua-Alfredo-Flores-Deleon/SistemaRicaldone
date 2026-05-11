import estudiantesModel from "../models/estudiantesModel.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import config from "../../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Correo invalido" });
  }

  try {
    const estudianteFound = await estudiantesModel.findOne({ email });

    if (!customerFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (estudianteFound.timeOut && estudianteFound.timeOut > new Date()) {
      return res.status(403).json({ message: "Contraseña incorrecta." });
    }

    const isMacht = await bcryptjs.compare(password, estudianteFound.password);

    if (!isMacht) {
      estudianteFound.loginAttemps = (estudianteFound.loginAttemps || 0) + 1;
    }

    if (estudianteFound.loginAttemps >= 5) {
      estudianteFound.timeOut = Date.now() + 5 * 60 * 1000;
      estudianteFound.loginAttemps = 0;

      await estudianteFound.save();
      return res
        .status(403)
        .json({ message: "Usuario bloqueado. Intente nuevamente más tarde." });
    }

    await estudianteFound.save();

    estudianteFound.loginAttemps = 0;
    estudianteFound.timeOut = null;

    const token = jsonwebtoken.sign(
      { id: estudianteFound._id, userType: "estudiante" },
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
export default loginController;

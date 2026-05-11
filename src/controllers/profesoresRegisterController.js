import nodemailer from "nodemailer";
import maestroModel from "../models/profesoresModel.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import config from "../../config.js";

const registerMaestroController = {};

registerMaestroController.register = async (req, res) => {
  const {
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

  try {
    const existMaestro = await maestroModel.findOne({ email });
    if (existMaestro) {
      return res.status(400).json({ message: "El maestro ya existe" });
    }

    const passwordHases = await bcryptjs.hash(password, 10);
    const ramdomNumber = crypto.randomBytes(3).toString("hex");

    const token = jsonwebtoken.sign(
      {
        ramdomNumber,
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
        passwordHases,
      },

      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRE },
    );

    res.cookie("RegistrarCookie", token, { maxAge: 15 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: config.EMAIL_USER,
      to: email,
      subject: "Verificación de cuenta",
      text:
        "tu codigo de verificación es: " +
        ramdomNumber +
        "expira en 15 minutos",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Error al enviar el correo" });
      }

      return res.status(200).json({ message: "Correo enviado correctamente" });
    });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

registerMaestroController.verifyCode = async (req, res) => {
  try {
    const { verifyCodeRequest } = req.body;

    const token = req.cookies.RegistrarCookie;

    const decoded = jsonwebtoken.verify(token, config.JWT_SECRET);

    const {
      ramdomNumber: storedCode,
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
    } = decoded;

    if (verifyCodeRequest !== storedCode) {
      return res
        .status(400)
        .json({ message: "Código de verificación incorrecto" });
    }

    const newMaestro = new maestroModel({
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
    });

    await newMaestro.save();

    res.clearCookie("RegistrarCookie");

    return res.status(200).json({ message: "Cuenta verificada correctamente" });
  } catch (error) {}
};

export default registerMaestroController;

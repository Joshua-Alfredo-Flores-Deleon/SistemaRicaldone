import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import especialidadesRoute from "./src/routes/especialidadesRoute.js"
import estudianteRegisterRoute from "./src/routes/estudianteRegisterRoute.js"
import estudianteRoute from "./src/routes/estudianteRoute.js"
import loginEstudiantesRoute from "./src/routes/loginEstudianteRoute.js"
import LoginMaestroRoute from "./src/routes/loginMestroRoute.js"
import logoutRoute from "./src/routes/logoutRoute.js"
import materiasRoute from "./src/routes/materiasRoute.js"
import matriculaRoute from "./src/routes/matriculaRoute.js"
import profesorRegisterRoute from "./src/routes/profesoresRegisterRoute.js"
import profesorRoute from "./src/routes/profesoresRoute.js"


const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true, 
}));

app.use(cookieParser());

app.use(express.json());

app.use("/api/estudiantes", estudianteRoute);
app.use("/api/estudiantes/register", estudianteRegisterRoute);
app.use("/api/estudiantes/login", loginEstudiantesRoute);
app.use("/api/maestros/login", LoginMaestroRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/especialidades", especialidadesRoute);
app.use("/api/materias", materiasRoute);
app.use("/api/matricula", matriculaRoute);
app.use("/api/profesores/register", profesorRegisterRoute);
app.use("/api/profesores", profesorRoute);

export default app;
/*
    campos:

    specialityName
    isAvailable

*/


import { Schema, model } from "mongoose";

const especialidadesSchema = new Schema({
    specialityName: { type: String },
    isAvailable: { type: Boolean},
},
{
    timestamps: true,
    strict: false,
});

const Especialidades = model("Especialidades", especialidadesSchema);

export default Especialidades;
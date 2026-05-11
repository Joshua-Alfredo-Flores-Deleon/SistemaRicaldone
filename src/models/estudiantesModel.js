/*
    campos:

    name
    lastName
    email
    password
    birthdate
    speciality_id
    carnet
    phone
    isVerified
    loginAttemps
    timeOut

*/

import { Schema, model } from "mongoose";

const estudiantesSchema = new Schema({
    name: { type: String },
    lastName: { type: String},
    email: { type: String},
    password: { type: String},
    birthdate: { type: Date},
    speciality_id: { type: Schema.Types.ObjectId, ref: "Especialidades"},
    carnet: { type: Number},
    phone: { type: String},
    isVerified: { type: Boolean},
    loginAttemps: { type: Number},
    timeOut: { type: Date},
},
{
    timestamps: true,
    strict: false,
});

const Estudiantes = model("Estudiantes", estudiantesSchema);

export default Estudiantes;
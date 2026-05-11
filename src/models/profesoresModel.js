/*
    campos:

    name
    lastName
    email
    password
    phone
    hireDate
    isActive
    isVerified
    loginAttemps
    timeOut

*/


import { Schema, model } from "mongoose";

const profesoresSchema = new Schema({
    name: { type: String },
    lastName: { type: String},
    email: { type: String},
    password: { type: String},
    phone: { type: String},
    hireDate: { type: Date},
    isActive: { type: Boolean},
    isVerified: { type: Boolean},
    loginAttemps: { type: Number},
    timeOut: { type: Date},
},
{
    timestamps: true,
    strict: false,
});

const Profesores = model("Profesores", profesoresSchema);

export default Profesores;
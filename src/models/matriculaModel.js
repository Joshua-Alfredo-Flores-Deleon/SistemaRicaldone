/*
    campos:

    student_id
    amount
    paymentDate
    method
    status
    referenceNumber

*/


import { Schema, model } from "mongoose";

const matriculaSchema = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: "estudiantes"},
    amount: { type: String },
    paymentDate: { type: Date},
    method: { type: String},
    status: { type: Boolean},
    referenceNumber: { type: String}
},
{
    timestamps: true,
    strict: false,
});

const Matricula = model("Matricula", matriculaSchema);

export default Matricula;
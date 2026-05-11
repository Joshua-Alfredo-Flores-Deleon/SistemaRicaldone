/*
    campos:

    subjectName
    teacher_id
    isAvailable

*/


import { Schema, model } from "mongoose";

const materiasSchema = new Schema({
    subjectName: { type: String },
    teacher_id: { type: Schema.Types.ObjectId, ref: "profesores"},
    isAvailable: { type: Boolean}
},
{
    timestamps: true,
    strict: false,
});

const Materias = model("Materias", materiasSchema);

export default Materias;
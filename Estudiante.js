const mongoose = require('mongoose');

const EstudianteSchema = new mongoose.Schema({
  matricula: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  carrera: { type: String, required: true },
  materias: { type: [String], required: true }
});

module.exports = mongoose.model('Estudiante', EstudianteSchema);

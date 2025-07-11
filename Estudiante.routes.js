const express = require('express');
const router = express.Router();
const Estudiante = require('../models/Estudiante');

// CREATE
router.post('/', async (req, res) => {
  try {
    const nuevo = new Estudiante(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const estudiantes = await Estudiante.find();
  res.json(estudiantes);
});

// READ BY ID
router.get('/:id', async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id);
    if (!estudiante) return res.status(404).json({ message: 'No encontrado' });
    res.json(estudiante);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Estudiante.findByIdAndDelete(req.params.id);
    res.json({ message: 'Estudiante eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

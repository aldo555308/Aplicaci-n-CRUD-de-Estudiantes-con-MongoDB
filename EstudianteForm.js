import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EstudianteForm() {
  const [form, setForm] = useState({
    matricula: '',
    nombre: '',
    apellido: '',
    edad: '',
    carrera: '',
    materias: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const cargarEstudiante = async () => {
    const res = await axios.get(`http://localhost:3001/api/estudiantes/${id}`);
    const data = res.data;
    setForm({
      matricula: data.matricula,
      nombre: data.nombre,
      apellido: data.apellido,
      edad: data.edad,
      carrera: data.carrera,
      materias: data.materias.join(', ')
    });
  };

  useEffect(() => {
    if (id) {
      cargarEstudiante();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = async (e) => {
    e.preventDefault();
    const estudiante = {
      ...form,
      edad: parseInt(form.edad),
      materias: form.materias.split(',').map(m => m.trim())
    };

    if (id) {
      await axios.put(`http://localhost:3001/api/estudiantes/${id}`, estudiante);
    } else {
      await axios.post('http://localhost:3001/api/estudiantes', estudiante);
    }

    navigate('/');
  };

  return (
    <form onSubmit={guardar}>
      <input name="matricula" placeholder="Matrícula" value={form.matricula} onChange={handleChange} required /><br />
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required /><br />
      <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required /><br />
      <input name="edad" type="number" placeholder="Edad" value={form.edad} onChange={handleChange} required /><br />
      <input name="carrera" placeholder="Carrera" value={form.carrera} onChange={handleChange} required /><br />
      <input name="materias" placeholder="Materias (separadas por coma)" value={form.materias} onChange={handleChange} required /><br />
      <button type="submit">Guardar</button>
    </form>
  );
}

export default EstudianteForm;

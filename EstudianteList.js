import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EstudianteList() {
  const [estudiantes, setEstudiantes] = useState([]);

  const cargarEstudiantes = async () => {
    const res = await axios.get('http://localhost:3001/api/estudiantes');
    setEstudiantes(res.data);
  };

  const eliminarEstudiante = async (id) => {
    await axios.delete(`http://localhost:3001/api/estudiantes/${id}`);
    cargarEstudiantes();
  };

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  return (
    <div>
      <Link to="/nuevo" className="btn btn-primary">Agregar Estudiante</Link>
      <table border="1" cellPadding="8" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Carrera</th>
            <th>Materias</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(est => (
            <tr key={est._id}>
              <td>{est.matricula}</td>
              <td>{est.nombre} {est.apellido}</td>
              <td>{est.edad}</td>
              <td>{est.carrera}</td>
              <td>{est.materias.join(', ')}</td>
              <td>
                <Link to={`/editar/${est._id}`}>Editar</Link> |
                <button onClick={() => eliminarEstudiante(est._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstudianteList;

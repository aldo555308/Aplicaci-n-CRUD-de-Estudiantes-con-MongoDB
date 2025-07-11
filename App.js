import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EstudianteList from './components/EstudianteList';
import EstudianteForm from './components/EstudianteForm';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Gestión de Estudiantes</h1>
        <Routes>
          <Route path="/" element={<EstudianteList />} />
          <Route path="/nuevo" element={<EstudianteForm />} />
          <Route path="/editar/:id" element={<EstudianteForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

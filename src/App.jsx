import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home.jsx';
import EstudianteLogin from './EstudianteLogin.jsx';
import EstudianteInicio from './EstudianteInicio';
import ConvocanteLogin from './ConvocanteLogin.jsx';
import ConvocanteInicio from './ConvocanteInicio.jsx';
import EstudiantePerfil from './EstudiantePerfil';
import EstudianteSeguimiento from './EstudianteSeguimiento.jsx';


function App() {
  const tipoUsuario = localStorage.getItem('logueado');

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          tipoUsuario === 'estudiante'
            ? <Navigate to="/estudiante" />
            : tipoUsuario === 'convocante'
            ? <Navigate to="/convocante" />
            : <Home />
        } />
        <Route path="/login-estudiante" element={<EstudianteLogin />} />
        <Route path="/estudiante" element={<EstudianteInicio />} />
        <Route path="/login-convocante" element={<ConvocanteLogin />} />
        <Route path="/convocante" element={<ConvocanteInicio />} />
        <Route path="/estudiante-perfil" element={<EstudiantePerfil />} />
        <Route path="/estudiante-seguimiento" element={<EstudianteSeguimiento />} />

      </Routes>
    </Router>
  );
}

export default App;

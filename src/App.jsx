import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

// COMPONENTES GENERALES
import Login from './components/Login.jsx';
import SeleccionRol from './components/SeleccionRol.jsx';
import Profile from './components/Profile.jsx';
import Logout from './components/Logout.jsx';

// COMPONENTES ESTUDIANTE

import EstudianteInicio from './EstudianteInicio.jsx';
import EstudiantePerfil from './components/EstudiantePerfil.jsx';
import EstudianteSeguimiento from './EstudianteSeguimiento.jsx';

// COMPONENTES CONVOCANTE
import ConvocanteLogin from './ConvocanteLogin.jsx';
import ConvocanteInicio from './ConvocanteInicio.jsx';
import ConvocantePerfil from './components/ConvocantePerfil.jsx';
import ConvocanteNuevoProyecto from './ConvocanteNuevoProyecto.jsx';
import ConvocanteEstudiantes from './ConvocanteEstudiantes.jsx';

// NAVBAR SOLO PARA USUARIOS LOGUEADOS
const Navbar = () => {
  const token = Cookies.get('token');
  const location = useLocation();
  const mostrarNavbar = token && !['/', '/login', '/seleccion-rol'].includes(location.pathname);

  return mostrarNavbar ? (
    <nav style={{ margin: 20 }}>
      <Link to="/perfil">Perfil</Link> |{" "}
      <Link to="/logout">Cerrar sesión</Link>
    </nav>
  ) : null;
};

function App() {
  const tipoUsuario = localStorage.getItem('logueado');
  const token = Cookies.get('token');

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* PANTALLA DE LOGIN PRINCIPAL */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* SELECCIÓN DE ROL */}
        <Route path="/seleccion-rol" element={<SeleccionRol />} />

        {/* LOGIN POR ROL */}
        <Route path="/login-estudiante" element={<EstudianteLogin />} />
        <Route path="/login-convocante" element={<ConvocanteLogin />} />

        {/* RUTAS DE ESTUDIANTE */}
        {tipoUsuario === 'estudiante' && (
          <>
            <Route path="/estudiante" element={<EstudianteInicio />} />
            <Route path="/estudiante-perfil" element={<EstudiantePerfil />} />
            <Route path="/estudiante-seguimiento" element={<EstudianteSeguimiento />} />
          </>
        )}

        {/* RUTAS DE CONVOCANTE */}
        {tipoUsuario === 'convocante' && (
          <>
            <Route path="/convocante" element={<ConvocanteInicio />} />
            <Route path="/convocante-perfil" element={<ConvocantePerfil />} />
            <Route path="/convocante-nuevo-proyecto" element={<ConvocanteNuevoProyecto />} />
            <Route path="/convocante-estudiantes" element={<ConvocanteEstudiantes />} />
          </>
        )}

        {/* RUTAS GITHUB */}
        <Route
          path="/perfil"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/logout" element={<Logout />} />

        {/* CUALQUIER RUTA DESCONOCIDA */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

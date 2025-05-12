import React from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  Button,
  Box
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

export default function SeleccionRol() {
  const navigate = useNavigate();

  const seleccionarRol = (rol) => {
    const perfil = JSON.parse(localStorage.getItem('perfilTemporal')) || {};
    perfil.rol = rol;

    // Guardamos como perfilEstudiante o perfilConvocante según corresponda
    if (rol === 'estudiante') {
      localStorage.setItem('perfilEstudiante', JSON.stringify(perfil));
      localStorage.setItem('logueado', 'estudiante');
      navigate('/estudiante');
    } else {
      localStorage.setItem('perfilConvocante', JSON.stringify(perfil));
      localStorage.setItem('logueado', 'convocante');
      navigate('/convocante');
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '1rem' }}>
        <Container header={<Header variant="h1">Selecciona tu Rol</Header>}>
          <SpaceBetween size="l">
            <p>¿Cómo deseas usar OportUNI?</p>
            <Button variant="primary" onClick={() => seleccionarRol('estudiante')}>
              Soy Estudiante
            </Button>
            <Button variant="normal" onClick={() => seleccionarRol('convocante')}>
              Soy Convocante
            </Button>
          </SpaceBetween>
        </Container>
      </div>
    </div>
  );
}

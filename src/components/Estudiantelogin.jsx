import React from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  Box,
  Button
} from '@cloudscape-design/components';

export default function RegistroEstudiante() {
  const handleGitHubRegister = () => {
    const perfilSimulado = {
      nombre: 'Cristina Martínez',
      universidad: 'UPC',
      carrera: 'Ingeniería de Sistemas',
      ciclo: 10,
      habilidades: ['React', 'Node.js'],
      idiomas: ['Español', 'Inglés'],
    };

    localStorage.setItem('perfilEstudiante', JSON.stringify(perfilSimulado));
    localStorage.setItem('logueado', 'estudiante');
    window.location.href = '/estudiante';
  };

  const handleGmailRegister = () => {
    const perfilSimulado = {
      nombre: 'Cristina G. Martínez',
      universidad: 'PUCP',
      carrera: 'Ingeniería de Software',
      ciclo: 9,
      habilidades: ['Python', 'Flask'],
      idiomas: ['Español', 'Inglés'],
    };

    localStorage.setItem('perfilEstudiante', JSON.stringify(perfilSimulado));
    localStorage.setItem('logueado', 'estudiante');
    window.location.href = '/estudiante';
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
        <Container
          header={<Header variant="h1">Registro - Estudiante</Header>}
        >
          <SpaceBetween size="l">
            <Box textAlign="center">Regístrate con una cuenta para continuar:</Box>
            <Box display="flex" justifyContent="center" gap="s">
              <Button variant="primary" onClick={handleGitHubRegister}>GitHub</Button>
              <Button variant="normal" onClick={handleGmailRegister}>Gmail</Button>
            </Box>
          </SpaceBetween>
        </Container>
      </div>
    </div>
  );
}

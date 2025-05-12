import React from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  Box,
  Button
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleGitHub = () => {
    const perfil = {
      nombre: 'Cristina G.',
      email: 'cristina@example.com',
      origen: 'GitHub'
    };
    localStorage.setItem('perfilTemporal', JSON.stringify(perfil));
    navigate('/seleccion-rol');
  };

  const handleGmail = () => {
    const perfil = {
      nombre: 'Cristina G.',
      email: 'cristina@gmail.com',
      origen: 'Gmail'
    };
    localStorage.setItem('perfilTemporal', JSON.stringify(perfil));
    navigate('/seleccion-rol');
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
        <Container header={<Header variant="h1">Bienvenido a OportUNI</Header>}>
          <SpaceBetween size="l">
            <p>Conecta tu cuenta para continuar:</p>

            {/* Separación vertical de botones */}
            <SpaceBetween size="xs">
              <Button variant="primary" onClick={handleGitHub}>Entrar con GitHub</Button>
              <Button variant="normal" onClick={handleGmail}>Entrar con Gmail</Button>
            </SpaceBetween>

          </SpaceBetween>
        </Container>
      </div>
    </div>
  );
}

import React from 'react';
import {
  AppLayout,
  Container,
  Header,
  SpaceBetween,
  Box,
  Button,
  Cards
} from '@cloudscape-design/components';
import ConvocanteLayout from './ConvocanteLayout';
import { useNavigate } from 'react-router-dom';

export default function ConvocanteInicio() {
  const navigate = useNavigate();

  const perfil = JSON.parse(localStorage.getItem('perfilConvocante')) || {
    nombre: 'Tech4Change ONG',
    correo: 'contacto@tech4change.org',
  };

  const proyectos = [
    {
      id: 1,
      titulo: 'Mentoría STEM',
      estado: 'Activo',
      fecha: '15 de mayo',
      invitados: 5,
    },
    {
      id: 2,
      titulo: 'Campaña Ambiental',
      estado: 'Cerrado',
      fecha: '02 de abril',
      invitados: 8,
    },
  ];

  const totalInvitados = proyectos.reduce((sum, p) => sum + p.invitados, 0);

  return (
    <ConvocanteLayout perfil={perfil} breadcrumb="Inicio">
      <Box padding="l" display="flex" justifyContent="center">
        <Box width="100%" maxWidth="950px">
          
          {/* Panel de bienvenida */}
          <Container header={<Header variant="h1">Bienvenido(a), {perfil.nombre}</Header>}>
            <SpaceBetween size="l">
              <Box>
                <p>Desde este panel puedes gestionar tus oportunidades, publicar nuevas convocatorias y hacer seguimiento a los estudiantes invitados.</p>
              </Box>

              <Box variant="div">
                <p><strong>Proyectos publicados:</strong> {proyectos.length}</p>
                <p><strong>Estudiantes invitados:</strong> {totalInvitados}</p>
              </Box>

              <Button variant="primary" onClick={() => navigate('/convocante-nuevo-proyecto')}>
                + Publicar nuevo proyecto
              </Button>
            </SpaceBetween>
          </Container>

          {/* Espaciador */}
          <Box margin={{ top: 'xl' }} />

          {/* Lista de proyectos */}
          <Container header={<Header variant="h2">Tus Proyectos Recientes</Header>}>
            {proyectos.length > 0 ? (
              <Cards
                items={proyectos}
                cardDefinition={{
                  header: item => item.titulo,
                  sections: [
                    {
                      id: 'estado',
                      header: 'Estado',
                      content: item => item.estado
                    },
                    {
                      id: 'fecha',
                      header: 'Fecha de publicación',
                      content: item => item.fecha
                    },
                    {
                      id: 'invitados',
                      header: 'Estudiantes invitados',
                      content: item => `${item.invitados} estudiante(s)`
                    }
                  ]
                }}
                empty="No tienes proyectos publicados aún."
                selectionType="none"
              />
            ) : (
              <Box margin={{ top: 'm' }}>
                <p>Aún no has publicado ningún proyecto. Haz clic en "Publicar nuevo proyecto" para comenzar.</p>
              </Box>
            )}
          </Container>

        </Box>
      </Box>
    </ConvocanteLayout>
  );
}

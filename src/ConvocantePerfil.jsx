// ConvocantePerfil.jsx
import React from 'react';
import ConvocanteLayout from './ConvocanteLayout';
import {
  Container,
  Header,
  SpaceBetween,
  FormField,
  Box,
  Button,
  Input,
  Textarea,
  StatusIndicator
} from '@cloudscape-design/components';

export default function ConvocantePerfil() {
  const perfil = {
    nombre: 'Tech4Change ONG',
    tipo: 'Organización sin fines de lucro',
    correo: 'contacto@tech4change.org',
    descripcion: 'Promovemos el uso de la tecnología para mejorar la calidad de vida en comunidades vulnerables.',
    convocatoriasPublicadas: 6,
    estudiantesInvitados: 18
  };

  return (
    <ConvocanteLayout breadcrumb="Mi Perfil">
      <Box padding="l" display="flex" justifyContent="center">
        <Box width="100%" maxWidth="600px">
          <Container
            header={<Header variant="h1">Mi Perfil de Convocante</Header>}
          >
            <SpaceBetween size="l">
              <FormField label="Nombre de la organización">
                <Input value={perfil.nombre} readOnly />
              </FormField>

              <FormField label="Tipo de entidad">
                <Input value={perfil.tipo} readOnly />
              </FormField>

              <FormField label="Correo de contacto">
                <Input value={perfil.correo} readOnly />
              </FormField>

              <FormField label="Descripción">
                <Textarea value={perfil.descripcion} readOnly rows={3} />
              </FormField>

              <Box>
                <p><strong>Convocatorias creadas:</strong> {perfil.convocatoriasPublicadas}</p>
                <p><strong>Estudiantes invitados:</strong> {perfil.estudiantesInvitados}</p>
              </Box>

              <Box>
                <Button variant="link">Subir logotipo (opcional)</Button>
              </Box>

              <Box>
                <StatusIndicator type="info">Información cargada desde sistema de administración</StatusIndicator>
              </Box>
            </SpaceBetween>
          </Container>
        </Box>
      </Box>
    </ConvocanteLayout>
  );
}

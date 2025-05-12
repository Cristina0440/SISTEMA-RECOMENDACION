import React, { useState } from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  FormField,
  Input,
  Textarea,
  Button,
  Select,
  Box,
  Multiselect
} from '@cloudscape-design/components';
import ConvocanteLayout from './ConvocanteLayout';

export default function ConvocanteNuevoProyecto() {
  const [formulario, setFormulario] = useState({
    titulo: '',
    descripcion: '',
    habilidades: [],
    modalidad: '',
    fechaLimite: '',
  });

  const habilidadesOpciones = [
    { label: 'React' }, { label: 'Node.js' }, { label: 'SQL' },
    { label: 'Python' }, { label: 'Comunicación' }, { label: 'Diseño UX' }
  ];

  const modalidades = [
    { label: 'Virtual' },
    { label: 'Presencial' },
    { label: 'Semipresencial' }
  ];

  const handleChange = (campo, valor) => {
    setFormulario({ ...formulario, [campo]: valor });
  };

  const handleSubmit = () => {
    console.log('Proyecto publicado:', formulario);
    alert('Proyecto publicado correctamente ✅');
    setFormulario({
      titulo: '',
      descripcion: '',
      habilidades: [],
      modalidad: '',
      fechaLimite: '',
    });
  };

  return (
    <ConvocanteLayout breadcrumb="Publicar Proyecto">
      <Box padding="l" display="flex" justifyContent="center">
        <Box width="100%" maxWidth="700px">
          <Container header={<Header variant="h1">Publicar Nuevo Proyecto</Header>}>
            <SpaceBetween size="l">
              <FormField label="Título del Proyecto">
                <Input
                  value={formulario.titulo}
                  onChange={(e) => handleChange('titulo', e.detail.value)}
                />
              </FormField>

              <FormField label="Descripción">
                <Textarea
                  value={formulario.descripcion}
                  onChange={(e) => handleChange('descripcion', e.detail.value)}
                  rows={4}
                />
              </FormField>

              <FormField label="Habilidades requeridas">
                <Multiselect
                  selectedOptions={formulario.habilidades}
                  onChange={(e) => handleChange('habilidades', e.detail.selectedOptions)}
                  options={habilidadesOpciones}
                  placeholder="Selecciona habilidades"
                />
              </FormField>

              <FormField label="Modalidad">
                <Select
                  selectedOption={modalidades.find(m => m.label === formulario.modalidad)}
                  onChange={(e) => handleChange('modalidad', e.detail.selectedOption.label)}
                  options={modalidades}
                  placeholder="Selecciona una modalidad"
                />
              </FormField>

              <FormField label="Fecha límite para postulación">
                <Input
                  type="date"
                  value={formulario.fechaLimite}
                  onChange={(e) => handleChange('fechaLimite', e.detail.value)}
                />
              </FormField>

              <Button variant="primary" onClick={handleSubmit}>Publicar Proyecto</Button>
            </SpaceBetween>
          </Container>
        </Box>
      </Box>
    </ConvocanteLayout>
  );
}

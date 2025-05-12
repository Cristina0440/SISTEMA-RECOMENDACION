// ConvocanteEstudiantes.jsx
import React, { useState } from 'react';
import {
  Container,
  Header,
  Cards,
  Box,
  Select,
  ContentLayout,
  StatusIndicator
} from '@cloudscape-design/components';
import ConvocanteLayout from './ConvocanteLayout';

// 🔧 Simulaciones de proyectos
const proyectosSimulados = [
  {
    id: '1',
    titulo: 'Mentoría STEM',
    requeridas: ['Python', 'Comunicación', 'Educación']
  },
  {
    id: '2',
    titulo: 'Campaña Ambiental',
    requeridas: ['Liderazgo', 'Creatividad', 'Ecología']
  }
];

// 🔧 Simulaciones de estudiantes
const estudiantesTotales = [
  {
    id: 1,
    nombre: 'Cristina Martínez',
    carrera: 'Ingeniería de Sistemas',
    habilidades: ['React', 'Node.js', 'UX', 'Creatividad'],
    coincidenciaCon: (req) => req.filter(r => ['React', 'Node.js', 'UX', 'Creatividad'].includes(r)).length
  },
  {
    id: 2,
    nombre: 'Luis Quispe',
    carrera: 'Ciencias de la Computación',
    habilidades: ['Python', 'Django', 'Comunicación'],
    coincidenciaCon: (req) => req.filter(r => ['Python', 'Django', 'Comunicación'].includes(r)).length
  },
  {
    id: 3,
    nombre: 'Valeria López',
    carrera: 'Ingeniería Industrial',
    habilidades: ['Gestión', 'Liderazgo'],
    coincidenciaCon: (req) => req.filter(r => ['Gestión', 'Liderazgo'].includes(r)).length
  },
  {
    id: 4,
    nombre: 'Diego Ramírez',
    carrera: 'Educación',
    habilidades: ['Comunicación', 'Educación', 'Paciencia'],
    coincidenciaCon: (req) => req.filter(r => ['Comunicación', 'Educación', 'Paciencia'].includes(r)).length
  },
  {
    id: 5,
    nombre: 'Lucía Torres',
    carrera: 'Ingeniería Ambiental',
    habilidades: ['Ecología', 'Liderazgo', 'Creatividad'],
    coincidenciaCon: (req) => req.filter(r => ['Ecología', 'Liderazgo', 'Creatividad'].includes(r)).length
  }
];

export default function ConvocanteEstudiantes() {
  const perfil = JSON.parse(localStorage.getItem('perfilConvocante')) || {
    nombre: 'Tech4Change ONG',
    correo: 'contacto@tech4change.org'
  };

  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  const estudiantesFiltrados = proyectoSeleccionado
    ? estudiantesTotales
        .map(est => {
          const coincidencias = est.coincidenciaCon(proyectoSeleccionado.requeridas);
          const porcentaje = Math.round((coincidencias / proyectoSeleccionado.requeridas.length) * 95);
          return { ...est, coincidencia: coincidencias, porcentaje };
        })
        .filter(est => est.coincidencia > 0)
    : [];

  return (
    <ConvocanteLayout perfil={perfil} breadcrumb="Estudiantes sugeridos">
      <ContentLayout
        header={<Header variant="h1">Estudiantes Sugeridos</Header>}
      >
        <Container
          header={
            <Header variant="h2" description="Selecciona un proyecto para ver candidatos compatibles">
              Filtro por proyecto
            </Header>
          }
        >
          <Box margin={{ bottom: 'm' }}>
            <Select
              selectedOption={
                proyectoSeleccionado
                  ? { label: proyectoSeleccionado.titulo, value: proyectoSeleccionado.id }
                  : null
              }
              onChange={({ detail }) => {
                const proyecto = proyectosSimulados.find(p => p.id === detail.selectedOption.value);
                setProyectoSeleccionado(proyecto);
              }}
              options={proyectosSimulados.map(p => ({
                label: p.titulo,
                value: p.id
              }))}
              placeholder="Selecciona un proyecto"
            />
          </Box>

          {proyectoSeleccionado && estudiantesFiltrados.length > 0 && (
            <Cards
              items={estudiantesFiltrados}
              cardDefinition={{
                header: item => item.nombre,
                sections: [
                  {
                    id: 'carrera',
                    header: 'Carrera',
                    content: item => item.carrera
                  },
                  {
                    id: 'habilidades',
                    header: 'Habilidades',
                    content: item => item.habilidades.join(', ')
                  },
                  {
                    id: 'porcentaje',
                    header: 'Compatibilidad',
                    content: item => (
                      <StatusIndicator type={
                        item.porcentaje >= 80 ? 'success' :
                        item.porcentaje >= 50 ? 'info' : 'warning'
                      }>
                        {item.porcentaje}% de coincidencia
                      </StatusIndicator>
                    )
                  }
                ]
              }}
              empty="No hay estudiantes compatibles."
              loadingText="Cargando..."
              selectionType="none"
            />
          )}

          {proyectoSeleccionado && estudiantesFiltrados.length === 0 && (
            <Box margin={{ top: 'm' }}>
              No hay estudiantes compatibles con los requisitos de este proyecto.
            </Box>
          )}
        </Container>
      </ContentLayout>
    </ConvocanteLayout>
  );
}

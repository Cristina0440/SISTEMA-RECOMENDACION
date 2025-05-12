// EstudianteInicio.jsx
import React, { useEffect, useState } from 'react';
import {
  AppLayout,
  BreadcrumbGroup,
  Container,
  ContentLayout,
  Flashbar,
  Header,
  HelpPanel,
  Link,
  SideNavigation,
  Cards,
  Box,
  Button
} from '@cloudscape-design/components';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import { useNavigate } from 'react-router-dom';
import CustomHeader from './CustomHeader';

const LOCALE = 'en';

export default function EstudianteInicio() {
  const navigate = useNavigate();
  const [mensajeVisible, setMensajeVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMensajeVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const perfil = JSON.parse(localStorage.getItem('perfilEstudiante')) || {
    nombre: 'Estudiante',
    correo: 'correo@ejemplo.com',
    carrera: 'No definida',
    ciclo: '—',
    habilidades: [],
  };

  const convocatoriasPendientes = JSON.parse(localStorage.getItem('convocatoriasEstudiante')) || [];
  const cantidadPendientes = convocatoriasPendientes.filter(c => c.estado === 'pendiente').length;

  const convocatorias = [
    {
      id: 1,
      titulo: 'Voluntariado en ONG Verde',
      descripcion: 'Colabora en un proyecto que mejora el acceso digital en zonas rurales.',
      organizador: 'ONG Verde Futuro',
      duracion: '1 de mayo - 15 de junio',
      habilidades: ['Comunicación', 'Liderazgo'],
      beneficios: 'Certificación digital',
      modalidad: 'Virtual',
      fecha: '15 de abril'
    },
    {
      id: 2,
      titulo: 'Proyecto de mentoría STEM',
      descripcion: 'Apoya en mentoría a escolares de colegios públicos en ciencias.',
      organizador: 'Universidad Nacional de Ingeniería',
      duracion: 'Abril - Julio',
      habilidades: ['Matemática básica', 'Trabajo colaborativo'],
      beneficios: 'Horas extracurriculares',
      modalidad: 'Presencial',
      fecha: '20 de abril'
    },
    {
      id: 3,
      titulo: 'Campaña de reciclaje universitaria',
      descripcion: 'Organiza y lidera actividades de concientización ambiental.',
      organizador: 'Red Ambiental Estudiantil',
      duracion: '5 al 25 de abril',
      habilidades: ['Liderazgo', 'Creatividad'],
      beneficios: 'Constancia + kit ecológico',
      modalidad: 'Semipresencial',
      fecha: '10 de abril'
    }
  ];

  return (
    <I18nProvider locale={LOCALE} messages={[messages]}>
      <CustomHeader nombre={perfil.nombre} />
      <AppLayout
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Inicio', href: '/' },
              { text: 'Estudiante', href: '#' }
            ]}
          />
        }
        navigation={
          <SideNavigation
            header={{ href: '#', text: 'Sistema de Recomendación' }}
            items={[
              { type: 'link', text: 'Mi perfil ', href: '/estudiante-perfil' },
              { type: 'link', text: 'Convocatoria', href: '/estudiante' },
              { type: 'link', text: 'Seguimiento', href: '/estudiante-seguimiento' }
            ]}
          />
        }
        notifications={
          mensajeVisible && cantidadPendientes > 0 ? (
            <Flashbar
              items={[{
                type: 'info',
                dismissible: true,
                content: `¡Atención! Hay ${cantidadPendientes} nueva${cantidadPendientes > 1 ? 's' : ''} convocatoria${cantidadPendientes > 1 ? 's' : ''} esperando tu respuesta.`,
                id: 'mensaje_1'
              }]}
            />
          ) : null
        }
        tools={
          <HelpPanel header={<h2>Mi Perfil</h2>}>
            <p><strong>Nombre:</strong> {perfil.nombre}</p>
            <p><strong>Correo:</strong> {perfil.correo}</p>
            <p><strong>Carrera:</strong> {perfil.carrera}</p>
            <p><strong>Ciclo:</strong> {perfil.ciclo}</p>
            <p><strong>Habilidades:</strong> {perfil.habilidades?.join(', ')}</p>
            <br />
          <Button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            variant="normal"
          >
            Cerrar sesión
          </Button>

          </HelpPanel>
        }
        content={
          <ContentLayout
            header={<Header variant="h1" info={<Link variant="info">Ayuda</Link>}>Convocatorias Recomendadas para Ti</Header>}
          >
            <Container header={<Header variant="h2" description="Coinciden con tus intereses y habilidades">Proyectos compatibles</Header>}>
              <Cards
                items={convocatorias}
                cardDefinition={{
                  header: item => item.titulo,
                  sections: [
                    { id: 'descripcion', header: 'Descripción', content: item => item.descripcion },
                    { id: 'organizador', header: 'Organizador', content: item => item.organizador },
                    { id: 'duracion', header: 'Duración', content: item => item.duracion },
                    { id: 'habilidades', header: 'Habilidades requeridas', content: item => item.habilidades.join(', ') },
                    { id: 'beneficios', header: 'Beneficios', content: item => item.beneficios },
                    { id: 'modalidad', header: 'Modalidad', content: item => item.modalidad },
                    { id: 'fecha', header: 'Fecha límite', content: item => item.fecha }
                  ]
                }}
                empty="No hay convocatorias disponibles en este momento."
                loadingText="Cargando convocatorias..."
                selectionType="none"
              />
            </Container>
          </ContentLayout>
        }
      />
    </I18nProvider>
  );
}

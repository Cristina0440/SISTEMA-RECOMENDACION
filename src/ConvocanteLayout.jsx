// ConvocanteLayout.jsx
import React from 'react';
import BaseLayout from './BaseLayout';
import {
  SideNavigation,
  HelpPanel,
  Button,
  Box
} from '@cloudscape-design/components';

export default function ConvocanteLayout({ children, breadcrumb, perfil, mensaje }) {
  const navigationItems = [
    { type: 'link', text: 'Inicio', href: '/convocante' },
    { type: 'link', text: 'Mi Perfil', href: '/convocante-perfil' },
    { type: 'link', text: 'Publicar Proyecto', href: '/convocante-nuevo-proyecto' }
    
  ];

  const toolsPanel = (
    <HelpPanel header={<h2>Mi Sesión</h2>}>
      <p><strong>Nombre:</strong> {perfil?.nombre || 'Convocante'}</p>
      <p><strong>Correo:</strong> {perfil?.correo || 'correo@ejemplo.com'}</p>
      <Box margin={{ top: 'm' }}>
        <Button onClick={() => {
          localStorage.clear();
          window.location.href = '/';
        }} variant="normal">
          Cerrar sesión
        </Button>
      </Box>
    </HelpPanel>
  );

  return (
    <BaseLayout
      perfil={perfil}
      breadcrumb={breadcrumb || 'Convocante'}
      navigation={<SideNavigation header={{ text: 'OportUNI', href: '/convocante' }} items={navigationItems} />}
      tools={toolsPanel}
      mensaje={mensaje}
    >
      {children}
    </BaseLayout>
  );
}

import {
    Container,
    ContentLayout,
    Header,
    Link,
    Cards,
    Box,
    Button
  } from '@cloudscape-design/components';

export default function EstudiantePerfil() {
  const perfil = JSON.parse(localStorage.getItem('perfilEstudiante')) || { 
    nombre: 'Estudiante',
    correo: 'correo@ejemplo.com',
    carrera: 'No definida',
    ciclo: '—',
    habilidades: [],
   };

  return (
    <EstudianteLayout perfil={perfil}>
      <Container header={<Header variant="h1">Mi Perfil</Header>}>
      <Box variant="h2" fontSize="heading-l">
      👤 {perfil.nombre}
    </Box>
    <Box variant="p">
      <strong>Correo institucional:</strong> {perfil.correo}
    </Box>
    <Box variant="p">
      <strong>Carrera:</strong> {perfil.carrera}
    </Box>
    <Box variant="p">
      <strong>Ciclo:</strong> {perfil.ciclo}
    </Box>
    <Box variant="p">
      <strong>Habilidades:</strong>{' '}
      {perfil.habilidades?.length > 0
        ? perfil.habilidades.join(', ')
        : 'No registradas'}
    </Box>
    <Box margin={{ top: 's' }}>
      <Button variant="primary">Editar perfil</Button>
    </Box>
      </Container>
    </EstudianteLayout>
  );
}

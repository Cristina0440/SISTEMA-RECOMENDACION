import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_ID } from '../graphql/queries';
import { UPDATE_USER } from '../graphql/mutations';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import React from 'react';

const Profile = () => {
  const [form, setForm] = useState({ names: '', lastName: '', username: '' });

  const token = Cookies.get('token');
  const userId = Cookies.get('userId');

  console.log('[Profile] Token:', token);
  console.log('[Profile] UserID:', userId);

  const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId }
  });

  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (data) console.log('[Profile] Datos recibidos:', data);
    if (error) console.error('[Profile] Error:', error);
  }, [data, error]);

  if (!token) {
    console.warn('[Profile] Token no encontrado');
    return <p>Token no encontrado. Por favor inicia sesión.</p>;
  }

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.getUserById;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const result = await updateUser({
        variables: {
          id: user.id,
          input: form
        }
      });
      console.log('[Profile] Usuario actualizado:', result);
      refetch();
    } catch (err) {
      console.error('[Profile] Error al actualizar usuario:', err);
    }
  };

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <img src={user.avatarUrl} alt="avatar" width={80} />
      <p><strong>Correo:</strong> {user.email}</p>
      <p><strong>Nombre actual:</strong> {user.names}</p>

      <h3>Editar Perfil</h3>
      <input placeholder="Nuevo nombre" name="names" onChange={handleChange} />
      <input placeholder="Apellido" name="lastName" onChange={handleChange} />
      <input placeholder="Usuario" name="username" onChange={handleChange} />
      <button onClick={handleUpdate}>Actualizar</button>
    </div>
  );
};

export default Profile;

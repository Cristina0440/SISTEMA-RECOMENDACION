import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@cloudscape-design/components';
import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import { REGISTER_WITH_GITHUB } from '../graphql/mutations';

const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;

export default function Login() {
  const navigate = useNavigate();
  const [registerUserWithGithub, { loading, error }] = useMutation(REGISTER_WITH_GITHUB);
  const code = new URLSearchParams(window.location.search).get('code');

  // Si hay código de GitHub, hacer login
  useEffect(() => {
    const loginWithCode = async () => {
      if (!code) return;

      try {
        const res = await registerUserWithGithub({ variables: { code } });
        const user = res.data?.registerUserWithGithub;

        if (user?.token && user?.id) {
          Cookies.set('token', user.token);
          Cookies.set('userId', user.id);

          // Guardamos perfil temporal (puedes ampliar esto luego)
          localStorage.setItem('perfilTemporal', JSON.stringify(user));
          
          navigate('/seleccion-rol');
        } else {
          console.error('No se obtuvo usuario válido del backend.');
        }
      } catch (err) {
        console.error('Error al registrar usuario con GitHub:', err);
      }
    };

    loginWithCode();
  }, [code, registerUserWithGithub, navigate]);

  const redirectToGithub = () => {
    const scope = 'read:user user:email';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = githubAuthUrl;
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      fontFamily: 'sans-serif'
    }}>
      {/* IZQUIERDA */}
      <div style={{
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>
        <img
          src="/logo-oportuni.png"
          alt="Logo OportUNI"
          style={{
            width: '180px',
            marginBottom: '1rem',
            display: 'block'
          }}
        />
        <p style={{ textAlign: 'center', maxWidth: '300px' }}>
          Conecta con oportunidades universitarias y encuentra tu espacio ideal.
        </p>
      </div>

      {/* DERECHA */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #003b5c, #00a6a6)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Bienvenido</h2>
        <p style={{ marginBottom: '2rem' }}>Ingresa con tu cuenta de GitHub</p>

        <Button variant="primary" onClick={redirectToGithub} disabled={loading}>
          Entrar con GitHub
        </Button>

        {error && (
          <p style={{ color: 'white', marginTop: '1rem' }}>
            Error: {error.message}
          </p>
        )}
      </div>
    </div>
  );
}

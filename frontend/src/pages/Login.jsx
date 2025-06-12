import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../auth';



export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/Inicio');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Iniciar Sesión 2.0 </h2>
        {error && <p style={styles.error}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.primaryButton}>¡Entrar!</button>
        </form>

        <div style={styles.footer}>
          <Link to="/Registro" style={styles.primaryButton}>¡Registrarte!</Link> <br /> <br />
          <Link to="/Inicio" style={styles.link}>Volver al inicio</Link>
          
        </div>
      </div>
    </div>
  );
}

// Estilos consistentes con el resto de la aplicación
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    padding: '0px'
  },
  loginBox: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  title: {
    color: '#2c3e50',
    marginBottom: '1.5rem',
    fontSize: '1.8rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  primaryButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: '1rem',
    width: '100%',
    textDecoration: 'none'
    
  },
  error: {
    color: '#e74c3c',
    backgroundColor: '#fadbd8',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem'
  },
  footer: {
    marginTop: '1.5rem',
    textAlign: 'center'
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontSize: '0.9rem',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
};
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [registrado, setRegistrado] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (usuario.password !== usuario.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Lógica para registrar el usuario
    console.log('Usuario registrado:', usuario);
    setRegistrado(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registro de Usuario</h2>
      
      {registrado ? (
        <div style={styles.alertSuccess}>
          ¡Registro exitoso! Redirigiendo al login...
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.alertError}>{error}</div>}

          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              name="password"
              value={usuario.password}
              onChange={handleChange}
              style={styles.input}
              required
              minLength="6"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={usuario.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              required
              minLength="6"
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.primaryButton}>
              Registrarse
            </button>
            <button 
              type="button" 
              style={styles.secondaryButton}
              onClick={() => navigate('/login')}
            >
              ¿Ya tienes cuenta? Inicia Sesión
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto'
  },
  title: {
    color: '#2c3e50',
    marginBottom: '2rem',
    fontSize: '1.8rem'
  },
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#2c3e50'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '2rem'
  },
  primaryButton: {
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  secondaryButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  alertSuccess: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  alertError: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center'
  }
};
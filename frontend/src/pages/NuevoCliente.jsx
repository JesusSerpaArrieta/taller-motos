import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NuevoCliente() {
  const [cliente, setCliente] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    correo: '',
    placa: ''
  });

  const [guardado, setGuardado] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clientesGuardados = JSON.parse(localStorage.getItem('clientes')) || [];
    const nuevo = { ...cliente, id: Date.now() };
    clientesGuardados.push(nuevo);
    localStorage.setItem('clientes', JSON.stringify(clientesGuardados));
    setGuardado(true);
    setTimeout(() => navigate('/clientes'), 2000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Nuevo Cliente</h2>

      {guardado ? (
        <div style={styles.alertSuccess}>
          ¡Cliente guardado correctamente!
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              value={cliente.nombre}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Cédula</label>
            <input
              type="text"
              name="cedula"
              value={cliente.cedula}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={cliente.telefono}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              name="correo"
              value={cliente.correo}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Placa de la moto</label>
            <input
              type="text"
              name="placa"
              value={cliente.placa}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.primaryButton}>
              Guardar Cliente
            </button>
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={() => navigate('/clientes')}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
  },
  alertSuccess: {
    padding: '15px',
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '5px',
    color: '#155724',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    marginBottom: '6px',
    display: 'block',
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  primaryButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

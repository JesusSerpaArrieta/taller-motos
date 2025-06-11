import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('clientes');
    if (data) {
      setClientes(JSON.parse(data));
    }
  }, []);

  const handleBuscar = () => {
    const filtro = busqueda.toLowerCase();
    return clientes.filter(
      c => c.nombre.toLowerCase().includes(filtro) || c.cedula.toLowerCase().includes(filtro)
    );
  };

  const handleEliminar = (id) => {
    if (confirm('¿Seguro que deseas eliminar este cliente?')) {
      const nuevosClientes = clientes.filter(c => c.id !== id);
      setClientes(nuevosClientes);
      localStorage.setItem('clientes', JSON.stringify(nuevosClientes));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h2 style={styles.title}>Clientes</h2>
          <Link to="/NuevoCliente" style={styles.primaryButton}>Nuevo Cliente</Link>
        </div>
        
        <div style={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Buscar..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {handleBuscar().map((c) => (
              <tr key={c.id}>
                <td>{c.cedula}</td>
                <td>{c.nombre}</td>
                <td>{c.telefono}</td>
                <td>{c.correo}</td>
                <td>
                  <Link to={`/HistorialCliente/`} style={styles.actionButton}>Historial</Link>
                  <button onClick={() => handleEliminar(c.id)} style={styles.actionButtonDanger}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    paddingTop: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start'
  },
  content: {
    padding: '0rem',
    maxWidth: '1200px',
    width: '90%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '2rem'
  },
  title: {
    color: '#2c3e50',
    fontSize: '1.8rem'
  },
  primaryButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  searchBar: {
    display: 'flex',
    width: '100%',
    marginBottom: '2rem'
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  actionButton: {
    marginRight: '0.5rem',
    padding: '0.25rem 1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  actionButtonDanger: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
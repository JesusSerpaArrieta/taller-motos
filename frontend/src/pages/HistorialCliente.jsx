import { Link } from 'react-router-dom';

export default function HistorialCliente() {
  const cliente = {
    cedula: 'V-12345678',
    nombre: 'Juan Pérez',
    telefono: '0412-5551234',
    correo: 'juan@example.com',
    motos: [
      { placa: 'ABC123', marca: 'Yamaha', modelo: 'FZ-150', año: '2020' }
    ],
    historial: [
      {
        id: 'S-001',
        fecha: '15/05/2023',
        servicios: ['Cambio de aceite', 'Alineación'],
        repuestos: ['Filtro de aceite', 'Aceite 20W-50'],
        total: 96.50
      },
      {
        id: 'S-002',
        fecha: '10/03/2023',
        servicios: ['Revisión general'],
        repuestos: ['Bujías'],
        total: 35.00
      }
    ]
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Historial del Cliente</h2>
        <Link to="/clientes" style={styles.backButton}>
          ← Volver a clientes
        </Link>
      </div>

      <div style={styles.clientInfo}>
        <h3 style={styles.clientName}>{cliente.nombre}</h3>
        <div style={styles.infoGrid}>
          <div>
            <p style={styles.infoLabel}>Cédula:</p>
            <p>{cliente.cedula}</p>
          </div>
          <div>
            <p style={styles.infoLabel}>Teléfono:</p>
            <p>{cliente.telefono}</p>
          </div>
          <div>
            <p style={styles.infoLabel}>Correo:</p>
            <p>{cliente.correo}</p>
          </div>
        </div>

        <h4 style={styles.sectionTitle}>Motos registradas</h4>
        <div style={styles.motosContainer}>
          {cliente.motos.map((moto, index) => (
            <div key={index} style={styles.motoCard}>
              <p><strong>Placa:</strong> {moto.placa}</p>
              <p><strong>Marca/Modelo:</strong> {moto.marca} {moto.modelo}</p>
              <p><strong>Año:</strong> {moto.año}</p>
            </div>
          ))}
        </div>
      </div>

      <h4 style={styles.sectionTitle}>Historial de Servicios</h4>
      <table style={styles.historyTable}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>ID Servicio</th>
            <th>Fecha</th>
            <th>Servicios</th>
            <th>Repuestos</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cliente.historial.map((servicio, index) => (
            <tr key={index}>
              <td>{servicio.id}</td>
              <td>{servicio.fecha}</td>
              <td>
                <ul style={styles.list}>
                  {servicio.servicios.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul style={styles.list}>
                  {servicio.repuestos.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </td>
              <td>${servicio.total.toFixed(2)}</td>
              <td>
                <Link to={`/servicios/${servicio.id}`} style={styles.actionButton}>
                  Ver detalle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  title: {
    color: '#2c3e50',
    margin: 0,
    fontSize: '1.8rem'
  },
  backButton: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '500'
  },
  clientInfo: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  clientName: {
    color: '#2c3e50',
    marginTop: 0,
    marginBottom: '1rem'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  infoLabel: {
    fontWeight: 'bold',
    marginBottom: '0.25rem',
    color: '#7f8c8d'
  },
  sectionTitle: {
    color: '#2c3e50',
    margin: '1.5rem 0 1rem'
  },
  motosContainer: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  motoCard: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minWidth: '200px'
  },
  historyTable: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  tableHeader: {
    backgroundColor: '#2c3e50',
    color: 'white',
    textAlign: 'left'
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  actionButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '0.9rem'
  }
};
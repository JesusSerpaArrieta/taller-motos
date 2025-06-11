import { useParams, useNavigate } from 'react-router-dom';




export default function VerFactura() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Datos de ejemplo para la factura
  const factura = {
    id: 'F-001',
    fecha: '15/05/2023',
    cliente: 'Juan Pérez',
    cedula: 'V-12345678',
    moto: 'Yamaha FZ-150 - ABC123',
    servicios: [
      { descripcion: 'Cambio de aceite', precio: 25.00 },
      { descripcion: 'Ajuste de frenos', precio: 15.00 }
    ],
    repuestos: [
      { descripcion: 'Filtro de aire', precio: 12.50, cantidad: 1 },
      { descripcion: 'Bujía NGK', precio: 8.00, cantidad: 2 }
    ],
    subtotal: 68.50,
    iva: 10.96,
    total: 79.46
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Factura #{factura.id}</h2>
        <div style={styles.buttonGroup}>
          <button onClick={handleImprimir} style={styles.primaryButton}>
            Imprimir
          </button>
          <button 
            onClick={() => navigate('/facturacion')} 
            style={styles.secondaryButton}
          >
            Volver
          </button>
        </div>
      </div>

      <div style={styles.facturaContainer}>
        <div style={styles.infoSection}>
          <div>
            <h3 style={styles.sectionTitle}>Taller Mecánico "El Rápido"</h3>
            <p>Av. Principal 123, Ciudad Motor</p>
            <p>Tel: (123) 456-7890</p>
          </div>
          <div style={styles.facturaInfo}>
            <p><strong>Factura #:</strong> {factura.id}</p>
            <p><strong>Fecha:</strong> {factura.fecha}</p>
          </div>
        </div>

        <div style={styles.infoSection}>
          <div>
            <h3 style={styles.sectionTitle}>Cliente</h3>
            <p><strong>Nombre:</strong> {factura.cliente}</p>
            <p><strong>Cédula:</strong> {factura.cedula}</p>
          </div>
          <div>
            <h3 style={styles.sectionTitle}>Vehículo</h3>
            <p>{factura.moto}</p>
          </div>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Descripción</th>
              <th style={styles.tableHeader}>Cantidad</th>
              <th style={styles.tableHeader}>Precio Unitario</th>
              <th style={styles.tableHeader}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" style={styles.sectionCell}>Servicios</td>
            </tr>
            {factura.servicios.map((servicio, index) => (
              <tr key={`servicio-${index}`}>
                <td>{servicio.descripcion}</td>
                <td>1</td>
                <td>${servicio.precio.toFixed(2)}</td>
                <td>${servicio.precio.toFixed(2)}</td>
              </tr>
            ))}
            
            <tr>
              <td colSpan="4" style={styles.sectionCell}>Repuestos</td>
            </tr>
            {factura.repuestos.map((repuesto, index) => (
              <tr key={`repuesto-${index}`}>
                <td>{repuesto.descripcion}</td>
                <td>{repuesto.cantidad}</td>
                <td>${repuesto.precio.toFixed(2)}</td>
                <td>${(repuesto.precio * repuesto.cantidad).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={styles.totalCell}>Subtotal</td>
              <td style={styles.totalCell}>${factura.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="3" style={styles.totalCell}>IVA (16%)</td>
              <td style={styles.totalCell}>${factura.iva.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="3" style={styles.totalCell}>TOTAL</td>
              <td style={styles.totalCell}>${factura.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div style={styles.footer}>
          <p>¡Gracias por su preferencia!</p>
          <p>Para garantía presentar esta factura</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
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
  buttonGroup: {
    display: 'flex',
    gap: '1rem'
  },
  primaryButton: {
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  secondaryButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  facturaContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  infoSection: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem'
  },
  sectionTitle: {
    color: '#2c3e50',
    marginTop: 0,
    marginBottom: '0.5rem'
  },
  facturaInfo: {
    textAlign: 'right'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '2rem'
  },
  tableHeader: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '0.75rem',
    textAlign: 'left'
  },
  sectionCell: {
    backgroundColor: '#f5f7fa',
    fontWeight: 'bold',
    padding: '0.5rem'
  },
  totalCell: {
    fontWeight: 'bold',
    textAlign: 'right',
    padding: '0.5rem',
    borderTop: '1px solid #ddd'
  },
  footer: {
    textAlign: 'center',
    marginTop: '2rem',
    paddingTop: '1rem',
    borderTop: '1px solid #ddd'
  }
};
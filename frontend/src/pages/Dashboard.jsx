import Navbar from '../components/Navbar';

export default function Dashboard() {
  return (
    <div style={styles.container}>
      <Navbar />
      
      <div style={styles.content}>
        <h2 style={styles.title}>Panel de Control</h2>
        
        <div style={styles.cards}>
          {/* Tarjeta 1 */}
          <div style={styles.card}>
            <h3>📋 Clientes Registrados</h3>
            <p style={styles.cardValue}>24</p>
            <a href="/clientes" style={styles.cardLink}>Ver todos</a>
          </div>
          
          {/* Tarjeta 2 */}
          <div style={styles.card}>
            <h3>💰 Facturación Hoy</h3>
            <p style={styles.cardValue}>$1,850.00</p>
            <a href="/facturacion" style={styles.cardLink}>Nueva factura</a>
          </div>
          
          {/* Tarjeta 3 */}
          <div style={styles.card}>
            <h3>🛠️ Repuestos en Stock</h3>
            <p style={styles.cardValue}>58</p>
            <a href="/inventario" style={styles.cardLink}>Administrar</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
  },
  content: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '2rem',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  cardValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '1rem 0',
    color: '#2c3e50',
  },
  cardLink: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '500',
  }
};
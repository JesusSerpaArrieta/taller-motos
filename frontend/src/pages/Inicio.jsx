import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <>
      {/* Contenido principal */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h2>Taller Mecánico "El Rápido"</h2>
          <p style={styles.address}>📍 Av. Principal 123, Sector Industrial, Ciudad Motor</p>
          <p style={styles.contact}>📞 (123) 456-7890 | ✉️ contacto@tallermotos.com</p>
        </div>
      </section>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>👤 Gestión de Clientes</h3>
          <p>Registra y administra tus clientes</p>
          <Link to="/clientes" style={styles.cardButton}>Acceder</Link>
        </div>

        <div style={styles.card}>
          <h3>📝 Facturación</h3>
          <p>Genera facturas por servicios y repuestos</p>
          <Link to="/facturacion" style={styles.cardButton}>Acceder</Link>
        </div>

        <div style={styles.card}>
          <h3>🛠️ Control de Inventario</h3>
          <p>Administra tu stock de repuestos</p>
          <Link to="/inventario" style={styles.cardButton}>Acceder</Link>
        </div>
      </div>
    </>
  )
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#2c3e50',
    color: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem',
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.5rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  loginButton: {
    padding: '0.5rem 1.5rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    textDecoration: 'none',
    fontSize: '0.9rem'
  },
  hero: {
    backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1601758003122-53c40e686a19")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    padding: '2rem 2rem',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  address: {
    fontSize: '1.2rem',
    margin: '1rem 0',
  },
  contact: {
    fontSize: '1rem',
    opacity: '0.9',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '2rem',
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    width: '300px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s',
  },
  cardButton: {
    padding: '0.5rem 0.4rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '1rem',
    width: '100%',
    display: 'inline-block',
    textAlign: 'center',
    textDecoration: 'none'
  }
}
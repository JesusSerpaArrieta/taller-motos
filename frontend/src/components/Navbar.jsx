import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
          <div style={styles.logo}>
            <span role="img" aria-label="moto">🏍️</span> Taller Mecánico
          </div>
      <div style={styles.navLinks}>
        <Link to="/Inicio" style={styles.link}>Inicio</Link>
        <Link to="/clientes" style={styles.link}>Clientes</Link>
        <Link to="/Servicios" style={styles.link}>Servicios</Link>
        <Link to="/facturacion" style={styles.link}>Facturación</Link>
        <Link to="/inventario" style={styles.link}>Inventario</Link>
        <Link to="/Reportes" style={styles.link}>Reportes</Link>
      </div>
      <Link to="/login" style={styles.loginButton}>
        Cerrar Sesión
      </Link>
    </nav>
  );
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
    padding: '4rem 2rem',
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
    padding: '0.5rem 1rem',
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
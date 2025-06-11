import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NuevaFactura() {
  const [factura, setFactura] = useState({
    cliente: '',
    moto: '',
    servicios: [],
    repuestos: [],
    total: 0
  });
  const [guardado, setGuardado] = useState(false);
  const navigate = useNavigate();

  // Datos de ejemplo (en una app real vendrían de una API)
  const clientes = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María Gómez' }
  ];

  const motos = [
    { placa: 'ABC123', modelo: 'Yamaha FZ-150' },
    { placa: 'DEF456', modelo: 'Suzuki GN-125' }
  ];

  const handleChange = (e) => {
    setFactura({
      ...factura,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar la factura
    console.log('Factura guardada:', factura);
    setGuardado(true);
    setTimeout(() => navigate('/facturacion'), 2000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Nueva Factura</h2>
      
      {guardado ? (
        <div style={styles.alertSuccess}>
          ¡Factura creada correctamente!
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Cliente</label>
            <select
              name="cliente"
              value={factura.cliente}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Moto</label>
            <select
              name="moto"
              value={factura.moto}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Seleccione una moto</option>
              {motos.map((moto, index) => (
                <option key={index} value={moto.placa}>
                  {moto.modelo} - {moto.placa}
                </option>
              ))}
            </select>
          </div>

          {/* Aquí irían los campos para servicios y repuestos */}

          <div style={styles.formGroup}>
            <label style={styles.label}>Total</label>
            <input
              type="number"
              name="total"
              value={factura.total}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.primaryButton}>
              Guardar Factura
            </button>
            <button 
              type="button" 
              style={styles.secondaryButton}
              onClick={() => navigate('/facturacion')}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// Reutilizamos los mismos estilos de NuevoCliente
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
    fontWeight: 'bold',
    flex: 1
  },
  secondaryButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    flex: 1
  },
  alertSuccess: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center'
  }
};
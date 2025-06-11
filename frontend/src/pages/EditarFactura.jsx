import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EditarFactura() {
  const [factura, setFactura] = useState({
    id: 'F-001',
    fecha: '15/05/2023',
    cliente: {
      nombre: 'Juan Pérez',
      cedula: 'V-12345678',
      telefono: '0412-5551234'
    },
    moto: {
      placa: 'ABC123',
      marca: 'Yamaha',
      modelo: 'FZ-150'
    },
    servicios: [
      { id: 1, nombre: 'Cambio de aceite', precio: 25, seleccionado: true },
      { id: 2, nombre: 'Alineación', precio: 40, seleccionado: true }
    ],
    repuestos: [
      { id: 1, nombre: 'Filtro de aceite', precio: 8.50, cantidad: 1, seleccionado: true },
      { id: 2, nombre: 'Aceite 20W-50', precio: 15, cantidad: 2, seleccionado: true }
    ],
    metodoPago: 'efectivo'
  });

  const calcularTotal = () => {
    const serviciosTotal = factura.servicios
      .filter(s => s.seleccionado)
      .reduce((sum, s) => sum + s.precio, 0);
    
    const repuestosTotal = factura.repuestos
      .filter(r => r.seleccionado)
      .reduce((sum, r) => sum + (r.precio * r.cantidad), 0);
    
    return serviciosTotal + repuestosTotal;
  };

  const toggleServicio = (id) => {
    setFactura(prev => ({
      ...prev,
      servicios: prev.servicios.map(s => 
        s.id === id ? { ...s, seleccionado: !s.seleccionado } : s
      )
    }));
  };

  const toggleRepuesto = (id) => {
    setFactura(prev => ({
      ...prev,
      repuestos: prev.repuestos.map(r => 
        r.id === id ? { ...r, seleccionado: !r.seleccionado } : r
      )
    }));
  };

  const updateCantidad = (id, cantidad) => {
    setFactura(prev => ({
      ...prev,
      repuestos: prev.repuestos.map(r => 
        r.id === id ? { ...r, cantidad: Math.max(1, cantidad) } : r
      )
    }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Editar Factura #F-001</h2>
        <div style={styles.actions}>
          <Link to="/facturacion" style={styles.secondaryButton}>
            Cancelar
          </Link>
           <Link to="/facturacion" style={styles.primaryButton}>
            Actualizar
          </Link>
        </div>
      </div>

      <div style={styles.clientInfo}>
        <h3 style={styles.sectionTitle}>Información del Cliente</h3>
        <div style={styles.infoGrid}>
          <div>
            <p style={styles.infoLabel}>Nombre:</p>
            <p>{factura.cliente.nombre}</p>
          </div>
          <div>
            <p style={styles.infoLabel}>Cédula:</p>
            <p>{factura.cliente.cedula}</p>
          </div>
          <div>
            <p style={styles.infoLabel}>Teléfono:</p>
            <p>{factura.cliente.telefono}</p>
          </div>
        </div>

        <h3 style={styles.sectionTitle}>Información de la Moto</h3>
        <div style={styles.infoGrid}>
          <div>
            <p style={styles.infoLabel}>Placa:</p>
            <p>{factura.moto.placa}</p>
          </div>
          <div>
            <p style={styles.infoLabel}>Marca/Modelo:</p>
            <p>{factura.moto.marca} {factura.moto.modelo}</p>
          </div>
        </div>
      </div>

      <div style={styles.servicesSection}>
        <h3 style={styles.sectionTitle}>Servicios Realizados</h3>
        <div style={styles.itemsContainer}>
          {factura.servicios.map(servicio => (
            <div key={servicio.id} style={styles.itemCard}>
              <label style={styles.itemCheckbox}>
                <input
                  type="checkbox"
                  checked={servicio.seleccionado}
                  onChange={() => toggleServicio(servicio.id)}
                />
                <span style={servicio.seleccionado ? styles.itemSelected : styles.itemName}>
                  {servicio.nombre}
                </span>
              </label>
              <span style={styles.itemPrice}>${servicio.precio.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.partsSection}>
        <h3 style={styles.sectionTitle}>Repuestos Utilizados</h3>
        <div style={styles.itemsContainer}>
          {factura.repuestos.map(repuesto => (
            <div key={repuesto.id} style={styles.itemCard}>
              <label style={styles.itemCheckbox}>
                <input
                  type="checkbox"
                  checked={repuesto.seleccionado}
                  onChange={() => toggleRepuesto(repuesto.id)}
                />
                <span style={repuesto.seleccionado ? styles.itemSelected : styles.itemName}>
                  {repuesto.nombre}
                </span>
              </label>
              <div style={styles.quantityControls}>
                <button 
                  style={styles.quantityButton}
                  onClick={() => updateCantidad(repuesto.id, repuesto.cantidad - 1)}
                >
                  -
                </button>
                <span style={styles.quantity}>{repuesto.cantidad}</span>
                <button 
                  style={styles.quantityButton}
                  onClick={() => updateCantidad(repuesto.id, repuesto.cantidad + 1)}
                >
                  +
                </button>
              </div>
              <span style={styles.itemPrice}>
                ${(repuesto.precio * repuesto.cantidad).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.paymentSection}>
        <h3 style={styles.sectionTitle}>Método de Pago</h3>
        <div style={styles.paymentMethods}>
          <label style={styles.paymentMethod}>
            <input
              type="radio"
              name="metodoPago"
              checked={factura.metodoPago === 'efectivo'}
              onChange={() => setFactura(prev => ({ ...prev, metodoPago: 'efectivo' }))}
            />
            Efectivo
          </label>
          <label style={styles.paymentMethod}>
            <input
              type="radio"
              name="metodoPago"
              checked={factura.metodoPago === 'tarjeta'}
              onChange={() => setFactura(prev => ({ ...prev, metodoPago: 'tarjeta' }))}
            />
            Tarjeta
          </label>
          <label style={styles.paymentMethod}>
            <input
              type="radio"
              name="metodoPago"
              checked={factura.metodoPago === 'transferencia'}
              onChange={() => setFactura(prev => ({ ...prev, metodoPago: 'transferencia' }))}
            />
            Transferencia
          </label>
        </div>
      </div>

      <div style={styles.summarySection}>
        <h3 style={styles.sectionTitle}>Resumen de Factura</h3>
        <div style={styles.summaryGrid}>
          <div>
            <p style={styles.summaryLabel}>Subtotal:</p>
            <p style={styles.summaryLabel}>IVA (16%):</p>
            <p style={styles.summaryLabel}>Total:</p>
          </div>
          <div style={styles.summaryValues}>
            <p>${calcularTotal().toFixed(2)}</p>
            <p>${(calcularTotal() * 0.16).toFixed(2)}</p>
            <p style={styles.totalAmount}>${(calcularTotal() * 1.16).toFixed(2)}</p>
          </div>
        </div>
      </div>
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
  actions: {
    display: 'flex',
    gap: '1rem'
  },
  primaryButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'none'

  },
  secondaryButton: {
    backgroundColor: '#7f8c8d',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  clientInfo: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  sectionTitle: {
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
  servicesSection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  partsSection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  itemsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem'
  },
  itemCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  itemCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer'
  },
  itemName: {
    color: '#7f8c8d'
  },
  itemSelected: {
    color: '#2c3e50',
    fontWeight: '500'
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  quantityButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantity: {
    minWidth: '20px',
    textAlign: 'center'
  },
  paymentSection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  paymentMethods: {
    display: 'flex',
    gap: '1.5rem'
  },
  paymentMethod: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer'
  },
  summarySection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'space-between',
    maxWidth: '300px',
    marginLeft: 'auto'
  },
  summaryLabel: {
    fontWeight: 'bold',
    color: '#7f8c8d',
    margin: '0.5rem 0'
  },
  summaryValues: {
    textAlign: 'right'
  },
  totalAmount: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#e74c3c'
  }
};
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Servicios() {
  const [servicios, setServicios] = useState([
    {
      id: 'S-001',
      cliente: 'Juan Pérez (V-12345678)',
      moto: 'Yamaha FZ-150 ABC123',
      fecha: '15/05/2023',
      servicios: [
        { nombre: 'Cambio de aceite', precio: 25 },
        { nombre: 'Alineación', precio: 40 }
      ],
      repuestos: [
        { nombre: 'Filtro de aceite', precio: 8.50, cantidad: 1 },
        { nombre: 'Aceite 20W-50', precio: 15, cantidad: 2 }
      ],
      estado: 'Completado'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({
    cliente: '',
    moto: '',
    servicios: [],
    repuestos: [],
    estado: 'En progreso'
  });

  const [servicioInput, setServicioInput] = useState({ nombre: '', precio: '' });
  const [repuestoInput, setRepuestoInput] = useState({ nombre: '', precio: '', cantidad: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoServicio((prev) => ({ ...prev, [name]: value }));
  };

  const agregarServicio = () => {
    if (!servicioInput.nombre || !servicioInput.precio) return;
    setNuevoServicio(prev => ({
      ...prev,
      servicios: [...prev.servicios, { nombre: servicioInput.nombre, precio: parseFloat(servicioInput.precio) }]
    }));
    setServicioInput({ nombre: '', precio: '' });
  };

  const agregarRepuesto = () => {
    if (!repuestoInput.nombre || !repuestoInput.precio || !repuestoInput.cantidad) return;
    setNuevoServicio(prev => ({
      ...prev,
      repuestos: [...prev.repuestos, {
        nombre: repuestoInput.nombre,
        precio: parseFloat(repuestoInput.precio),
        cantidad: parseInt(repuestoInput.cantidad)
      }]
    }));
    setRepuestoInput({ nombre: '', precio: '', cantidad: '' });
  };

  const calcularTotal = () => {
    const totalServicios = nuevoServicio.servicios.reduce((sum, s) => sum + s.precio, 0);
    const totalRepuestos = nuevoServicio.repuestos.reduce((sum, r) => sum + (r.precio * r.cantidad), 0);
    return (totalServicios + totalRepuestos).toFixed(2);
  };

  const handleGuardar = () => {
    const nuevo = {
      ...nuevoServicio,
      id: `S-${String(servicios.length + 1).padStart(3, '0')}`,
      fecha: new Date().toLocaleDateString()
    };
    setServicios([...servicios, nuevo]);
    setNuevoServicio({ cliente: '', moto: '', servicios: [], repuestos: [], estado: 'En progreso' });
    setShowModal(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Registro de Servicios</h2>
        <button onClick={() => setShowModal(true)} style={styles.primaryButton}>
          + Nuevo Servicio
        </button>
      </div>

      {/* Tabla */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th>ID</th>
              <th>Cliente</th>
              <th>Moto</th>
              <th>Fecha</th>
              <th>Servicios</th>
              <th>Repuestos</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => {
              const totalServicios = servicio.servicios.reduce((sum, s) => sum + s.precio, 0);
              const totalRepuestos = servicio.repuestos.reduce((sum, r) => sum + (r.precio * r.cantidad), 0);
              const total = totalServicios + totalRepuestos;

              return (
                <tr key={servicio.id}>
                  <td>{servicio.id}</td>
                  <td>{servicio.cliente}</td>
                  <td>{servicio.moto}</td>
                  <td>{servicio.fecha}</td>
                  <td>
                    <ul style={styles.list}>
                      {servicio.servicios.map((s, i) => (
                        <li key={i}>{s.nombre} (${s.precio})</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul style={styles.list}>
                      {servicio.repuestos.map((r, i) => (
                        <li key={i}>{r.nombre} x{r.cantidad} (${r.precio * r.cantidad})</li>
                      ))}
                    </ul>
                  </td>
                  <td>${total.toFixed(2)}</td>
                  <td>
                    <span style={servicio.estado === 'Completado' ? styles.statusCompleted : styles.statusInProgress}>
                      {servicio.estado}
                    </span>
                  </td>
                  <td>
                    <Link to={`/EditarServicio/`} style={styles.actionButton}>Editar</Link>
                    <Link to={`/VerFactura/`} style={styles.actionButtonSecondary}>Facturar</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Nuevo Servicio</h3>
            <input
              type="text"
              name="cliente"
              placeholder="Nombre del Cliente (Cédula)"
              value={nuevoServicio.cliente}
              onChange={handleChange}
              style={styles.modalInput}
            />
            <input
              type="text"
              name="moto"
              placeholder="Moto (Marca - Placa)"
              value={nuevoServicio.moto}
              onChange={handleChange}
              style={styles.modalInput}
            />

            <div>
              <h4>Servicios</h4>
              <input
                placeholder="Nombre del Servicio"
                value={servicioInput.nombre}
                onChange={(e) => setServicioInput({ ...servicioInput, nombre: e.target.value })}
                style={styles.modalInput}
              />
              <input
                placeholder="Precio"
                type="number"
                value={servicioInput.precio}
                onChange={(e) => setServicioInput({ ...servicioInput, precio: e.target.value })}
                style={styles.modalInput}
              />
              <button onClick={agregarServicio} style={styles.primaryButton}>Agregar Servicio</button>
            </div>

            <div>
              <h4>Repuestos</h4>
              <input
                placeholder="Nombre del Repuesto"
                value={repuestoInput.nombre}
                onChange={(e) => setRepuestoInput({ ...repuestoInput, nombre: e.target.value })}
                style={styles.modalInput}
              />
              <input
                placeholder="Precio"
                type="number"
                value={repuestoInput.precio}
                onChange={(e) => setRepuestoInput({ ...repuestoInput, precio: e.target.value })}
                style={styles.modalInput}
              />
              <input
                placeholder="Cantidad"
                type="number"
                value={repuestoInput.cantidad}
                onChange={(e) => setRepuestoInput({ ...repuestoInput, cantidad: e.target.value })}
                style={styles.modalInput}
              />
              <button onClick={agregarRepuesto} style={styles.primaryButton}>Agregar Repuesto</button>
            </div>

            <p><strong>Total Actual: ${calcularTotal()}</strong></p>

            <div style={styles.modalActions}>
              <button onClick={handleGuardar} style={styles.primaryButton}>Guardar</button>
              <button onClick={() => setShowModal(false)} style={styles.cancelButton}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reutiliza los mismos styles que ya tienes en tu código original (no se repiten aquí por brevedad)



const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1400px',
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
  primaryButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'inline-block',
    border: 'none',
    cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer'
  },
  searchContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  filterSelect: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minWidth: '200px'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
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
  statusCompleted: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem'
  },
  statusInProgress: {
    backgroundColor: '#f39c12',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem'
  },
  actionButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    textDecoration: 'none',
    display: 'inline-block',
    marginRight: '0.5rem',
    fontSize: '0.9rem'
  },
  actionButtonSecondary: {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '0.9rem'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
  }
}
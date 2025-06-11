import { useState } from 'react';

export default function Facturacion() {
  const [facturas, setFacturas] = useState([
    { id: 'F-001', cliente: 'Juan Pérez', moto: 'Yamaha FZ-150', total: '$120.00', fecha: '15/05/2023' },
    { id: 'F-002', cliente: 'María Gómez', moto: 'Suzuki GN-125', total: '$85.50', fecha: '14/05/2023' },
    { id: 'F-003', cliente: 'Carlos Rojas', moto: 'Honda CB-190', total: '$210.75', fecha: '13/05/2023' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ cliente: '', moto: '', total: '', fecha: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const newFactura = {
      id: `F-${facturas.length + 1}`.padStart(5, '0'),
      ...formData
    };
    setFacturas([...facturas, newFactura]);
    setShowModal(false);
    setFormData({ cliente: '', moto: '', total: '', fecha: '' });
  };

  const handleEdit = (factura, index) => {
    setFormData({ cliente: factura.cliente, moto: factura.moto, total: factura.total, fecha: factura.fecha });
    setEditIndex(index);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    const updated = [...facturas];
    updated[editIndex] = { ...updated[editIndex], ...formData };
    setFacturas(updated);
    setShowEditModal(false);
    setFormData({ cliente: '', moto: '', total: '', fecha: '' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Gestión de Facturación</h2>
        <button onClick={() => setShowModal(true)} style={styles.primaryButton}>Nueva Factura</button>
      </div>

      <div style={styles.filters}>
        <input type="text" placeholder="Buscar por placa o cliente..." style={styles.searchInput} />
        <select style={styles.select}>
          <option>Todas las facturas</option>
          <option>Hoy</option>
        </select>
      </div>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>N° Factura</th>
            <th>Cliente</th>
            <th>Moto</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map((factura, index) => (
            <tr key={index}>
              <td>{factura.id}</td>
              <td>{factura.cliente}</td>
              <td>{factura.moto}</td>
              <td>{factura.total}</td>
              <td>{factura.fecha}</td>
              <td>
                <a href={`/VerFactura/`} style={styles.smallButton}>Ver</a> &nbsp;
                <button style={styles.smallButton} onClick={() => handleEdit(factura, index)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button style={styles.paginationButton} disabled>« Anterior</button>
        <span style={styles.pageInfo}>Página 1 de 1</span>
        <button style={styles.paginationButton}>Siguiente »</button>
      </div>

      {/* Modal Nueva Factura */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Nueva Factura</h3>
            <input name="cliente" placeholder="Cliente" value={formData.cliente} onChange={handleInputChange} />
            <input name="moto" placeholder="Moto" value={formData.moto} onChange={handleInputChange} />
            <input name="total" placeholder="Total" value={formData.total} onChange={handleInputChange} />
            <input name="fecha" placeholder="Fecha" value={formData.fecha} onChange={handleInputChange} />
            <div style={{ marginTop: '1rem' }}>
              <button onClick={handleSave} style={styles.primaryButton}>Guardar</button>
              &nbsp;
              <button onClick={() => setShowModal(false)} style={styles.smallButton}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Factura */}
      {showEditModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Actualizar Factura</h3>
            <input name="cliente" placeholder="Cliente" value={formData.cliente} onChange={handleInputChange} />
            <input name="moto" placeholder="Moto" value={formData.moto} onChange={handleInputChange} />
            <input name="total" placeholder="Total" value={formData.total} onChange={handleInputChange} />
            <input name="fecha" placeholder="Fecha" value={formData.fecha} onChange={handleInputChange} />
            <div style={{ marginTop: '1rem' }}>
              <button onClick={handleUpdate} style={styles.primaryButton}>Actualizar</button>
              &nbsp;
              <button onClick={() => setShowEditModal(false)} style={styles.smallButton}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
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
  primaryButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minWidth: '200px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  tableHeader: {
    backgroundColor: '#2c3e50',
    color: 'white'
  },
  smallButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    textDecoration: 'none',
    display: 'inline-block',
    border: 'none',
    cursor: 'pointer'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem'
  },
  paginationButton: {
    padding: '0.5rem 1rem',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  pageInfo: {
    color: '#7f8c8d'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }
};
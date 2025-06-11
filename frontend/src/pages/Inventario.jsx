import React, { useState, useEffect } from 'react';

export default function Inventario() {
  // Datos iniciales
  const [repuestos, setRepuestos] = useState([
    { id: 'R-001', nombre: 'Filtro de aceite', stock: 15, precio: 8.50, categoria: 'Motor' },
    { id: 'R-002', nombre: 'Pastillas de freno', stock: 8, precio: 12.00, categoria: 'Frenos' },
    { id: 'R-003', nombre: 'Cadena de transmisión', stock: 5, precio: 25.75, categoria: 'Transmisión' },
    { id: 'R-004', nombre: 'Bujía NGK', stock: 22, precio: 5.30, categoria: 'Motor' },
    { id: 'R-005', nombre: 'Aceite 20W-50', stock: 10, precio: 15.00, categoria: 'Lubricantes' }
  ]);

  // Estado de modales
  const [modalNuevo, setModalNuevo] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

  // Para editar, guardamos el repuesto seleccionado
  const [repuestoEditar, setRepuestoEditar] = useState(null);

  // Estados para filtros y búsqueda
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');

  // Estados para formulario Nuevo y Editar
  const estadoInicialFormulario = { id: '', nombre: '', stock: '', precio: '', categoria: 'Motor' };
  const [formNuevo, setFormNuevo] = useState(estadoInicialFormulario);
  const [formEditar, setFormEditar] = useState(estadoInicialFormulario);

  // Filtrar repuestos para mostrar en tabla
  const repuestosFiltrados = repuestos.filter(r => {
    const categoriaOk = filtroCategoria === 'Todas' || r.categoria === filtroCategoria;
    const busquedaOk = r.nombre.toLowerCase().includes(busqueda.toLowerCase()) || r.id.toLowerCase().includes(busqueda.toLowerCase());
    return categoriaOk && busquedaOk;
  });

  // Manejar formulario nuevo repuesto
  function handleChangeNuevo(e) {
    const { name, value } = e.target;
    setFormNuevo(prev => ({ ...prev, [name]: value }));
  }

  // Manejar formulario editar repuesto
  function handleChangeEditar(e) {
    const { name, value } = e.target;
    setFormEditar(prev => ({ ...prev, [name]: value }));
  }

  // Abrir modal editar y cargar datos
  function abrirEditar(repuesto) {
    setRepuestoEditar(repuesto);
    setFormEditar({
      id: repuesto.id,
      nombre: repuesto.nombre,
      stock: repuesto.stock,
      precio: repuesto.precio,
      categoria: repuesto.categoria,
    });
    setModalEditar(true);
  }

  // Guardar nuevo repuesto
  function guardarNuevoRepuesto(e) {
    e.preventDefault();

    // Validaciones básicas
    if (!formNuevo.id || !formNuevo.nombre || !formNuevo.stock || !formNuevo.precio) {
      alert('Completa todos los campos');
      return;
    }

    // Verificar que no exista id repetido
    if (repuestos.some(r => r.id === formNuevo.id)) {
      alert('El código ya existe');
      return;
    }

    const nuevo = {
      id: formNuevo.id,
      nombre: formNuevo.nombre,
      stock: Number(formNuevo.stock),
      precio: Number(formNuevo.precio),
      categoria: formNuevo.categoria,
    };

    setRepuestos(prev => [...prev, nuevo]);
    setModalNuevo(false);
    setFormNuevo(estadoInicialFormulario);
    setMensajeExito('Repuesto agregado correctamente.');
    setTimeout(() => setMensajeExito(''), 3000);
  }

  // Guardar edición
  function guardarEditarRepuesto(e) {
    e.preventDefault();

    if (!formEditar.nombre || !formEditar.stock || !formEditar.precio) {
      alert('Completa todos los campos');
      return;
    }

    setRepuestos(prev => prev.map(r => r.id === repuestoEditar.id ? {
      ...r,
      nombre: formEditar.nombre,
      stock: Number(formEditar.stock),
      precio: Number(formEditar.precio),
      categoria: formEditar.categoria,
    } : r));

    setModalEditar(false);
    setRepuestoEditar(null);
    setMensajeExito('Repuesto editado correctamente.');
    setTimeout(() => setMensajeExito(''), 3000);
  }

  // Calcular totales para resumen
  const totalRepuestos = repuestos.reduce((acc, r) => acc + r.stock, 0);
  const bajoStock = repuestos.filter(r => r.stock < 10).length;
  const valorTotal = repuestos.reduce((acc, r) => acc + r.stock * r.precio, 0).toFixed(2);

  return (
    <div style={styles.container}>

      <div style={styles.content}>
        <div style={styles.header}>
          <h2 style={styles.title}>Control de Inventario</h2>
          <div style={styles.actions}>
            <button onClick={() => setModalNuevo(true)} style={styles.primaryButton}>Nuevo Repuesto</button>
            <button style={styles.secondaryButton}>Exportar</button>
          </div>
        </div>

        {/* Tarjetas resumen */}
        <div style={styles.summaryCards}>
          <div style={styles.summaryCard}>
            <h3 style={styles.summaryTitle}>Total Repuestos</h3>
            <p style={styles.summaryValue}>{totalRepuestos}</p>
          </div>
          <div style={styles.summaryCard}>
            <h3 style={styles.summaryTitle}>Bajo Stock</h3>
            <p style={{ ...styles.summaryValue, color: '#e74c3c' }}>{bajoStock}</p>
          </div>
          <div style={styles.summaryCard}>
            <h3 style={styles.summaryTitle}>Valor Total</h3>
            <p style={styles.summaryValue}>${valorTotal}</p>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <input
              type="text"
              placeholder="Buscar repuesto..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={styles.searchInput}
            />
            <select
              style={styles.filterSelect}
              value={filtroCategoria}
              onChange={e => setFiltroCategoria(e.target.value)}
            >
              <option value="Todas">Todas las categorías</option>
              <option value="Motor">Motor</option>
              <option value="Frenos">Frenos</option>
              <option value="Transmisión">Transmisión</option>
              <option value="Lubricantes">Lubricantes</option>
            </select>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {repuestosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>
                    No hay repuestos que mostrar
                  </td>
                </tr>
              )}
              {repuestosFiltrados.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td style={item.stock < 10 ? { color: '#e74c3c', fontWeight: 'bold' } : {}}>
                    {item.stock} {item.stock < 10 && '⚠️'}
                  </td>
                  <td>${item.precio.toFixed(2)}</td>
                  <td>{item.categoria}</td>
                  <td>
                    <button
                      style={styles.smallButton}
                      onClick={() => abrirEditar(item)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mensaje éxito debajo de la tabla */}
          {mensajeExito && (
            <div style={styles.mensajeExito}>
              {mensajeExito}
            </div>
          )}

        </div>
      </div>

      {/* Modal Nuevo Repuesto */}
      {modalNuevo && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Nuevo Repuesto</h3>
            <form onSubmit={guardarNuevoRepuesto} style={styles.form}>
              <label>
                Código:
                <input
                  name="id"
                  value={formNuevo.id}
                  onChange={handleChangeNuevo}
                  required
                />
              </label>
              <label>
                Nombre:
                <input
                  name="nombre"
                  value={formNuevo.nombre}
                  onChange={handleChangeNuevo}
                  required
                />
              </label>
              <label>
                Stock:
                <input
                  type="number"
                  name="stock"
                  value={formNuevo.stock}
                  onChange={handleChangeNuevo}
                  required
                  min="0"
                />
              </label>
              <label>
                Precio:
                <input
                  type="number"
                  step="0.01"
                  name="precio"
                  value={formNuevo.precio}
                  onChange={handleChangeNuevo}
                  required
                  min="0"
                />
              </label>
              <label>
                Categoría:
                <select
                  name="categoria"
                  value={formNuevo.categoria}
                  onChange={handleChangeNuevo}
                >
                  <option value="Motor">Motor</option>
                  <option value="Frenos">Frenos</option>
                  <option value="Transmisión">Transmisión</option>
                  <option value="Lubricantes">Lubricantes</option>
                </select>
              </label>
              <div style={styles.modalButtons}>
                <button type="submit" style={styles.primaryButton}>Guardar</button>
                <button
                  type="button"
                  onClick={() => setModalNuevo(false)}
                  style={styles.secondaryButton}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar Repuesto */}
      {modalEditar && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Editar Repuesto</h3>
            <form onSubmit={guardarEditarRepuesto} style={styles.form}>
              <label>
                Código:
                <input value={formEditar.id} disabled />
              </label>
              <label>
                Nombre:
                <input
                  name="nombre"
                  value={formEditar.nombre}
                  onChange={handleChangeEditar}
                  required
                />
              </label>
              <label>
                Stock:
                <input
                  type="number"
                  name="stock"
                  value={formEditar.stock}
                  onChange={handleChangeEditar}
                  required
                  min="0"
                />
              </label>
              <label>
                Precio:
                <input
                  type="number"
                  step="0.01"
                  name="precio"
                  value={formEditar.precio}
                  onChange={handleChangeEditar}
                  required
                  min="0"
                />
              </label>
              <label>
                Categoría:
                <select
                  name="categoria"
                  value={formEditar.categoria}
                  onChange={handleChangeEditar}
                >
                  <option value="Motor">Motor</option>
                  <option value="Frenos">Frenos</option>
                  <option value="Transmisión">Transmisión</option>
                  <option value="Lubricantes">Lubricantes</option>
                </select>
              </label>
              <div style={styles.modalButtons}>
                <button type="submit" style={styles.primaryButton}>Guardar</button>
                <button
                  type="button"
                  onClick={() => setModalEditar(false)}
                  style={styles.secondaryButton}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Estilos inline para simplicidad
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  content: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    color: '#2c3e50',
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1.8rem',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
  },
  primaryButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    textDecoration: 'none',
  },
  secondaryButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  summaryCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  summaryTitle: {
    color: '#7f8c8d',
    margin: '0 0 1rem 0',
    fontSize: '1rem',
  },
  summaryValue: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#2c3e50',
  },
  tableContainer: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    maxWidth: '400px',
  },
  filterSelect: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minWidth: '200px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  smallButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  pagination: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    margin: '0 0.25rem',
    borderRadius: '4px',
    cursor: 'pointer',
    disabled: {
      opacity: 0.5,
      cursor: 'default',
    },
  },
  mensajeExito: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#2ecc71',
    color: 'white',
    borderRadius: '4px',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // ESTILOS PARA MODALES (VENTANAS EMERGENTES)
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90vw',
    boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  modalButtonPrimary: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  modalButtonSecondary: {
    backgroundColor: '#bdc3c7',
    color: '#333',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};


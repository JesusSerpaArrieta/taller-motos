import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function EditarServicio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [servicio, setServicio] = useState({
    cliente: '',
    moto: '',
    fecha: '',
    servicios: [],
    repuestos: [],
    total: 0,
    estado: 'pendiente'
  });

  // Datos de ejemplo (en una app real vendrían de una API)
  const serviciosDisponibles = [
    { id: 1, nombre: 'Cambio de aceite', precio: 50 },
    { id: 2, nombre: 'Alineación', precio: 80 },
    { id: 3, nombre: 'Reparación de frenos', precio: 120 }
  ];

  const repuestosDisponibles = [
    { id: 1, nombre: 'Filtro de aceite', precio: 15, stock: 10 },
    { id: 2, nombre: 'Pastillas de freno', precio: 30, stock: 5 },
    { id: 3, nombre: 'Bujía', precio: 10, stock: 20 }
  ];

  // Simular carga de datos del servicio
  useEffect(() => {
    // Aquí iría la llamada a la API para obtener el servicio por ID
    const servicioEjemplo = {
      id: id,
      cliente: '',
      moto: '',
      fecha: '',
      servicios: [
        { id: 1, nombre: '', precio: 50 }
      ],
      repuestos: [
        { id: 1, nombre: '', precio: 15, cantidad: 1 }
      ],
      total: 65,
      estado: ''
    };
    setServicio(servicioEjemplo);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServicio(prev => ({ ...prev, [name]: value }));
  };

  const handleServicioChange = (servicioId, isChecked) => {
    const servicioSeleccionado = serviciosDisponibles.find(s => s.id === servicioId);
    
    setServicio(prev => {
      if (isChecked) {
        return {
          ...prev,
          servicios: [...prev.servicios, servicioSeleccionado],
          total: prev.total + servicioSeleccionado.precio
        };
      } else {
        return {
          ...prev,
          servicios: prev.servicios.filter(s => s.id !== servicioId),
          total: prev.total - servicioSeleccionado.precio
        };
      }
    });
  };

  const handleRepuestoChange = (repuestoId, cantidad) => {
    const repuesto = repuestosDisponibles.find(r => r.id === repuestoId);
    const cantidadNum = parseInt(cantidad) || 0;
    
    setServicio(prev => {
      // Calcular diferencia en el total
      const repuestoExistente = prev.repuestos.find(r => r.id === repuestoId);
      const cantidadAnterior = repuestoExistente ? repuestoExistente.cantidad : 0;
      const diferencia = (cantidadNum - cantidadAnterior) * repuesto.precio;
      
      // Actualizar repuestos
      const nuevosRepuestos = prev.repuestos.filter(r => r.id !== repuestoId);
      if (cantidadNum > 0) {
        nuevosRepuestos.push({ ...repuesto, cantidad: cantidadNum });
      }
      
      return {
        ...prev,
        repuestos: nuevosRepuestos,
        total: prev.total + diferencia
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la llamada a la API para actualizar el servicio
    alert('Servicio agregado correctamente');
    navigate('/Servicios');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Agregar  Servicio #{id}</h2>
        <Link to="/Servicios" style={styles.backButton}>
          Volver a Servicios
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Cliente:</label>
          <input
            type="text"
            name="cliente"
            value={servicio.cliente}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Moto:</label>
          <input
            type="text"
            name="moto"
            value={servicio.moto}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={servicio.fecha}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Servicios</h3>
          <div style={styles.servicesGrid}>
            {serviciosDisponibles.map(serv => (
              <div key={serv.id} style={styles.serviceItem}>
                <label>
                  <input
                    type="checkbox"
                    checked={servicio.servicios.some(s => s.id === serv.id)}
                    onChange={(e) => handleServicioChange(serv.id, e.target.checked)}
                  />
                  {serv.nombre} (${serv.precio})
                </label>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Repuestos</h3>
          <table style={styles.repuestosTable}>
            <thead>
              <tr>
                <th>Repuesto</th>
                <th>Precio Unitario</th>
                <th>Stock</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {repuestosDisponibles.map(rep => {
                const repuestoSeleccionado = servicio.repuestos.find(r => r.id === rep.id);
                const cantidad = repuestoSeleccionado ? repuestoSeleccionado.cantidad : 0;
                
                return (
                  <tr key={rep.id}>
                    <td>{rep.nombre}</td>
                    <td>${rep.precio}</td>
                    <td>{rep.stock}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max={rep.stock}
                        value={cantidad}
                        onChange={(e) => handleRepuestoChange(rep.id, e.target.value)}
                        style={styles.cantidadInput}
                      />
                    </td>
                    <td>${cantidad * rep.precio}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Total:</label>
          <input
            type="text"
            value={`$${servicio.total}`}
            style={styles.input}
            readOnly
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Estado:</label>
          <select
            name="estado"
            value={servicio.estado}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en-progreso">En progreso</option>
            <option value="completado">Completado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <div style={styles.formActions}>
          <button type="submit" style={styles.submitButton}>
            Guardar Cambios
          </button>
          <button type="button" style={styles.cancelButton} onClick={() => navigate('/Servicios')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee'
  },
  title: {
    color: '#2c3e50',
    margin: 0
  },
  backButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.9rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: '600',
    color: '#2c3e50'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    backgroundColor: 'white'
  },
  formSection: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem'
  },
  sectionTitle: {
    marginTop: 0,
    color: '#2c3e50',
    borderBottom: '1px solid #eee',
    paddingBottom: '0.5rem'
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem'
  },
  serviceItem: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '4px'
  },
  repuestosTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  },
  cantidadInput: {
    width: '60px',
    padding: '0.5rem',
    textAlign: 'center'
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '2rem'
  },
  submitButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  }
};
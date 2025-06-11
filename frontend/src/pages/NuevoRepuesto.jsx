import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NuevoRepuesto() {
  const [repuesto, setRepuesto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: ''
  });
  const [guardado, setGuardado] = useState(false);
  const navigate = useNavigate();

  const categorias = [
    'Motor',
    'Frenos',
    'Transmisión',
    'Eléctrico',
    'Suspensión',
    'Lubricantes'
  ];

  const handleChange = (e) => {
    setRepuesto({
      ...repuesto,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar el repuesto
    console.log('Repuesto guardado:', repuesto);
    setGuardado(true);
    setTimeout(() => navigate('/inventario'), 2000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Nuevo Repuesto</h2>
      
      {guardado ? (
        <div style={styles.alertSuccess}>
          ¡Repuesto guardado correctamente!
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre del Repuesto</label>
            <input
              type="text"
              name="nombre"
              value={repuesto.nombre}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Descripción</label>
            <textarea
              name="descripcion"
              value={repuesto.descripcion}
              onChange={handleChange}
              style={styles.textarea}
              rows="3"
            />
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Precio ($)</label>
              <input
                type="number"
                name="precio"
                value={repuesto.precio}
                onChange={handleChange}
                style={styles.input}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Stock Inicial</label>
              <input
                type="number"
                name="stock"
                value={repuesto.stock}
                onChange={handleChange}
                style={styles.input}
                min="0"
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Categoría</label>
            <select
              name="categoria"
              value={repuesto.categoria}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.primaryButton}>
              Guardar Repuesto
            </button>
            <button 
              type="button" 
              style={styles.secondaryButton}
              onClick={() => navigate('/inventario')}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

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
  formRow: {
    display: 'flex',
    gap: '1rem'
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
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    resize: 'vertical'
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
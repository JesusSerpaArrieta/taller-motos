import { useState } from 'react';




export default function Reportes() {
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [año, setAño] = useState(new Date().getFullYear());

  // Datos de ejemplo para el reporte
  const reporteData = [
    { semana: 'Sem 1', ingresos: 1200, servicios: 15, clientes: 10 },
    { semana: 'Sem 2', ingresos: 1800, servicios: 20, clientes: 15 },
    { semana: 'Sem 3', ingresos: 1500, servicios: 18, clientes: 12 },
    { semana: 'Sem 4', ingresos: 2100, servicios: 25, clientes: 18 }
  ];

  const serviciosPopulares = [
    { nombre: 'Cambio de aceite', cantidad: 35 },
    { nombre: 'Alineación', cantidad: 25 },
    { nombre: 'Cambio de frenos', cantidad: 18 },
    { nombre: 'Revisión general', cantidad: 15 },
    { nombre: 'Cambio de cadena', cantidad: 10 }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Reportes Mensuales</h2>
        <div style={styles.filters}>
          <select 
            value={mes} 
            onChange={(e) => setMes(parseInt(e.target.value))}
            style={styles.select}
          >
            {Array.from({length: 12}, (_, i) => i + 1).map(m => (
              <option key={m} value={m}>Mes {m}</option>
            ))}
          </select>
          <select 
            value={año} 
            onChange={(e) => setAño(parseInt(e.target.value))}
            style={styles.select}
          >
            {Array.from({length: 5}, (_, i) => new Date().getFullYear() - i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <button style={styles.generateButton}>
            Generar Reporte
          </button>
        </div>
      </div>

      <div style={styles.summaryCards}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Ingresos Totales</h3>
          <p style={styles.cardValue}>$6,500.00</p>
          <p style={styles.cardChange}>↑ 12% vs mes anterior</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Servicios Realizados</h3>
          <p style={styles.cardValue}>78</p>
          <p style={styles.cardChange}>↑ 8% vs mes anterior</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Clientes Atendidos</h3>
          <p style={styles.cardValue}>55</p>
          <p style={styles.cardChange}>↑ 5% vs mes anterior</p>
        </div>
      </div>

      <div style={styles.chartSection}>
        <h3 style={styles.sectionTitle}>Desempeño Semanal</h3>
        <div style={styles.tableContainer}>
  <h3 style={styles.sectionTitle}>Reporte Semanal</h3>
  <table style={styles.table}>
    <thead>
      <tr style={styles.tableHeader}>
        <th>Semana</th>
        <th>Ingresos</th>
        <th>Servicios</th>
        <th>Clientes</th>
      </tr>
    </thead>
    <tbody>
      {reporteData.map((item, i) => (
        <tr key={i}>
          <td>{item.semana}</td>
          <td>${item.ingresos}</td>
          <td>{item.servicios}</td>
          <td>{item.clientes}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>

      <div style={styles.tablesSection}>
        <div style={styles.tableContainer}>
          <h3 style={styles.sectionTitle}>Servicios Más Populares</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th>Servicio</th>
                <th>Cantidad</th>
                <th>Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              {serviciosPopulares.map((servicio, index) => (
                <tr key={index}>
                  <td>{servicio.nombre}</td>
                  <td>{servicio.cantidad}</td>
                  <td>
                    <div style={styles.progressBarContainer}>
                      <div 
                        style={{
                          ...styles.progressBar,
                          width: `${(servicio.cantidad / 35) * 100}%`
                        }}
                      />
                      <span style={styles.percentage}>
                        {Math.round((servicio.cantidad / 35) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.tableContainer}>
          <h3 style={styles.sectionTitle}>Clientes Frecuentes</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th>Cliente</th>
                <th>Visitas</th>
                <th>Gasto Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan Pérez (V-12345678)</td>
                <td>4</td>
                <td>$420.50</td>
              </tr>
              <tr>
                <td>María Gómez (V-87654321)</td>
                <td>3</td>
                <td>$315.75</td>
              </tr>
              <tr>
                <td>Carlos Rojas (E-98765432)</td>
                <td>2</td>
                <td>$180.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={styles.exportSection}>
        <button style={styles.exportButton}>
          Exportar a PDF
        </button>
        <button style={styles.exportButton}>
          Exportar a Excel
        </button>
      </div>
    </div>
  );
}

const styles = {
   tableContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  sectionTitle: {
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
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
  filters: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  select: {
    padding: '0.5rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white'
  },
  generateButton: {
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  summaryCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  card: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  cardTitle: {
    color: '#7f8c8d',
    marginTop: 0,
    marginBottom: '0.5rem',
    fontSize: '1rem'
  },
  cardValue: {
    color: '#2c3e50',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0.5rem 0'
  },
  cardChange: {
    color: '#2ecc71',
    margin: 0,
    fontSize: '0.9rem'
      },
    

    
 
};

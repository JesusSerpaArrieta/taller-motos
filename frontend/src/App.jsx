import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Clientes from './pages/Clientes';
import NuevoCliente from './pages/NuevoCliente';
import Facturacion from './pages/Facturacion';
import NuevaFactura from './pages/NuevaFactura';
import Inventario from './pages/Inventario';
import Login from './pages/Login';
import VerFactura from './pages/VerFactura';
import NuevoRepuesto from './pages/NuevoRepuesto';
import Registro from './pages/Registro';
import Servicios from './pages/Servicios';
import HistorialCliente from './pages/HistorialCliente';
import EditarFactura from './pages/EditarFactura';
import Reportes from './pages/Reportes';
import EditarServicio from './pages/EditarServicio';
import NuevoServicio from './pages/NuevoServicio';


export default function App() {
  return (
    <div style={styles.appContainer}>
      <Navbar />
      
      <main style={styles.mainContent}>
        <Routes>
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/NuevoCliente" element={<NuevoCliente />} />
          <Route path="/facturacion" element={<Facturacion />} />
          <Route path="/NuevaFactura" element={<NuevaFactura />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/login" element={<Login />} />
          <Route path="/VerFactura" element={<VerFactura />} />
          <Route path="/NuevoRepuesto" element={<NuevoRepuesto />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Servicios" element={<Servicios />} />
          <Route path="/HistorialCliente" element={<HistorialCliente />} />
          <Route path="/EditarFactura" element={<EditarFactura />} />
          <Route path="/Reportes" element={<Reportes />} />
          <Route path="/EditarServicio" element={<EditarServicio />} />
          <Route path="/NuevoServicio" element={<NuevoServicio />} />
        </Routes>
      </main>
    </div>
  );
}

const styles = {
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  mainContent: {
    flex: 1,
    paddingTop: '80px', // Para compensar el navbar fijo
    backgroundColor: '#f5f7fa'
  }
};
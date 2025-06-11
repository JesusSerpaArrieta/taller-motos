import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Facturacion from './pages/Facturacion';
import Inventario from './pages/Inventario';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Inicio" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/facturacion" element={<Facturacion />} />
        <Route path="/inventario" element={<Inventario />} />
      </Routes>
    </Router>
  );
}

export default App;
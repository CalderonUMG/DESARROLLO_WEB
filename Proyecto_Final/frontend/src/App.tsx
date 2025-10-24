import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Register/Register";
import HomeUsuario from "./pages/HomeUsuario/HomeUsuario";
import AdminHome from "./pages/AdminHome/AdminHome";
import CampaniaPage from "./pages/AdminHome/Campania/Campania"; // ✅ tu nueva página de campañas
import AdminLayout from "./layouts/AdminLayout"; // ✅ el layout que mantiene el NavbarAdmin
import NuevaCampania from "./pages/AdminHome/Campania/NuevaCampania/NuevaCampania";
import Candidatos from "./pages/Candidatos/Candidatos";
import AgregarCandidato from "./pages/Candidatos/AgregarCandidato/AgregarCandidato";
import Votacion from "./pages/Votacion/Votacion";

function AppContent() {
  const location = useLocation();

  // 👇 rutas donde NO quieres mostrar el navbar general
  const hideNavbarPaths = ["/home-usuario", "/admin", "/admin/campanias", "/admin/candidatos", "/admin/votaciones", "/admin/reportes"];
  const shouldHideNavbar = hideNavbarPaths.some((path) => location.pathname.startsWith(path));

  // 👇 rutas donde NO quieres mostrar el footer (opcional)
  const hideFooterPaths = ["/admin"];
  const shouldHideFooter = hideFooterPaths.some((path) => location.pathname.startsWith(path));

  return (
    <>
      {/* Navbar general (solo fuera del panel admin y usuario) */}
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        {/* === Sitio público === */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* === Panel Usuario === */}
        <Route path="/home-usuario" element={<HomeUsuario />} />
        <Route path="/home-usuario/votacion" element={<Votacion />} />

        {/* === Panel Administrador (usa su propio layout) === */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />

          <Route path="campanias" element={<CampaniaPage />} />
          <Route path="campanias/nueva" element={<NuevaCampania />} />

          <Route path="candidatos" element={<Candidatos />} />
          <Route path="candidatos/agregar" element={<AgregarCandidato />} />

          <Route path="reportes" element={<div>Reportes</div>} />
        </Route>
      </Routes>

      {/* Footer general (solo fuera del admin) */}
      {!shouldHideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

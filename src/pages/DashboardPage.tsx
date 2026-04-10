import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut } from 'lucide-react';
import './DashboardPage.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      // El error ya está en el store
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h1>Arrienda Fácil</h1>
        </div>
        <div className="nav-user">
          <div className="user-info">
            <p className="user-name">{user?.name}</p>
            <p className="user-email">{user?.email}</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h2>Bienvenido, {user?.name}!</h2>
          <p>Este es tu panel de control</p>
        </div>

        <div className="dashboard-content">
          <div className="content-card">
            <h3>Inicio</h3>
            <p>
              Aquí verás tus propiedades, inquilinos y contratos de
              arrendamiento.
            </p>
            <p className="placeholder">
              Contenido del dashboard en desarrollo...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
